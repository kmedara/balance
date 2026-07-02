import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

export type DnsStackProps = cdk.StackProps & {
  /** Registrable root domain, e.g. balance.com. */
  domainName: string;
  /** API subdomain label (default 'api') → api.<domain>. */
  apiSubdomain?: string;
  /** Client subdomain label (default 'app') → app.<domain>. */
  appSubdomain?: string;
  /** Existing Route 53 public hosted zone id. Omit to create a new zone. */
  hostedZoneId?: string;
  /** HTTP API to attach the custom domain + mapping to. */
  httpApi: apigwv2.IHttpApi;
};

/**
 * DNS + TLS for Balance: Route 53 hosted zone, ACM certificates, and the
 * API Gateway custom domain. Owns the `api` record; the client (`app`) record
 * and its certificate live in BalanceClientStack (CloudFront requires the cert
 * and alias on the distribution itself).
 *
 * Deploy in us-east-1 so the exported client certificate is valid for CloudFront.
 */
export class DnsStack extends cdk.Stack {
  public readonly hostedZone: route53.IHostedZone;
  public readonly clientCertificate: acm.ICertificate;
  public readonly apiDomainName: string;
  public readonly appDomainName: string;

  constructor(scope: Construct, id: string, props: DnsStackProps) {
    super(scope, id, props);

    const apiSubdomain = props.apiSubdomain ?? 'api';
    const appSubdomain = props.appSubdomain ?? 'app';
    this.apiDomainName = `${apiSubdomain}.${props.domainName}`;
    this.appDomainName = `${appSubdomain}.${props.domainName}`;

    this.hostedZone = props.hostedZoneId
      ? route53.PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
          hostedZoneId: props.hostedZoneId,
          zoneName: props.domainName,
        })
      : new route53.PublicHostedZone(this, 'HostedZone', {
          zoneName: props.domainName,
        });

    const apiCertificate = new acm.Certificate(this, 'ApiCertificate', {
      domainName: this.apiDomainName,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    // Shared with BalanceClientStack for the CloudFront distribution (us-east-1).
    this.clientCertificate = new acm.Certificate(this, 'ClientCertificate', {
      domainName: this.appDomainName,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    const apiDomain = new apigwv2.DomainName(this, 'ApiCustomDomain', {
      domainName: this.apiDomainName,
      certificate: apiCertificate,
    });

    new apigwv2.ApiMapping(this, 'ApiMapping', {
      api: props.httpApi,
      domainName: apiDomain,
      stage: props.httpApi.defaultStage,
    });

    const apiAliasTarget = route53.RecordTarget.fromAlias(
      new targets.ApiGatewayv2DomainProperties(
        apiDomain.regionalDomainName,
        apiDomain.regionalHostedZoneId,
      ),
    );

    new route53.ARecord(this, 'ApiAliasRecord', {
      zone: this.hostedZone,
      recordName: apiSubdomain,
      target: apiAliasTarget,
    });

    new route53.AaaaRecord(this, 'ApiAliasRecordIpv6', {
      zone: this.hostedZone,
      recordName: apiSubdomain,
      target: apiAliasTarget,
    });

    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId,
      exportName: 'BalanceHostedZoneId',
    });

    new cdk.CfnOutput(this, 'ApiDomainName', {
      value: this.apiDomainName,
      exportName: 'BalanceApiDomainName',
      description: 'Custom API URL — set AUTH_CALLBACK_URL to https://<this>/auth/callback',
    });

    new cdk.CfnOutput(this, 'AppDomainName', {
      value: this.appDomainName,
      exportName: 'BalanceAppDomainName',
      description: 'Client URL — set Lambda CLIENT_ORIGIN / CORS_ORIGIN to https://<this>',
    });

    new cdk.CfnOutput(this, 'NameServers', {
      value: props.hostedZoneId
        ? 'imported zone — manage NS at your registrar'
        : cdk.Fn.join(', ', this.hostedZone.hostedZoneNameServers ?? []),
      description: 'Point your registrar at these name servers (new zones only)',
    });
  }
}

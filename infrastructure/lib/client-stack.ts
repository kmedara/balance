import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export type ClientStackProps = cdk.StackProps & {
  /** Custom domain for the app (e.g. app.balance.com). Requires a certificate. */
  domainName?: string;
  /** ACM certificate (us-east-1) construct — preferred when wiring with BalanceDnsStack. */
  certificate?: acm.ICertificate;
  /** ACM certificate ARN in us-east-1 — alternative to `certificate` for standalone use. */
  certificateArn?: string;
  /** Hosted zone for the app record. When set with `domainName`, an alias is created. */
  hostedZone?: route53.IHostedZone;
  /** Optional Content-Security-Policy header value. Omit to skip CSP (avoids breaking the SPA). */
  contentSecurityPolicy?: string;
};

/**
 * Static hosting for the Angular client: private S3 bucket fronted by CloudFront.
 *
 * - Bucket blocks all public access; only CloudFront can read it via Origin Access Control.
 * - Viewer traffic is HTTPS-only; SPA deep links fall back to index.html.
 * - Assets are uploaded out-of-band (GitHub Actions: `aws s3 sync` + invalidation),
 *   so this stack provisions infrastructure only — not the built artifacts.
 */
export class ClientStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: ClientStackProps = {}) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'ClientBucket', {
      bucketName: `balance-client-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
      this,
      'SecurityHeaders',
      {
        responseHeadersPolicyName: `balance-client-security-${this.account}`,
        comment: 'Balance client security headers',
        securityHeadersBehavior: {
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.days(365),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
          },
          ...(props.contentSecurityPolicy
            ? {
                contentSecurityPolicy: {
                  contentSecurityPolicy: props.contentSecurityPolicy,
                  override: true,
                },
              }
            : {}),
        },
      },
    );

    const certificate =
      props.certificate ??
      (props.certificateArn
        ? acm.Certificate.fromCertificateArn(this, 'ClientCertificate', props.certificateArn)
        : undefined);
    const useCustomDomain = Boolean(props.domainName && certificate);

    this.distribution = new cloudfront.Distribution(this, 'ClientDistribution', {
      comment: 'Balance Angular client',
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      ...(useCustomDomain
        ? { domainNames: [props.domainName!], certificate }
        : {}),
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        responseHeadersPolicy,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    if (useCustomDomain && props.hostedZone) {
      const recordName = props.domainName!.replace(`.${props.hostedZone.zoneName}`, '');
      const aliasTarget = route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(this.distribution),
      );

      new route53.ARecord(this, 'ClientAliasRecord', {
        zone: props.hostedZone,
        recordName,
        target: aliasTarget,
      });

      new route53.AaaaRecord(this, 'ClientAliasRecordIpv6', {
        zone: props.hostedZone,
        recordName,
        target: aliasTarget,
      });
    }

    const clientUrl = useCustomDomain
      ? `https://${props.domainName}`
      : `https://${this.distribution.distributionDomainName}`;

    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
      exportName: 'BalanceClientBucketName',
      description: 'S3 bucket for `aws s3 sync` of the Angular build output',
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      exportName: 'BalanceClientDistributionId',
      description: 'CloudFront distribution id for cache invalidation',
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      exportName: 'BalanceClientDistributionDomainName',
    });

    new cdk.CfnOutput(this, 'ClientUrl', {
      value: clientUrl,
      exportName: 'BalanceClientUrl',
      description: 'Set Lambda CLIENT_ORIGIN to this value',
    });
  }
}

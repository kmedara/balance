export type CognitoEnvironment = {
  authority: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  scope: string;
  responseType: 'code';
  showDebugInformation: boolean;
};

export type Environment = {
  GATEWAY: string;
  authDisabled: boolean;
  cognito: CognitoEnvironment;
};

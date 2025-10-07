export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'YOUR_USER_POOL_ID',
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID',
      region: 'YOUR_REGION'
    }
  },
  API: {
    GraphQL: {
      endpoint: 'YOUR_APPSYNC_ENDPOINT',
      region: 'YOUR_REGION',
      defaultAuthMode: 'userPool'
    }
  }
};

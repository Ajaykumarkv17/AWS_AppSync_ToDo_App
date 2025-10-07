# Setup Guide

## Prerequisites

- AWS Account
- AWS CLI configured
- Node.js 18+

## Step 1: Deploy Backend

```bash
cd backend
npm run deploy
```

Wait for CloudFormation to complete (~5 minutes).

## Step 2: Get Backend Outputs

```bash
npm run outputs
```

Copy the values:
- GraphQLApiEndpoint
- UserPoolId
- UserPoolClientId
- Region

## Step 3: Configure Frontend

Edit `frontend/amplify-config.ts` with your values:

```typescript
export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_XXXXXXX',  // From outputs
      userPoolClientId: 'xxxxxxxxxxxxx',  // From outputs
      region: 'us-east-1'  // From outputs
    }
  },
  API: {
    GraphQL: {
      endpoint: 'https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql',  // From outputs
      region: 'us-east-1',  // From outputs
      defaultAuthMode: 'userPool'
    }
  }
};
```

## Step 4: Install & Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Step 5: Test Real-Time Features

1. Sign up with email/password
2. Create a todo
3. Open another browser window (incognito)
4. Sign in with same account
5. Create/update/delete todos in one window
6. Watch them update instantly in the other! ⚡

## Features Demonstrated

✅ **Real-time Subscriptions** - Changes appear instantly across all clients
✅ **Optimistic Locking** - Version-based conflict resolution
✅ **User Authentication** - Cognito integration
✅ **Offline Support** - Works offline, syncs when reconnected
✅ **Priority Levels** - HIGH, MEDIUM, LOW with color coding
✅ **Toggle Completion** - Quick status updates

## Clean Up

```bash
cd backend
npm run delete
```

## Troubleshooting

**Can't sign in?**
- Check Cognito User Pool settings
- Verify email is confirmed

**Subscriptions not working?**
- Check browser console for WebSocket errors
- Verify AppSync endpoint in config

**Mutations failing?**
- Check IAM roles in CloudFormation
- Verify DynamoDB table exists

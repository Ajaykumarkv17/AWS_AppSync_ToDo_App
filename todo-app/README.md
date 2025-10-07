# Real-Time Todo App with AWS AppSync

A showcase of AWS AppSync's power with real-time updates, offline sync, and multi-user collaboration.

## Features Showcased

✅ **Real-time Subscriptions** - See todos update instantly across all clients
✅ **Optimistic UI** - Instant feedback before server confirmation
✅ **Offline Support** - Works without internet, syncs when back online
✅ **Multi-user Collaboration** - Multiple users can work simultaneously
✅ **Conflict Resolution** - Automatic handling of concurrent edits
✅ **Fine-grained Auth** - User-specific todos with Cognito

## Architecture

```
Next.js Frontend → AWS AppSync → DynamoDB
                      ↓
                  Real-time WebSocket Subscriptions
```

## Setup

### 1. Backend (AWS AppSync)

```bash
cd backend
npm install
npm run deploy
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, AWS Amplify
- **Backend**: AWS AppSync, DynamoDB, Cognito
- **Real-time**: GraphQL Subscriptions over WebSocket

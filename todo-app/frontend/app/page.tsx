'use client';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { amplifyConfig } from '@/amplify-config';
import TodoList from '@/components/TodoList';

Amplify.configure(amplifyConfig);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">AppSync Todo App</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user?.signInDetails?.loginId}</span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
          <main className="py-8">
            <TodoList />
          </main>
        </div>
      )}
    </Authenticator>
  );
}

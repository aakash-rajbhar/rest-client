'use client';
import { useState } from 'react';
import RequestForm from './components/RequestForm';
import History from './components/History';

export default function Home() {
  const [refreshHistory, setRefreshHistory] = useState(0);

  // Increment this to trigger a refresh in History
  const triggerRefresh = () => setRefreshHistory((prev) => prev + 1);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* REST Client */}
        <RequestForm onSuccess={triggerRefresh} />

        {/* Request History */}
        <History refresh={refreshHistory} />
      </div>
    </main>
  );
}

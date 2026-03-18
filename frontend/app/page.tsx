'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [apiResponse, setApiResponse] = useState<any>(null);

  const checkBackend = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/health`);
      const data = await response.json();
      setApiStatus(`✅ Connected (Status: ${response.status})`);
      setApiResponse(data);
    } catch (error) {
      setApiStatus('❌ Failed to connect');
      console.error('API connection error:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Azure Microservices Demo</h1>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={checkBackend}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Check Backend
          </button>
        </div>

        {apiStatus && (
          <div className="mt-4 p-4 border rounded-lg w-full">
            <p className="font-mono text-sm">{apiStatus}</p>
            {apiResponse && (
              <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

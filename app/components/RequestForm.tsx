'use client';
import { useState } from 'react';

type ResponseType = {
  error?: string;
  [key: string]: unknown;
} | null;

interface RequestFormProps {
    onSuccess?: () => void;
}

export default function RequestForm({onSuccess}: RequestFormProps) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<ResponseType>(null);

  const sendRequest = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    let parsedBody = null;
    if (body && (method === 'POST' || method === 'PUT')) {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        alert('Invalid JSON body');
        return;
      }
    }

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url, body: parsedBody, headers: {} }),
      });
      const data = await res.json();
      setResponse(data);
      if (onSuccess) onSuccess();
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setResponse({ error: errorMessage });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">REST Client</h2>

      <div className="flex gap-2 flex-wrap">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded-md px-3 py-2 bg-gray-50 hover:bg-gray-100"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          type="text"
          placeholder="Request URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={sendRequest}
          className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition"
        >
          Send
        </button>
      </div>

      {(method === 'POST' || method === 'PUT') && (
        <textarea
          placeholder="JSON Body (POST/PUT only)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mt-4 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
          rows={6}
        />
      )}

      {response && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
          <h3 className="font-medium mb-2">Response</h3>
          <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';

interface HistoryItem {
  id: string;
  method: string;
  url: string;
  status: number;
  createdAt: string;
}

interface HistoryData {
  items: HistoryItem[];
  total: number;
}

export default function History({refresh}: {refresh: number}) {
  const [data, setData] = useState<HistoryData | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`/api/history?page=${page}`);
      const json = await res.json();
      setData(json);
    };
    fetchHistory();
  }, [page, refresh]);

  if (!data) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Request History</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.items.length === 0 && <p className="text-gray-500">No history yet.</p>}
        {data.items.map((item: HistoryItem) => (
          <div
            key={item.id}
            className="border-l-4 border-violet-500 bg-gray-50 p-3 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <span className="font-semibold">{item.method}</span> - {item.url}
            </div>
            <div className="text-sm text-gray-600">
              Status: {item.status} | {new Date(item.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md bg-neutral-300 hover:bg-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          disabled={page * 10 >= data.total}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md bg-neutral-300 hover:bg-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

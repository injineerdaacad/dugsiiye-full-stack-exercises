type ToolOutput = {
  success?: boolean;
  error?: string;
  count?: number;
  results?: Record<string, unknown>[];
};

export function ToolResult({ output }: { output: unknown }) {
  const data = output as ToolOutput;
  if (!data.success) {
    return <div className="mt-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">Error: {data.error}</div>;
  }

  const rows = data.results ?? [];
  if (rows.length === 0) {
    return <div className="mt-2 rounded border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-500">No results.</div>;
  }
  
  const columns = Object.keys(rows[0]).filter((c) => c !== "_id");
  return (
    <div className="mt-2 overflow-x-auto rounded border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-100">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium text-zinc-600">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-zinc-100">
              {columns.map((c) => (
                <td key={c} className="px-3 py-2 text-zinc-800">
                  {String(row[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-zinc-100 px-3 py-1.5 text-xs text-zinc-400">{data.count ?? rows.length} result(s)</div>
    </div>
  );
}

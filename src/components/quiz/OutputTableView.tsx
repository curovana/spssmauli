import type { OutputTable } from "@/types/learning";

export function OutputTableView({ table }: { table: OutputTable }) {
  const isHighlighted = (rowIndex: number, columnIndex: number) =>
    table.highlightedCells?.some((cell) => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex);

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950">
        {table.caption}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white">
              {table.columns.map((column) => (
                <th key={column} className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-600">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${table.caption}-${rowIndex}`} className="border-b border-slate-100 last:border-0">
                {row.map((cell, columnIndex) => (
                  <td
                    key={`${table.caption}-${rowIndex}-${columnIndex}`}
                    className={`px-4 py-3 ${
                      isHighlighted(rowIndex, columnIndex)
                        ? "bg-indigo-100 font-semibold text-indigo-950 ring-1 ring-inset ring-indigo-200"
                        : "text-slate-700"
                    }`}
                  >
                    {cell || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

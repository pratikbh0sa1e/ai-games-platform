export default function Board({ grid, renderCell }) {
  return (
    <div className="inline-flex flex-col gap-1 bg-white/5 border border-white/10 p-3 rounded-3xl shadow-xl">
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((cell, c) => (
            <div key={c} className="w-8 h-8 flex items-center justify-center">
              {renderCell(cell, r, c)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

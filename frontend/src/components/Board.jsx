export default function Board({ grid, renderCell }) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "4px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "12px",
      }}
    >
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex", gap: "4px" }}>
          {row.map((cell, c) => (
            <div key={c} style={{ width: "32px", height: "32px" }}>
              {renderCell(cell, r, c)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

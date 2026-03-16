export default function ControlPanel({ actions = [] }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {actions.map(({ label, onClick, disabled }, i) => (
        <button
          key={label}
          onClick={onClick}
          disabled={disabled}
          style={{
            padding: "10px 24px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 500,
            border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
            transition: "all 0.15s",
            background: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.08)",
            color: "#fff",
            boxShadow: i === 0 ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

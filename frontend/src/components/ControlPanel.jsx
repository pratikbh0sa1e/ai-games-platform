export default function ControlPanel({ actions = [] }) {
  return (
    <div className="flex gap-3">
      {actions.map(({ label, onClick, disabled }, i) => (
        <button
          key={label}
          onClick={onClick}
          disabled={disabled}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed
            ${
              i === 0
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40"
                : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

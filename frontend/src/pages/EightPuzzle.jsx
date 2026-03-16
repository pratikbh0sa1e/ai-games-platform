import { useState } from "react";
import ControlPanel from "../components/ControlPanel";
import { solvePuzzle } from "../services/aiService";

const INITIAL = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 5, 8],
];

export default function EightPuzzle() {
  const [board, setBoard] = useState(INITIAL);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSolve() {
    setLoading(true);
    setMoves([]);
    const result = await solvePuzzle({ board });
    setMoves(result.moves);
    setLoading(false);
  }

  function handleReset() {
    setBoard(INITIAL);
    setMoves([]);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 pb-16 pt-10 flex flex-col items-center">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-3xl" />
      </div>

      <h1 className="text-4xl font-bold mt-10 mb-2">8-Puzzle</h1>
      <p className="text-gray-400 text-sm mb-8">
        AI solves the sliding tile puzzle using A*
      </p>

      <div className="inline-grid grid-cols-3 gap-2 bg-white/5 border border-white/10 p-3 rounded-3xl shadow-xl mb-4">
        {board.flat().map((val, i) => (
          <div
            key={i}
            className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-bold transition-all
              ${
                val === 0
                  ? "bg-transparent border-2 border-dashed border-white/10"
                  : "bg-white/10 border border-white/10 text-white hover:bg-white/15"
              }`}
          >
            {val !== 0 && val}
          </div>
        ))}
      </div>

      {moves.length > 0 && (
        <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2 mb-2">
          <span className="text-purple-400 text-sm font-medium">
            Solved in {moves.length} moves
          </span>
        </div>
      )}

      <ControlPanel
        actions={[
          {
            label: loading ? "Solving..." : "Solve",
            onClick: handleSolve,
            disabled: loading,
          },
          { label: "Reset", onClick: handleReset },
        ]}
      />
    </main>
  );
}

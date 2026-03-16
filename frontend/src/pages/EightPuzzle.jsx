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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-10">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-6 backdrop-blur-sm shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-1">8-Puzzle</h1>
          <p className="text-gray-400 text-sm">
            AI solves the sliding tile puzzle using A*
          </p>
        </div>

        <div className="inline-grid grid-cols-3 gap-2 bg-white/5 border border-white/10 p-3 rounded-3xl">
          {board.flat().map((val, i) => (
            <div
              key={i}
              className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-bold transition-all
              ${val === 0 ? "border-2 border-dashed border-white/10" : "bg-white/10 border border-white/10 text-white"}`}
            >
              {val !== 0 && val}
            </div>
          ))}
        </div>

        {moves.length > 0 && (
          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2">
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
      </div>
    </div>
  );
}

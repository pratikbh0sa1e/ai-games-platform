import { useState } from "react";
import Board from "../components/Board";
import ControlPanel from "../components/ControlPanel";
import useGameState from "../hooks/useGameState";
import { solveMaze } from "../services/aiService";

const ROWS = 10;
const COLS = 10;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill("empty"));
}

const CELL_STYLES = {
  empty: "bg-white/5 rounded-md",
  wall: "bg-gray-500 rounded-md",
  start: "bg-emerald-500 rounded-md",
  end: "bg-rose-500 rounded-md",
};

export default function MazeSolver() {
  const { state, setState } = useGameState({
    grid: createEmptyGrid(),
    path: [],
    loading: false,
  });
  const [algorithm, setAlgorithm] = useState("bfs");

  async function handleSolve() {
    setState((s) => ({ ...s, loading: true, path: [] }));
    const result = await solveMaze({ grid: state.grid, algorithm });
    setState((s) => ({ ...s, path: result.path, loading: false }));
  }

  function handleReset() {
    setState({ grid: createEmptyGrid(), path: [], loading: false });
  }

  function renderCell(cell, r, c) {
    const isPath = state.path.some(([pr, pc]) => pr === r && pc === c);
    return (
      <div
        className={`w-full h-full ${isPath ? "bg-purple-500 rounded-md" : CELL_STYLES[cell] || CELL_STYLES.empty}`}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 pb-16 pt-10 flex flex-col items-center">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-3xl" />
      </div>

      <h1 className="text-4xl font-bold mt-10 mb-2">Maze Solver</h1>
      <p className="text-gray-400 text-sm mb-8">
        Select an algorithm and solve the maze
      </p>

      <div className="flex gap-2 mb-8 bg-white/5 border border-white/10 rounded-full p-1">
        {["bfs", "dfs", "astar"].map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all
              ${
                algorithm === algo
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            {algo === "astar" ? "A*" : algo.toUpperCase()}
          </button>
        ))}
      </div>

      <Board grid={state.grid} renderCell={renderCell} />
      <ControlPanel
        actions={[
          {
            label: state.loading ? "Solving..." : "Solve",
            onClick: handleSolve,
            disabled: state.loading,
          },
          { label: "Reset", onClick: handleReset },
        ]}
      />
    </main>
  );
}

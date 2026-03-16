import { useState, useRef, useCallback } from "react";
import {
  Zap,
  RotateCcw,
  Play,
  Square,
  Pencil,
  Eraser,
  Flag,
  MapPin,
} from "lucide-react";
import { solveMaze } from "../services/aiService";

const ROWS = 12,
  COLS = 16;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill("empty"));
}

const CELL_COLORS = {
  empty: "rgba(255,255,255,0.04)",
  wall: "#374151",
  start: "#10b981",
  end: "#f43f5e",
  path: "#7c3aed",
  visited: "rgba(124,58,237,0.25)",
};

const ALGOS = [
  { id: "bfs", label: "BFS" },
  { id: "dfs", label: "DFS" },
  { id: "astar", label: "A*" },
];

const MODES = [
  { id: "wall", label: "Wall", Icon: Pencil },
  { id: "erase", label: "Erase", Icon: Eraser },
  { id: "start", label: "Start", Icon: Flag },
  { id: "end", label: "End", Icon: MapPin },
];

export default function MazeSolver() {
  const [grid, setGrid] = useState(createEmptyGrid);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [paintMode, setPaintMode] = useState("wall");
  const [visiblePath, setVisiblePath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [stepInfo, setStepInfo] = useState(null);
  const isPainting = useRef(false);
  const intervalRef = useRef(null);

  function stopAnimation() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setAnimating(false);
    setStepInfo(null);
  }

  function applyPaint(r, c, currentGrid) {
    const cell = currentGrid[r][c];
    let newVal;
    if (paintMode === "erase") {
      newVal = "empty";
    } else if (paintMode === "start" || paintMode === "end") {
      newVal = paintMode;
    } else {
      // wall toggle
      newVal = cell === "wall" ? "empty" : "wall";
    }

    // Only one start and one end allowed
    const next = currentGrid.map((row, ri) =>
      row.map((v, ci) => {
        if (ri === r && ci === c) return newVal;
        if (
          (paintMode === "start" && v === "start") ||
          (paintMode === "end" && v === "end")
        )
          return "empty";
        return v;
      }),
    );
    return next;
  }

  const handleCellDown = useCallback(
    (r, c) => {
      isPainting.current = true;
      stopAnimation();
      setVisiblePath([]);
      setGrid((g) => applyPaint(r, c, g));
    },
    [paintMode],
  );

  const handleCellEnter = useCallback(
    (r, c) => {
      if (!isPainting.current) return;
      setGrid((g) => applyPaint(r, c, g));
    },
    [paintMode],
  );

  function handleMouseUp() {
    isPainting.current = false;
  }

  async function handleSolve() {
    stopAnimation();
    setVisiblePath([]);
    setLoading(true);
    try {
      const result = await solveMaze({ grid, algorithm });
      const path = result.path || [];
      setLoading(false);
      if (path.length === 0) return;
      setAnimating(true);
      let i = 0;
      setStepInfo({ current: 0, total: path.length });
      intervalRef.current = setInterval(() => {
        i++;
        setVisiblePath(path.slice(0, i));
        setStepInfo({ current: i, total: path.length });
        if (i >= path.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setAnimating(false);
        }
      }, 40);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  function handleReset() {
    stopAnimation();
    setGrid(createEmptyGrid());
    setVisiblePath([]);
  }

  const pathSet = new Set(visiblePath.map(([r, c]) => `${r},${c}`));

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onMouseUp={handleMouseUp}
    >
      <div
        className="game-card"
        style={{
          background: "rgba(255,255,255,0.09)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "28px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 4px",
            }}
          >
            Maze Solver
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Paint walls, place start/end, then watch the AI solve it
          </p>
        </div>

        {/* Toolbar row */}
        <div
          className="toolbar-wrap"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Algorithm toggle */}
          <div
            style={{
              display: "flex",
              gap: "3px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "3px",
            }}
          >
            {ALGOS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setAlgorithm(id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: algorithm === id ? "#7c3aed" : "transparent",
                  color: algorithm === id ? "#fff" : "#9ca3af",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Paint mode toggle */}
          <div
            style={{
              display: "flex",
              gap: "3px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "3px",
            }}
          >
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setPaintMode(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background:
                    paintMode === id
                      ? id === "start"
                        ? "#10b981"
                        : id === "end"
                          ? "#f43f5e"
                          : id === "erase"
                            ? "#6b7280"
                            : "#374151"
                      : "transparent",
                  color: paintMode === id ? "#fff" : "#9ca3af",
                }}
              >
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: "3px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "10px",
            userSelect: "none",
            cursor: "crosshair",
          }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, r) => (
            <div key={r} style={{ display: "flex", gap: "3px" }}>
              {row.map((cell, c) => {
                const isPath = pathSet.has(`${r},${c}`);
                const bg = isPath
                  ? CELL_COLORS.path
                  : CELL_COLORS[cell] || CELL_COLORS.empty;
                return (
                  <div
                    key={c}
                    className="maze-grid-cell"
                    onMouseDown={() => handleCellDown(r, c)}
                    onMouseEnter={() => handleCellEnter(r, c)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleCellDown(r, c);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      const t = e.touches[0];
                      const el = document.elementFromPoint(
                        t.clientX,
                        t.clientY,
                      );
                      if (el?.dataset?.row && el?.dataset?.col) {
                        handleCellEnter(
                          Number(el.dataset.row),
                          Number(el.dataset.col),
                        );
                      }
                    }}
                    data-row={r}
                    data-col={c}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "5px",
                      background: bg,
                      border: isPath
                        ? "1px solid rgba(124,58,237,0.5)"
                        : "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.1s",
                      boxShadow: isPath
                        ? "0 0 6px rgba(124,58,237,0.4)"
                        : "none",
                      touchAction: "none",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Step info */}
        {stepInfo && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "999px",
              padding: "7px 18px",
            }}
          >
            <Play size={12} color="#a78bfa" />
            <span
              style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 500 }}
            >
              Step {stepInfo.current} / {stepInfo.total}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleSolve}
            disabled={loading || animating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 22px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: loading || animating ? "not-allowed" : "pointer",
              background:
                loading || animating ? "rgba(255,255,255,0.05)" : "#7c3aed",
              color: loading || animating ? "#6b7280" : "#fff",
            }}
          >
            <Zap size={14} /> {loading ? "Solving..." : "Solve"}
          </button>
          {animating && (
            <button
              onClick={stopAnimation}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 22px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: "#f43f5e",
                color: "#fff",
              }}
            >
              <Square size={14} /> Stop
            </button>
          )}
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 22px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: "rgba(255,255,255,0.08)",
              color: "#d1d5db",
            }}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

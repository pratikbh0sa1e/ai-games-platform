import { useState, useRef } from "react";
import { BrainCircuit, Shuffle, RotateCcw, Play, Square } from "lucide-react";
import { solvePuzzle, shufflePuzzle } from "../services/aiService";

const INITIAL = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 5, 8],
];

const btnStyle = (color = "#7c3aed", disabled = false) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "9px 20px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 600,
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  background: disabled ? "rgba(255,255,255,0.05)" : color,
  color: disabled ? "#6b7280" : "#fff",
  opacity: disabled ? 0.6 : 1,
  transition: "opacity 0.15s",
});

export default function EightPuzzle() {
  const [board, setBoard] = useState(INITIAL);
  const [animating, setAnimating] = useState(false);
  const [stepInfo, setStepInfo] = useState(null); // { current, total }
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  function stopAnimation() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setAnimating(false);
    setStepInfo(null);
  }

  async function handleShuffle() {
    stopAnimation();
    setLoading(true);
    try {
      const result = await shufflePuzzle();
      setBoard(result.board);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function handleSolve() {
    stopAnimation();
    setLoading(true);
    try {
      const result = await solvePuzzle({ board });
      const { states } = result;
      if (!states || states.length <= 1) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setAnimating(true);
      let i = 0;
      setStepInfo({ current: 0, total: states.length - 1 });
      intervalRef.current = setInterval(() => {
        i++;
        setBoard(states[i]);
        setStepInfo({ current: i, total: states.length - 1 });
        if (i >= states.length - 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setAnimating(false);
        }
      }, 350);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  function handleReset() {
    stopAnimation();
    setBoard(INITIAL);
  }

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.09)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "28px",
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4px",
            }}
          >
            <BrainCircuit size={22} color="#a78bfa" />
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            8-Puzzle
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            AI solves the sliding tile puzzle using A*
          </p>
        </div>

        {/* Board */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 80px)",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "12px",
          }}
        >
          {board.flat().map((val, i) => (
            <div
              key={i}
              style={{
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                fontSize: "28px",
                fontWeight: 700,
                color: "#fff",
                background:
                  val === 0 ? "transparent" : "rgba(255,255,255,0.08)",
                border:
                  val === 0
                    ? "2px dashed rgba(255,255,255,0.14)"
                    : "1px solid rgba(255,255,255,0.14)",
                transition: "background 0.2s",
              }}
            >
              {val !== 0 && val}
            </div>
          ))}
        </div>

        {/* Step progress */}
        {stepInfo && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "999px",
              padding: "8px 20px",
            }}
          >
            <Play size={13} color="#a78bfa" />
            <span
              style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 500 }}
            >
              Step {stepInfo.current} / {stepInfo.total}
            </span>
          </div>
        )}

        {/* Controls */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            style={btnStyle("#10b981", loading || animating)}
            onClick={handleShuffle}
            disabled={loading || animating}
          >
            <Shuffle size={14} /> Shuffle
          </button>
          <button
            style={btnStyle("#7c3aed", loading || animating)}
            onClick={handleSolve}
            disabled={loading || animating}
          >
            <BrainCircuit size={14} /> {loading ? "Solving..." : "Solve"}
          </button>
          {animating && (
            <button style={btnStyle("#f43f5e")} onClick={stopAnimation}>
              <Square size={14} /> Stop
            </button>
          )}
          <button
            style={btnStyle("rgba(255,255,255,0.1)", loading || animating)}
            onClick={handleReset}
            disabled={loading || animating}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}

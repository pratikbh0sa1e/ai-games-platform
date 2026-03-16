import { useState } from "react";
import { Hand, FileText, Scissors, Bot } from "lucide-react";
import { playRPS } from "../services/aiService";

const CHOICES = [
  { id: "rock", Icon: Hand, label: "Rock" },
  { id: "paper", Icon: FileText, label: "Paper" },
  { id: "scissors", Icon: Scissors, label: "Scissors" },
];

const OUTCOME = {
  win: {
    label: "You Win!",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  lose: {
    label: "You Lose",
    color: "#fb7185",
    bg: "rgba(251,113,133,0.08)",
    border: "rgba(251,113,133,0.2)",
  },
  draw: {
    label: "Draw",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
};

export default function RockPaperScissors() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePlay(choice) {
    setLoading(true);
    const res = await playRPS({ choice });
    setResult(res);
    setLoading(false);
  }

  const o = result ? OUTCOME[result.outcome] : null;

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
        className="game-card"
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
            <Bot size={22} color="#a78bfa" />
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            Rock Paper Scissors
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Pick your move and challenge the AI
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {CHOICES.map(({ id, Icon, label }) => (
            <button
              key={id}
              className="rps-btn"
              onClick={() => handlePlay(id)}
              disabled={loading}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                background:
                  result?.player === id
                    ? "rgba(124,58,237,0.15)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${result?.player === id ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.14)"}`,
                borderRadius: "24px",
                padding: "28px 36px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={26} color="#e2e8f0" />
              </div>
              <span
                style={{ fontSize: "13px", color: "#d1d5db", fontWeight: 500 }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        {result && o && (
          <div
            style={{
              background: o.bg,
              border: `1px solid ${o.border}`,
              borderRadius: "24px",
              padding: "24px 32px",
              textAlign: "center",
              minWidth: "260px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "16px",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  You
                </span>
                {(() => {
                  const C = CHOICES.find((c) => c.id === result.player);
                  return C ? <C.Icon size={32} color="#e2e8f0" /> : null;
                })()}
                <span style={{ fontSize: "12px", color: "#d1d5db" }}>
                  {result.player}
                </span>
              </div>
              <span
                style={{
                  color: "#4b5563",
                  alignSelf: "center",
                  fontSize: "18px",
                  fontWeight: 300,
                }}
              >
                vs
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  AI
                </span>
                {(() => {
                  const C = CHOICES.find((c) => c.id === result.ai);
                  return C ? <C.Icon size={32} color="#e2e8f0" /> : null;
                })()}
                <span style={{ fontSize: "12px", color: "#d1d5db" }}>
                  {result.ai}
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: o.color,
                margin: 0,
              }}
            >
              {o.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

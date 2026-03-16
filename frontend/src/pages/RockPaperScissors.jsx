import { useState } from "react";
import { playRPS } from "../services/aiService";

const CHOICES = [
  { id: "rock", emoji: "🪨", label: "Rock" },
  { id: "paper", emoji: "📄", label: "Paper" },
  { id: "scissors", emoji: "✂️", label: "Scissors" },
];

const OUTCOME_CONFIG = {
  win: {
    label: "You Win!",
    style: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  lose: {
    label: "You Lose",
    style: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  draw: {
    label: "Draw",
    style: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
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

  const outcome = result ? OUTCOME_CONFIG[result.outcome] : null;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 pb-16 pt-10 flex flex-col items-center">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-3xl" />
      </div>

      <h1 className="text-4xl font-bold mt-10 mb-2">Rock Paper Scissors</h1>
      <p className="text-gray-400 text-sm mb-10">
        Pick your move and challenge the AI
      </p>

      <div className="flex gap-4 mb-10">
        {CHOICES.map(({ id, emoji, label }) => (
          <button
            key={id}
            onClick={() => handlePlay(id)}
            disabled={loading}
            className={`flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50
              rounded-3xl px-10 py-7 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
              ${result?.player === id ? "border-purple-500 bg-purple-500/10" : ""}`}
          >
            <span className="text-5xl">{emoji}</span>
            <span className="text-sm text-gray-300 font-medium">{label}</span>
          </button>
        ))}
      </div>

      {result && outcome && (
        <div
          className={`border rounded-3xl p-6 text-center w-72 shadow-xl ${outcome.bg}`}
        >
          <div className="flex justify-around text-4xl mb-5">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                You
              </span>
              <span>{CHOICES.find((c) => c.id === result.player)?.emoji}</span>
            </div>
            <span className="text-gray-600 self-center text-xl">vs</span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                AI
              </span>
              <span>{CHOICES.find((c) => c.id === result.ai)?.emoji}</span>
            </div>
          </div>
          <p className={`text-2xl font-bold ${outcome.style}`}>
            {outcome.label}
          </p>
        </div>
      )}
    </main>
  );
}

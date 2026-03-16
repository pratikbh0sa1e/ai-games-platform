import { Link } from "react-router-dom";
import CardSwap, { Card } from "../components/CardSwap";

const GAMES = [
  {
    title: "Maze Solver",
    description: "Watch BFS, DFS, or A* navigate a maze in real time.",
    path: "/maze",
    icon: "🧩",
    tag: "Pathfinding",
  },
  {
    title: "8-Puzzle",
    description: "AI solves the classic sliding tile puzzle using A*.",
    path: "/puzzle",
    icon: "🔢",
    tag: "Heuristic Search",
  },
  {
    title: "Rock Paper Scissors",
    description: "Play against an AI opponent and see who wins.",
    path: "/rps",
    icon: "✊",
    tag: "Game AI",
  },
];

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left — hero */}
        <div className="flex-1 flex flex-col items-start gap-5 max-w-xl">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/25 px-4 py-1.5 rounded-full">
            Powered by AI Algorithms
          </span>
          <h1 className="text-6xl font-bold leading-tight text-white">
            AI Games
            <br />
            <span className="text-purple-400">Platform</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Classic games brought to life with intelligent algorithms —
            pathfinding, heuristic search, and game AI.
          </p>
          <div className="flex gap-3 mt-1">
            <Link
              to="/maze"
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-purple-900/40"
            >
              Start Playing →
            </Link>
            <Link
              to="/rps"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-6 py-2.5 rounded-full font-medium text-sm transition-all"
            >
              Try RPS
            </Link>
          </div>

          {/* Mini game pills */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {GAMES.map((g) => (
              <Link
                key={g.path}
                to={g.path}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 px-4 py-2 rounded-full text-sm text-gray-300 transition-all"
              >
                <span>{g.icon}</span>
                {g.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — CardSwap */}
        <div
          className="flex-1 flex justify-center items-center"
          style={{ height: "420px", position: "relative" }}
        >
          <CardSwap
            cardDistance={55}
            verticalDistance={65}
            delay={4000}
            pauseOnHover={true}
            width={300}
            height={180}
            easing="elastic"
          >
            {GAMES.map((g) => (
              <Card key={g.path}>
                <div className="w-full h-full p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{g.icon}</span>
                    <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                      {g.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">
                      {g.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                  <Link
                    to={g.path}
                    className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-full w-fit transition-colors"
                  >
                    Play →
                  </Link>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
}

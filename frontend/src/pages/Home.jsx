import { Link } from "react-router-dom";
import CardSwap, { Card } from "../components/CardSwap";
import RippleGrid from "../components/RippleGrid";

const GAMES = [
  {
    title: "Maze Solver",
    description: "Watch BFS, DFS, or A* navigate through a maze in real time.",
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
    <main className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* RippleGrid background */}
      <div className="fixed inset-0 z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#7c3aed"
          rippleIntensity={0.04}
          gridSize={8}
          gridThickness={20}
          fadeDistance={1.2}
          vignetteStrength={2.5}
          glowIntensity={0.15}
          opacity={0.35}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 lg:px-20 py-24 gap-16 max-w-7xl mx-auto">
        {/* Left — hero text */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-lg">
          <span className="inline-block text-xs font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full">
            Powered by AI Algorithms
          </span>
          <h1 className="text-6xl font-bold leading-tight text-white">
            AI Games
            <br />
            <span className="text-purple-400">Platform</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Classic games brought to life with intelligent algorithms —
            pathfinding, heuristic search, and game AI.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              to="/maze"
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-medium text-sm transition-all shadow-lg shadow-purple-900/40"
            >
              Start Playing →
            </Link>
            <a
              href="#games"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-6 py-3 rounded-full font-medium text-sm transition-all"
            >
              View Games
            </a>
          </div>
        </div>

        {/* Right — CardSwap */}
        <div
          className="flex-1 flex justify-center items-center"
          style={{ height: "520px", position: "relative" }}
        >
          <CardSwap
            cardDistance={55}
            verticalDistance={65}
            delay={4000}
            pauseOnHover={true}
            width={320}
            height={200}
            easing="elastic"
          >
            {GAMES.map((g) => (
              <Card key={g.path}>
                <div className="w-full h-full p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{g.icon}</span>
                    <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                      {g.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {g.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                  <Link
                    to={g.path}
                    className="inline-block text-center bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors w-fit"
                  >
                    Play →
                  </Link>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* Games grid section */}
      <div
        id="games"
        className="relative z-10 px-8 lg:px-20 pb-24 max-w-7xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">
          All Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {GAMES.map((g) => (
            <Link
              key={g.path}
              to={g.path}
              className="group bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{g.icon}</span>
                <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                  {g.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{g.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {g.description}
              </p>
              <span className="text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                Play →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

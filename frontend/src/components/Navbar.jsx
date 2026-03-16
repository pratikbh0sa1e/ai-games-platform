import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/maze", label: "Maze Solver" },
  { to: "/puzzle", label: "8-Puzzle" },
  { to: "/rps", label: "Rock Paper Scissors" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center pt-6 px-4">
      <nav className="flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 shadow-lg">
        <Link
          to="/"
          className="font-bold text-sm text-white px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors mr-2"
        >
          AI Games
        </Link>
        {LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-sm px-4 py-1.5 rounded-full transition-colors
              ${
                pathname === to
                  ? "bg-white/15 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

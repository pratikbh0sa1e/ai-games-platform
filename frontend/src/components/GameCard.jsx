import { Link } from "react-router-dom";

export default function GameCard({ title, description, path, icon }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl">
      {icon && <div className="text-4xl">{icon}</div>}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-gray-400 text-sm flex-1 leading-relaxed">
        {description}
      </p>
      <Link
        to={path}
        className="mt-auto inline-block text-center bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-md shadow-purple-900/30"
      >
        Play →
      </Link>
    </div>
  );
}

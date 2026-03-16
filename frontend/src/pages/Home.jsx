import { Link } from "react-router-dom";
import { Puzzle, Grid3x3, Swords, ArrowRight } from "lucide-react";
import CardSwap, { Card } from "../components/CardSwap";

const P = ({ children }) => (
  <span style={{ color: "#a78bfa" }}>{children}</span>
);

const GAMES = [
  {
    title: "Maze Solver",
    desc: (
      <span>
        Watch <P>BFS, DFS, or A*</P> navigate a maze in <P>real time</P>.
      </span>
    ),
    path: "/maze",
    Icon: Puzzle,
    tag: "Pathfinding",
  },
  {
    title: "8-Puzzle",
    desc: (
      <span>
        AI solves the classic sliding tile puzzle using <P>A* search</P>.
      </span>
    ),
    path: "/puzzle",
    Icon: Grid3x3,
    tag: "Heuristic Search",
  },
  {
    title: "Rock Paper Scissors",
    desc: (
      <span>
        Play against an <P>AI opponent</P> and see <P>who wins</P>.
      </span>
    ),
    path: "/rps",
    Icon: Swords,
    tag: "Game AI",
  },
];

export default function Home() {
  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        overflow: "hidden",
      }}
      className="home-layout"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          alignItems: "center",
          gap: "80px",
        }}
        className="home-layout"
      >
        {/* Left */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "fit-content",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a78bfa",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              padding: "5px 14px",
              borderRadius: "999px",
            }}
          >
            Powered by AI Algorithms
          </span>
          <h1
            className="home-hero-title"
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src="/logo.svg"
              alt="Algora"
              style={{ width: "56px", height: "56px" }}
            />
            Algora
          </h1>
          <h2
            className="home-hero-subtitle"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
              margin: 0,
            }}
          >
            AI Games <span style={{ color: "#a78bfa" }}>Platform</span>
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#9ca3af",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "360px",
            }}
          >
            Classic games brought to life with intelligent algorithms —
            pathfinding, heuristic search, and game AI.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              to="/maze"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#7c3aed",
                color: "#fff",
                padding: "11px 24px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}
            >
              Start Playing <ArrowRight size={15} />
            </Link>
            <Link
              to="/rps"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#d1d5db",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "11px 24px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Try RPS
            </Link>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {GAMES.map(({ title, path, Icon }) => (
              <Link
                key={path}
                to={path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#d1d5db",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                <Icon size={13} /> {title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — CardSwap, large like the reference */}
        <div
          className="home-cardswap-wrap"
          style={{
            flex: "0 0 600px",
            height: "560px",
            position: "relative",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardSwap
            cardDistance={55}
            verticalDistance={90}
            delay={4000}
            pauseOnHover={false}
            width={500}
            height={320}
            easing="elastic"
          >
            {GAMES.map(({ title, desc, path, Icon, tag }) => (
              <Card key={path}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "rgba(124,58,237,0.2)",
                          border: "1px solid rgba(124,58,237,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={18} color="#a78bfa" />
                      </div>
                      <h2
                        style={{
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "28px",
                          margin: 0,
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {title}
                      </h2>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#a78bfa",
                        background: "rgba(139,92,246,0.12)",
                        border: "1px solid rgba(139,92,246,0.25)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#e5e7eb",
                      fontSize: "22px",
                      fontWeight: 700,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                  <Link
                    to={path}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#7c3aed",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "9px 20px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    Play <ArrowRight size={13} />
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

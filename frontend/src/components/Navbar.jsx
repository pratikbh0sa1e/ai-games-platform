import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cpu, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/maze", label: "Maze Solver" },
  { to: "/puzzle", label: "8-Puzzle" },
  { to: "/rps", label: "Rock Paper Scissors" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: floating centered pill ── */}
      <div
        className="desktop-nav"
        style={{
          position: "sticky",
          top: "12px",
          zIndex: 50,
          width: "100%",
          padding: "0 16px",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <header
          style={{ pointerEvents: "auto", width: "100%", maxWidth: "700px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              padding: "0 16px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "8px",
                  background: "rgba(124,58,237,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cpu size={14} color="#a78bfa" />
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                AI Games
              </span>
            </Link>

            {/* Center links */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "12px",
                padding: "4px",
              }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: pathname === to ? 600 : 400,
                    color: pathname === to ? "#fff" : "#94a3b8",
                    background:
                      pathname === to ? "rgba(255,255,255,0.1)" : "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div style={{ flexShrink: 0, width: "80px" }} />
          </div>
        </header>
      </div>

      {/* ── Mobile: full-width sticky bar ── */}
      <header
        className="mobile-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            padding: "0 16px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "rgba(124,58,237,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cpu size={15} color="#a78bfa" />
            </div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
              AI Games
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              padding: "8px",
              borderRadius: "10px",
              border: "none",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: pathname === to ? 600 : 400,
                  color: pathname === to ? "#a78bfa" : "#94a3b8",
                  background:
                    pathname === to ? "rgba(124,58,237,0.15)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

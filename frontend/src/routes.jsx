import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MazeSolver from "./pages/MazeSolver";
import EightPuzzle from "./pages/EightPuzzle";
import RockPaperScissors from "./pages/RockPaperScissors";
import Navbar from "./components/Navbar";
import RippleGrid from "./components/RippleGrid";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Fixed full-screen RippleGrid behind everything */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <RippleGrid
          enableRainbow={true}
          gridColor="#7c3aed"
          rippleIntensity={0.05}
          gridSize={20}
          gridThickness={20}
          fadeDistance={3}
          vignetteStrength={2.0}
          glowIntensity={0.12}
          opacity={0.5}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
        />
      </div>

      {/* All content above the grid */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maze" element={<MazeSolver />} />
          <Route path="/puzzle" element={<EightPuzzle />} />
          <Route path="/rps" element={<RockPaperScissors />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

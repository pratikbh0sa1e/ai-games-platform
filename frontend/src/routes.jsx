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
      <div className="fixed inset-0 z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#7c3aed"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          fadeDistance={1.5}
          vignetteStrength={2.0}
          glowIntensity={0.12}
          opacity={0.5}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
        />
      </div>

      {/* Floating navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Page content */}
      <div className="relative z-10">
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

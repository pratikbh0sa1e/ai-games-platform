import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MazeSolver from "./pages/MazeSolver";
import EightPuzzle from "./pages/EightPuzzle";
import RockPaperScissors from "./pages/RockPaperScissors";
import Navbar from "./components/Navbar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maze" element={<MazeSolver />} />
        <Route path="/puzzle" element={<EightPuzzle />} />
        <Route path="/rps" element={<RockPaperScissors />} />
      </Routes>
    </BrowserRouter>
  );
}

export function listGames(req, res) {
  res.json([
    { id: "maze", name: "Maze Solver", path: "/maze" },
    { id: "puzzle", name: "8-Puzzle", path: "/puzzle" },
    { id: "rps", name: "Rock Paper Scissors", path: "/rps" },
  ]);
}

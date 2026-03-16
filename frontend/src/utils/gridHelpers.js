/** Create a 2D grid filled with a value */
export function createGrid(rows, cols, fill = null) {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

/** Clone a 2D grid */
export function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

/** Get valid neighbors (up/down/left/right) for a cell */
export function getNeighbors(grid, row, col) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  return dirs
    .map(([dr, dc]) => [row + dr, col + dc])
    .filter(
      ([r, c]) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length,
    );
}

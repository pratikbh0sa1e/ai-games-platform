/** Check if a move is within grid bounds */
export function isValidMove(grid, row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

/** Check if a cell is walkable (not a wall) */
export function isWalkable(grid, row, col) {
  return isValidMove(grid, row, col) && grid[row][col] !== "wall";
}

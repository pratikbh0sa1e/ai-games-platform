from collections import deque

DIRS = [(-1,0),(1,0),(0,-1),(0,1)]

def bfs(grid, start, end):
    """BFS on a 2D grid. Returns path as list of [row, col] or []."""
    rows, cols = len(grid), len(grid[0])
    queue = deque([[start]])
    visited = {tuple(start)}

    while queue:
        path = queue.popleft()
        r, c = path[-1]
        if [r, c] == end:
            return path
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited and grid[nr][nc] != 'wall':
                visited.add((nr, nc))
                queue.append(path + [[nr, nc]])
    return []

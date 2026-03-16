import heapq
from app.utils.heuristic import manhattan

DIRS = [(-1,0),(1,0),(0,-1),(0,1)]

def astar(grid, start, end):
    """A* on a 2D grid. Returns path as list of [row, col] or []."""
    rows, cols = len(grid), len(grid[0])
    h = manhattan(start, end)
    # (f, g, path)
    heap = [(h, 0, [start])]
    visited = set()

    while heap:
        f, g, path = heapq.heappop(heap)
        r, c = path[-1]
        if (r, c) in visited:
            continue
        visited.add((r, c))
        if [r, c] == end:
            return path
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited and grid[nr][nc] != 'wall':
                ng = g + 1
                nf = ng + manhattan([nr, nc], end)
                heapq.heappush(heap, (nf, ng, path + [[nr, nc]]))
    return []

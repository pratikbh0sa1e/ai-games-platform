import heapq

GOAL = ((1,2,3),(4,5,6),(7,8,0))
DIRS = {'up':(-1,0),'down':(1,0),'left':(0,-1),'right':(0,1)}

def _to_tuple(board):
    return tuple(tuple(r) for r in board)

def _find_blank(board):
    for r, row in enumerate(board):
        for c, val in enumerate(row):
            if val == 0:
                return r, c

def _manhattan_sum(board):
    dist = 0
    for r, row in enumerate(board):
        for c, val in enumerate(row):
            if val != 0:
                gr, gc = (val - 1) // 3, (val - 1) % 3
                dist += abs(r - gr) + abs(c - gc)
    return dist

def solve_puzzle(board):
    """A* solver for 8-puzzle. Returns list of move directions."""
    start = _to_tuple(board)
    h = _manhattan_sum(board)
    heap = [(h, 0, start, [])]
    visited = set()

    while heap:
        f, g, state, moves = heapq.heappop(heap)
        if state in visited:
            continue
        visited.add(state)
        if state == GOAL:
            return moves
        br, bc = _find_blank(state)
        for move, (dr, dc) in DIRS.items():
            nr, nc = br + dr, bc + dc
            if 0 <= nr < 3 and 0 <= nc < 3:
                lst = [list(r) for r in state]
                lst[br][bc], lst[nr][nc] = lst[nr][nc], lst[br][bc]
                nstate = _to_tuple(lst)
                if nstate not in visited:
                    ng = g + 1
                    nf = ng + _manhattan_sum(lst)
                    heapq.heappush(heap, (nf, ng, nstate, moves + [move]))
    return []

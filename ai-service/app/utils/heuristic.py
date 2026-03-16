def manhattan(pos, goal):
    """Manhattan distance between two (row, col) positions."""
    return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])

def misplaced_tiles(board, goal):
    """Count of tiles not in their goal position (ignores blank)."""
    count = 0
    for r in range(len(board)):
        for c in range(len(board[r])):
            if board[r][c] != 0 and board[r][c] != goal[r][c]:
                count += 1
    return count

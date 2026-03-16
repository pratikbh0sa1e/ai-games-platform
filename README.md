# AI Games Platform

An interactive web platform that visualizes classic AI algorithms through three games — Maze Solver, 8-Puzzle, and Rock-Paper-Scissors. Built as a full-stack monorepo with a React frontend, Express backend, and FastAPI AI service.

---

## Project Overview

### Objectives

- Demonstrate core AI search algorithms in an interactive, visual way
- Provide a clean, modern UI where users can interact with the algorithms in real time
- Separate concerns cleanly across frontend, backend, and AI service layers

### Key Features

#### Maze Solver

- Interactive grid — click or drag to paint walls, place start and end points
- Choose between BFS, DFS, or A\* to solve the maze
- Animated step-by-step path visualization with live step counter
- Reset and re-paint at any time

#### 8-Puzzle Solver

- Shuffle button generates a random solvable board via the AI service
- A\* algorithm finds the optimal solution
- Animates through each board state step by step
- Stop animation at any point and reset

#### Rock-Paper-Scissors AI

- AI opponent uses pattern recognition and frequency analysis
- Tracks win/loss/draw history across the session
- Predicts player tendencies to improve its strategy over time

---

## Artificial Intelligence Concepts Demonstrated

| Concept                      | Used In               |
| ---------------------------- | --------------------- |
| Breadth-First Search (BFS)   | Maze Solver           |
| Depth-First Search (DFS)     | Maze Solver           |
| A\* Search                   | Maze Solver, 8-Puzzle |
| Manhattan Distance Heuristic | 8-Puzzle (A\*)        |
| State Space Search           | 8-Puzzle              |
| Frequency-based Prediction   | Rock-Paper-Scissors   |

---

## System Architecture

```
Browser (React + Vite)
        │
        ▼
Express Backend  (Node.js — port 3001)
        │
        ▼
FastAPI AI Service  (Python — port 8000)
```

### Application Workflow

1. User interacts with the React frontend (paints maze, shuffles puzzle, picks RPS move)
2. Frontend sends a request to the Express backend via REST API
3. Backend proxies the request to the FastAPI AI service
4. AI service runs the algorithm and returns the result (path, states, outcome)
5. Frontend animates the result step by step

---

## Technology Stack

### Frontend

- React 19 + Vite 8
- React Router v7
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Lucide React (icons)
- OGL (WebGL — RippleGrid background)
- GSAP (animations)

### Backend

- Node.js + Express 4
- CORS, dotenv

### AI Service

- Python + FastAPI
- Uvicorn (ASGI server)
- Pydantic v2

### Additional Tools

- nodemon (backend dev server)
- ESLint (frontend linting)

---

## Project Structure

```
ai-games-platform/
├── frontend/               # React + Vite app
│   └── src/
│       ├── components/     # Navbar, Board, CardSwap, RippleGrid, etc.
│       ├── pages/          # Home, MazeSolver, EightPuzzle, RockPaperScissors
│       ├── services/       # api.js, aiService.js
│       ├── hooks/          # useGameState.js
│       └── utils/          # gridHelpers.js, moveValidator.js
├── backend/                # Express proxy server
│   └── src/
│       ├── controllers/    # aiController.js, gameController.js
│       ├── routes/         # aiRoutes.js
│       ├── services/       # aiService.js
│       ├── middleware/     # errorHandler.js
│       └── config/         # env.js
├── ai-service/             # FastAPI AI engine
│   └── app/
│       ├── algorithms/     # bfs.py, dfs.py, astar.py, puzzle_solver.py, rps_ai.py
│       ├── routers/        # maze_router.py, puzzle_router.py, rps_router.py
│       ├── models/         # game_models.py
│       ├── utils/          # heuristic.py
│       └── core/           # config.py
├── shared/                 # Shared constants and types
└── .gitignore
```

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/your-username/ai-games-platform.git
cd ai-games-platform
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend Setup

```bash
cd backend
npm install
nodemon server.js
# Runs on http://localhost:3001
```

### AI Service Setup

```bash
cd ai-service
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Runs on http://127.0.0.1:8000
```

> All three services must be running simultaneously for full functionality.

---

## API Design

| Method | Endpoint                 | Description                                 |
| ------ | ------------------------ | ------------------------------------------- |
| POST   | `/api/ai/maze`           | Solve maze with selected algorithm          |
| POST   | `/api/ai/puzzle`         | Solve 8-puzzle with A\*, returns all states |
| GET    | `/api/ai/puzzle/shuffle` | Generate a random solvable board            |
| POST   | `/api/ai/rps`            | Get AI move and outcome for RPS             |

---

## User Interface Overview

### Home Page

- Animated CardSwap component showcasing the three games
- WebGL RippleGrid background with rainbow mode
- Navigation to each game

### Maze Solver Interface

- 12×16 interactive grid
- Paint modes: Wall, Erase, Start, End
- Algorithm selector: BFS / DFS / A\*
- Step-by-step animated path with step counter

### 8-Puzzle Interface

- 3×3 sliding tile board
- Shuffle button for random solvable state
- Animated solution playback at 350ms per step
- Stop / Reset controls

### Rock-Paper-Scissors Interface

- One-click move selection
- Live score tracking
- AI strategy display

---

## Algorithm Implementation

### Breadth-First Search (BFS)

Explores all neighbors level by level using a queue. Guarantees the shortest path in an unweighted grid. Used in the Maze Solver.

### Depth-First Search (DFS)

Explores as far as possible along each branch before backtracking. Does not guarantee shortest path but is memory efficient. Used in the Maze Solver.

### A\* Search

Combines actual cost `g(n)` and heuristic estimate `h(n)` to find the optimal path efficiently. Used in both the Maze Solver and 8-Puzzle Solver.

### Heuristic Functions

- Maze: Manhattan distance from current cell to end cell
- 8-Puzzle: Sum of Manhattan distances of all tiles from their goal positions

### State Space Search

The 8-Puzzle solver represents each board configuration as a state. A\* explores the state space by expanding the lowest-cost frontier state, tracking visited states to avoid cycles.

### Game Strategy & Prediction

The RPS AI tracks the frequency of the player's past moves and predicts the most likely next move, then plays the counter. Falls back to random on first move.

---

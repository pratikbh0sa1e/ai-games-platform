import { useState } from "react";

/**
 * Simple game state hook with setState helper.
 * @param {any} initialState
 */
export default function useGameState(initialState) {
  const [state, setState] = useState(initialState);

  function update(patch) {
    setState((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  }

  return { state, setState: update };
}

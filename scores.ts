const scores = new Map<string, number>();

export function increment(identifier: string) {
  const previousScores = scores.get(identifier) ?? 0;
  const currentScores = previousScores + 1;
  scores.set(identifier, currentScores);
  return currentScores;
}

export function allScores() {
  return JSON.stringify(Object.fromEntries(scores.entries()));
}

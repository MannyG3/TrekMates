import type { Difficulty, Trail } from "@/types";

const ELEVATION_MULTIPLIER: Record<Difficulty, number> = {
  easy: 45,
  moderate: 75,
  hard: 110,
  expert: 145,
};

export function estimateElevationGain(trail: Trail): number {
  return Math.round(trail.distance_km * ELEVATION_MULTIPLIER[trail.difficulty]);
}

export function difficultyBgStyle(difficulty: Difficulty): {
  backgroundColor: string;
  color: string;
} {
  const colorMap: Record<Difficulty, string> = {
    easy: "#7EC8A4",
    moderate: "#EF9F27",
    hard: "#F0997B",
    expert: "#E24B4A",
  };
  return {
    backgroundColor: `${colorMap[difficulty]}33`,
    color: colorMap[difficulty],
  };
}

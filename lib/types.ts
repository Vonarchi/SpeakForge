export type ScoreKey =
  | "clarity"
  | "confidence"
  | "structure"
  | "concision"
  | "pacing"
  | "fillerControl";

export type Scores = Record<ScoreKey, number>;

export type Analysis = {
  scores: Scores;
  overall: number;
  wordsPerMinute: number | null;
  fillerWords: { word: string; count: number }[];
  strengths: string[];
  priorities: string[];
  rewrite: string;
  coachNote: string;
};

export type SessionRecord = {
  id: string;
  createdAt: string;
  exerciseId: string;
  exerciseTitle: string;
  transcript: string;
  durationSec: number;
  analysis: Analysis;
};

export type UserState = {
  onboarded: boolean;
  name: string;
  goal: string;
  streak: number;
  xp: number;
  completedLessons: string[];
  sessions: SessionRecord[];
};

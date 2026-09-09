import { UserState } from "./types";

const KEY = "speakforge-state-v1";

export const defaultState: UserState = {
  onboarded: false,
  name: "",
  goal: "Speak like a confident leader",
  streak: 0,
  xp: 0,
  completedLessons: [],
  sessions: []
};

export function loadState(): UserState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function saveState(state: UserState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
}

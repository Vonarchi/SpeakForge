export type Lesson = {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  minutes: number;
  concept: string;
  action: string;
};

export const lessons: Lesson[] = [
  {
    id: "clear-before-clever",
    day: 1,
    title: "Clear Before Clever",
    subtitle: "Make your point easy to follow.",
    minutes: 8,
    concept: "Strong communicators reduce the listener's mental workload. Lead with the point, then support it.",
    action: "Use PREP: Point → Reason → Example → Point."
  },
  {
    id: "pace-and-pause",
    day: 2,
    title: "Pace & Pause",
    subtitle: "Sound deliberate instead of rushed.",
    minutes: 7,
    concept: "Pauses create authority, comprehension, and emphasis. Speed is useful only when the listener can still process.",
    action: "Pause for one beat after your main point and before your final sentence."
  },
  {
    id: "filler-control",
    day: 3,
    title: "Replace Fillers With Silence",
    subtitle: "Stop buying time with 'um' and 'you know'.",
    minutes: 6,
    concept: "A short silent pause usually sounds more confident than a stream of filler words.",
    action: "When you feel a filler coming, close your mouth, breathe, then continue."
  },
  {
    id: "executive-structure",
    day: 4,
    title: "Executive Structure",
    subtitle: "Answer questions like a leader.",
    minutes: 9,
    concept: "Executives often communicate in layers: conclusion first, then 2–3 supporting points, then next step.",
    action: "Try: 'My recommendation is X for three reasons...' "
  },
  {
    id: "story-engine",
    day: 5,
    title: "Story Engine",
    subtitle: "Turn information into something people remember.",
    minutes: 10,
    concept: "A useful short story has context, tension, choice, result, and meaning.",
    action: "Tell a 60-second story using: Situation → Friction → Decision → Result → Lesson."
  },
  {
    id: "difficult-conversations",
    day: 6,
    title: "Difficult Conversations",
    subtitle: "Stay direct without becoming combative.",
    minutes: 10,
    concept: "Separate observation from interpretation. Name impact, make a request, and invite response.",
    action: "Use: 'When X happened, the impact was Y. Going forward, I need Z. How do you see it?'"
  },
  {
    id: "presence",
    day: 7,
    title: "Command Presence",
    subtitle: "Project calm, certainty, and respect.",
    minutes: 8,
    concept: "Presence is not loudness. It is controlled pace, complete sentences, purposeful eye line, and calm body language.",
    action: "Lower your speaking speed slightly, finish each sentence, and hold a one-beat pause."
  }
];

export type Exercise = {
  id: string;
  title: string;
  category: string;
  duration: number;
  prompt: string;
  tip: string;
};

export const exercises: Exercise[] = [
  {
    id: "one-minute-opinion",
    title: "60-Second Opinion",
    category: "Clarity",
    duration: 60,
    prompt: "Should remote work remain a standard option for most office jobs? Give your answer, your strongest reason, and one example.",
    tip: "Use PREP: Point → Reason → Example → Point."
  },
  {
    id: "executive-update",
    title: "Executive Update",
    category: "Leadership",
    duration: 75,
    prompt: "A project is two weeks behind schedule. Brief your CEO on what happened, the impact, and what you recommend next.",
    tip: "Lead with the conclusion. Avoid a long backstory."
  },
  {
    id: "tell-the-story",
    title: "Tell the Story",
    category: "Storytelling",
    duration: 90,
    prompt: "Tell a short story about a time you solved a difficult problem or helped someone through a challenge.",
    tip: "Situation → Friction → Decision → Result → Lesson."
  },
  {
    id: "pushback",
    title: "Handle Pushback",
    category: "Difficult Conversations",
    duration: 90,
    prompt: "A colleague says your idea is unrealistic and too expensive. Respond without becoming defensive.",
    tip: "Acknowledge → clarify concern → answer → propose next step."
  },
  {
    id: "introduce-yourself",
    title: "Power Introduction",
    category: "Confidence",
    duration: 45,
    prompt: "Introduce yourself to a room of professionals. Explain who you are, what you do, and what you care about.",
    tip: "Make it specific and memorable. Do not recite your résumé."
  }
];

export const goalOptions = [
  "Speak like a confident leader",
  "Become a stronger public speaker",
  "Think faster on my feet",
  "Reduce filler words",
  "Tell better stories",
  "Handle difficult conversations",
  "Improve everyday social confidence"
];

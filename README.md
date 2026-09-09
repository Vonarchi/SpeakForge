# SpeakForge MVP

An original communication-training MVP designed around **deliberate practice**:

1. Learn one compact speaking framework.
2. Respond to a timed speaking prompt out loud.
3. Record and transcribe the answer.
4. Score transcript-based communication signals.
5. Receive specific coaching and a stronger version.
6. Repeat the same exercise and beat the previous result.
7. Track skill growth over time.

This project intentionally does **not** copy another product's branding, text, illustrations, or exact interface. It recreates useful training mechanics in an original product.

## What is included

- Mobile-first onboarding
- Personalized communication goal
- 28-day foundation concept
- XP / streak scaffolding
- Micro-lessons
- Speaking practice library
- Browser microphone recording
- Server-side audio transcription
- AI communication analysis
- Six score dimensions:
  - Clarity
  - Confidence
  - Structure
  - Concision
  - Pacing
  - Filler control
- Transcript editing before analysis
- Stronger-answer rewrite
- Repeat-and-improve loop
- Progress dashboard and session history
- LocalStorage persistence for the MVP
- Fallback lightweight analysis when no coaching API key is configured

## Important measurement rule

The current MVP does **not** claim to measure vocal tone, eye contact, facial expression, or body language. A transcript plus recording duration can support useful analysis of words, structure, filler use, and approximate pace, but real prosody and visual-presence scoring should be added later with audio/video models.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

Add your API key to `.env.local`:

```bash
OPENAI_API_KEY=...
OPENAI_COACH_MODEL=gpt-5.6-luna
OPENAI_TRANSCRIBE_MODEL=gpt-transcribe
```

Your API key stays server-side in the two Next.js route handlers.

## Cursor workflow

1. Unzip the project.
2. Open the **speakforge-mvp** folder in Cursor.
3. Run `npm install`.
4. Create `.env.local` from `.env.example`.
5. Run `npm run dev`.
6. Tell Cursor:

> Read README.md and the entire codebase before changing anything. Preserve the deliberate-practice loop: learn → speak → transcribe → analyze → repeat → track. Keep API keys server-side. Do not invent voice/body-language measurements from transcript data.

## MVP architecture

```text
app/
  api/
    analyze/route.ts       # Communication coaching
    transcribe/route.ts    # Audio transcription
  globals.css
  layout.tsx
  page.tsx
components/
  Home.tsx
  Learn.tsx
  LessonDetail.tsx
  Nav.tsx
  Onboarding.tsx
  PracticeList.tsx
  Progress.tsx
  Recorder.tsx
  ScoreRing.tsx
lib/
  content.ts               # Lessons and exercises
  storage.ts               # Local MVP persistence
  types.ts
```

## Phase 2 — make it dramatically stronger

### 1. Baseline assessment
Give the user 3 different speaking tests on day zero:
- Self-introduction
- Impromptu opinion
- Difficult-conversation response

Create a baseline profile and recommend a training path.

### 2. True audio coaching
Add audio-signal analysis for:
- pace variance
- pause duration
- long pauses
- vocal energy
- pitch variation
- repeated restarts
- volume consistency

Only surface a metric when the system really measured it.

### 3. Video presence coaching
Optional camera practice:
- head/eye orientation
- excessive movement
- visible engagement
- framing

Do not make psychological claims from facial appearance.

### 4. Interactive role-play
Add an AI role-play partner:
- job interview
- executive meeting
- sales call
- networking
- disagreement
- media interview
- sermon / public speaking
- pitch presentation

The AI should respond conversationally, then score the user's response after each round.

### 5. Adaptive curriculum
Select tomorrow's lesson from the user's weakest repeated metric rather than from a fixed sequence.

### 6. Real user accounts
Move persistence from localStorage to Supabase:
- users
- profiles
- sessions
- score_dimensions
- lesson_progress
- challenges
- streak_events

### 7. Spaced repetition
Bring previously weak speaking situations back several days later and compare scores.

### 8. Personal phrase bank
Let users save:
- strong opening phrases
- transitions
- leadership language
- difficult-conversation phrases
- stories
- personal examples

### 9. Thought-to-speech organizer
Before recording, let the user tap three cards:
- Main point
- Why it matters
- Example / proof

Then hide the notes while recording.

### 10. Teleprompter integration
Add three modes:
- manual scroll
- fixed-speed scroll
- voice-follow scroll

This can eventually share technology with a dedicated teleprompter product.

## Suggested production database

```sql
create table profiles (
  id uuid primary key,
  display_name text,
  primary_goal text,
  created_at timestamptz default now()
);

create table practice_sessions (
  id uuid primary key,
  user_id uuid references profiles(id),
  exercise_id text not null,
  transcript text not null,
  duration_sec integer not null,
  overall_score numeric,
  analysis jsonb not null,
  created_at timestamptz default now()
);

create table lesson_progress (
  id uuid primary key,
  user_id uuid references profiles(id),
  lesson_id text not null,
  completed_at timestamptz default now(),
  unique(user_id, lesson_id)
);
```

## Product positioning

A strong promise:

> **Don't just learn communication. Rehearse it, measure it, and improve it.**

The differentiator is the feedback loop, not the lesson library.

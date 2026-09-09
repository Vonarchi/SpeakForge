import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function fallbackAnalysis(transcript: string, durationSec: number) {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wpm = durationSec > 0 ? Math.round((words.length / durationSec) * 60) : null;
  const fillerSet = ["um", "uh", "like", "actually", "basically", "literally"];
  const lower = transcript.toLowerCase();
  const fillerWords = fillerSet
    .map((word) => ({
      word,
      count: (lower.match(new RegExp(`\\b${word}\\b`, "g")) || []).length
    }))
    .filter((x) => x.count > 0);

  return {
    scores: {
      clarity: 70,
      confidence: 68,
      structure: 65,
      concision: 70,
      pacing: wpm && wpm >= 110 && wpm <= 170 ? 80 : 62,
      fillerControl: Math.max(45, 90 - fillerWords.reduce((a, b) => a + b.count * 6, 0))
    },
    overall: 69,
    wordsPerMinute: wpm,
    fillerWords,
    strengths: ["You completed the practice and communicated a recognizable point."],
    priorities: ["Use a clear opening point and one supporting example.", "Replace fillers with short pauses."],
    rewrite: transcript,
    coachNote: "AI analysis is unavailable, so this is a lightweight local estimate."
  };
}

export async function POST(req: NextRequest) {
  try {
    const { transcript, durationSec, exerciseTitle, prompt } = await req.json();

    if (!transcript?.trim()) {
      return NextResponse.json({ error: "Transcript is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(fallbackAnalysis(transcript, durationSec || 0));
    }

    const model = process.env.OPENAI_COACH_MODEL || "gpt-5.6-luna";
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: `You are SpeakForge, an expert communication coach.
Score only what can reasonably be inferred from a transcript and timing metadata.
Do not pretend you measured vocal tone, eye contact, volume, or body language.
Be encouraging but specific. The purpose is deliberate practice.

Return ONLY valid JSON with this exact shape:
{
  "scores": {
    "clarity": 0,
    "confidence": 0,
    "structure": 0,
    "concision": 0,
    "pacing": 0,
    "fillerControl": 0
  },
  "overall": 0,
  "wordsPerMinute": 0,
  "fillerWords": [{"word":"um","count":0}],
  "strengths": ["..."],
  "priorities": ["..."],
  "rewrite": "...",
  "coachNote": "..."
}

Scoring rules:
- clarity: understandable language, complete thought, specificity.
- confidence: decisiveness in wording; penalize excessive hedging, not humility.
- structure: logical opening, support, close.
- concision: useful information without needless repetition.
- pacing: use WPM metadata only; 110–170 is generally conversational, context matters.
- fillerControl: count common verbal fillers and repeated discourse markers.
- overall: weighted holistic score, not a simple average.
- rewrite: a stronger version that preserves the speaker's meaning and natural voice.
- priorities: maximum 3, actionable on the next attempt.`
        },
        {
          role: "user",
          content: `Exercise: ${exerciseTitle || "Speaking practice"}
Prompt: ${prompt || ""}
Duration seconds: ${durationSec || 0}
Transcript:
${transcript}`
        }
      ]
    });

    const text = response.output_text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Analysis failed." }, { status: 500 });
  }
}

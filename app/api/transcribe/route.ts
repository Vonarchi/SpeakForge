import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is required for audio transcription." },
        { status: 503 }
      );
    }

    const form = await req.formData();
    const file = form.get("audio");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Audio file missing." }, { status: 400 });
    }

    const transcription = await client.audio.transcriptions.create({
      file,
      model: process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-transcribe"
    });

    return NextResponse.json({ transcript: transcription.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Transcription failed." }, { status: 500 });
  }
}

"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mic, Square, RotateCcw, Send, LoaderCircle } from "lucide-react";
import { exercises } from "@/lib/content";
import { Analysis, SessionRecord } from "@/lib/types";

export default function Recorder({
  id,
  onBack,
  onSaved
}: {
  id: string;
  onBack: () => void;
  onSaved: (s: SessionRecord) => void;
}) {
  const ex = exercises.find((x) => x.id === id)!;
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState("");
  const [working, setWorking] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  async function start() {
    setAnalysis(null);
    setTranscript("");
    setAudioBlob(null);
    setElapsed(0);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRef.current = recorder;
    chunks.current = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: recorder.mimeType || "audio/webm" });
      setAudioBlob(blob);
      stream.getTracks().forEach((t) => t.stop());
    };
    recorder.start();
    setRecording(true);
    timerRef.current = setInterval(() => setElapsed((v) => v + 1), 1000);
  }

  function stop() {
    mediaRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  async function transcribe() {
    if (!audioBlob) return;
    setWorking("Transcribing your answer…");
    const fd = new FormData();
    fd.append("audio", audioBlob, "practice.webm");
    const res = await fetch("/api/transcribe", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) {
      setWorking(data.error || "Transcription failed.");
      return;
    }
    setTranscript(data.transcript);
    setWorking("");
  }

  async function analyze() {
    if (!transcript.trim()) return;
    setWorking("Your coach is analyzing the answer…");
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript,
        durationSec: elapsed,
        exerciseTitle: ex.title,
        prompt: ex.prompt
      })
    });
    const data = await res.json();
    setWorking("");
    if (!res.ok) {
      alert(data.error || "Analysis failed.");
      return;
    }
    setAnalysis(data);
    const session: SessionRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      exerciseId: ex.id,
      exerciseTitle: ex.title,
      transcript,
      durationSec: elapsed,
      analysis: data
    };
    onSaved(session);
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="screen">
      <button className="back" onClick={onBack}><ArrowLeft/> Back</button>
      <div className="eyebrow">{ex.category.toUpperCase()}</div>
      <h1>{ex.title}</h1>
      <div className="promptCard">
        <span>Your prompt</span>
        <h2>{ex.prompt}</h2>
        <p><strong>Coach cue:</strong> {ex.tip}</p>
      </div>

      <div className={`recorder ${recording ? "isRecording" : ""}`}>
        <div className="timer">{mm}:{ss}</div>
        <div className="muted">Target: {ex.duration} seconds</div>
        {!recording && !audioBlob && (
          <button className="recordButton" onClick={start}><Mic size={32}/></button>
        )}
        {recording && (
          <button className="recordButton stop" onClick={stop}><Square size={28}/></button>
        )}
        {!recording && audioBlob && (
          <div className="row center">
            <button className="secondary" onClick={start}><RotateCcw/> Re-record</button>
            <button className="primary" onClick={transcribe}><Send/> Use recording</button>
          </div>
        )}
      </div>

      {working && <div className="working"><LoaderCircle className="spin"/>{working}</div>}

      {transcript && (
        <div className="card">
          <div className="sectionHead"><h3>Transcript</h3><span>Edit if needed</span></div>
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={8}/>
          {!analysis && <button className="primary wide" onClick={analyze}>Analyze my communication</button>}
        </div>
      )}

      {analysis && <AnalysisView analysis={analysis} onRepeat={start}/>}
    </div>
  );
}

function AnalysisView({ analysis, onRepeat }: { analysis: Analysis; onRepeat: () => void }) {
  const scoreEntries = Object.entries(analysis.scores);
  return (
    <div className="analysis stack">
      <div className="scoreBanner">
        <span>Overall</span><strong>{Math.round(analysis.overall)}</strong><small>/100</small>
      </div>

      <div className="card">
        <h3>Your scorecard</h3>
        <div className="scoreBars">
          {scoreEntries.map(([k, v]) => (
            <div key={k} className="scoreRow">
              <span>{label(k)}</span>
              <div className="bar"><i style={{width:`${v}%`}}/></div>
              <strong>{Math.round(v)}</strong>
            </div>
          ))}
        </div>
        {analysis.wordsPerMinute !== null && <p className="muted">Estimated pace: <strong>{analysis.wordsPerMinute} words/minute</strong></p>}
      </div>

      <div className="card">
        <h3>What worked</h3>
        <ul>{analysis.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>

      <div className="card priorityCard">
        <div className="eyebrow">NEXT ATTEMPT</div>
        <h3>Focus on these</h3>
        <ol>{analysis.priorities.map((s) => <li key={s}>{s}</li>)}</ol>
      </div>

      <div className="card">
        <h3>Stronger version</h3>
        <p>{analysis.rewrite}</p>
      </div>

      <div className="coachNote">{analysis.coachNote}</div>
      <button className="primary big" onClick={onRepeat}><RotateCcw/> Repeat and beat your score</button>
    </div>
  )
}

function label(k: string) {
  return ({
    clarity: "Clarity",
    confidence: "Confidence",
    structure: "Structure",
    concision: "Concision",
    pacing: "Pacing",
    fillerControl: "Filler control"
  } as Record<string,string>)[k] || k;
}

"use client";
import { UserState } from "@/lib/types";

export default function Progress({ state }: { state: UserState }) {
  const sessions = [...state.sessions].reverse();
  const keys = ["clarity", "confidence", "structure", "concision", "pacing", "fillerControl"] as const;
  const avg = (key: typeof keys[number]) => {
    if (!state.sessions.length) return 0;
    return Math.round(state.sessions.reduce((a, s) => a + s.analysis.scores[key], 0) / state.sessions.length);
  };

  return (
    <div className="screen">
      <header><div className="eyebrow">YOUR DEVELOPMENT</div><h1>Progress</h1>
      <p className="muted">Track the communication skills you are actually practicing.</p></header>

      <div className="card">
        <h3>Skill profile</h3>
        <div className="scoreBars">
          {keys.map((k) => (
            <div className="scoreRow" key={k}>
              <span>{friendly(k)}</span><div className="bar"><i style={{width:`${avg(k)}%`}}/></div><strong>{avg(k)}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sectionHead"><h3>Overall trend</h3><span>{sessions.length} sessions</span></div>
        {sessions.length === 0 ? <p className="muted">Complete a speaking practice to begin your graph.</p> : (
          <div className="trend">
            {sessions.map((s, idx) => (
              <div className="trendCol" key={s.id}>
                <div className="trendBar" style={{height:`${Math.max(8,s.analysis.overall)}%`}} title={`${s.analysis.overall}`}/>
                <span>{idx + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="sectionHead"><h3>Session history</h3><span>Newest first</span></div>
        <div className="stack">
          {state.sessions.map((s) => (
            <div className="historyItem" key={s.id}>
              <div><strong>{s.exerciseTitle}</strong><p>{new Date(s.createdAt).toLocaleString()}</p></div>
              <div className="historyScore">{Math.round(s.analysis.overall)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function friendly(k: string) {
  return k === "fillerControl" ? "Filler control" : k[0].toUpperCase() + k.slice(1);
}

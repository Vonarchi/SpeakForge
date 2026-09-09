"use client";
import { Flame, Zap, ArrowRight, Mic2, Target, Trophy } from "lucide-react";
import { lessons, exercises } from "@/lib/content";
import { UserState } from "@/lib/types";
import ScoreRing from "./ScoreRing";

export default function Home({
  state,
  onPractice,
  onLesson
}: {
  state: UserState;
  onPractice: (id: string) => void;
  onLesson: (id: string) => void;
}) {
  const completed = state.completedLessons.length;
  const nextLesson = lessons.find((l) => !state.completedLessons.includes(l.id)) || lessons[0];
  const latest = state.sessions[0];
  const challengeProgress = Math.min(28, completed + state.sessions.length);

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <div className="muted">Welcome back</div>
          <h2>{state.name || "Speaker"}</h2>
        </div>
        <div className="streak"><Flame size={18}/> {state.streak} day streak</div>
      </header>

      <section className="hero card gradient">
        <div className="eyebrow">YOUR PRIMARY GOAL</div>
        <h1>{state.goal}</h1>
        <p>Today: learn one idea, use it in a live answer, then repeat once with feedback.</p>
        <div className="progressTrack"><div style={{ width: `${(challengeProgress / 28) * 100}%` }} /></div>
        <div className="row spread tiny"><span>Day {challengeProgress}</span><span>28-day foundation</span></div>
      </section>

      <section className="statsRow">
        <div className="miniCard"><Zap size={19}/><strong>{state.xp}</strong><span>XP</span></div>
        <div className="miniCard"><Target size={19}/><strong>{state.sessions.length}</strong><span>Practices</span></div>
        <div className="miniCard"><Trophy size={19}/><strong>{completed}</strong><span>Lessons</span></div>
      </section>

      <section>
        <div className="sectionHead"><h3>Today’s lesson</h3><span>{nextLesson.minutes} min</span></div>
        <button className="lessonCard" onClick={() => onLesson(nextLesson.id)}>
          <div className="lessonDay">DAY {nextLesson.day}</div>
          <div>
            <h3>{nextLesson.title}</h3>
            <p>{nextLesson.subtitle}</p>
          </div>
          <ArrowRight />
        </button>
      </section>

      <section>
        <div className="sectionHead"><h3>Deliberate practice</h3><span>Speak out loud</span></div>
        <button className="practiceHero" onClick={() => onPractice(exercises[1].id)}>
          <div className="micCircle"><Mic2/></div>
          <div>
            <div className="eyebrow">RECOMMENDED</div>
            <h3>{exercises[1].title}</h3>
            <p>{exercises[1].prompt}</p>
          </div>
          <ArrowRight/>
        </button>
      </section>

      {latest && (
        <section>
          <div className="sectionHead"><h3>Latest score</h3><span>{new Date(latest.createdAt).toLocaleDateString()}</span></div>
          <div className="card latestScore">
            <ScoreRing score={latest.analysis.overall} label="Overall" />
            <div>
              <h3>{latest.exerciseTitle}</h3>
              <p>{latest.analysis.priorities[0]}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

"use client";
import { ArrowLeft, CheckCircle2, Lightbulb, Dumbbell } from "lucide-react";
import { lessons } from "@/lib/content";
import { UserState } from "@/lib/types";

export default function LessonDetail({
  id, state, onBack, onComplete
}: {
  id: string; state: UserState; onBack: () => void; onComplete: (id: string) => void;
}) {
  const l = lessons.find((x) => x.id === id)!;
  const done = state.completedLessons.includes(id);
  return (
    <div className="screen">
      <button className="back" onClick={onBack}><ArrowLeft/> Back</button>
      <div className="lessonHero">
        <div className="lessonDay">DAY {l.day}</div>
        <h1>{l.title}</h1>
        <p>{l.subtitle}</p>
      </div>
      <div className="card concept">
        <Lightbulb/>
        <div><div className="eyebrow">THE IDEA</div><p>{l.concept}</p></div>
      </div>
      <div className="card concept">
        <Dumbbell/>
        <div><div className="eyebrow">USE IT TODAY</div><p>{l.action}</p></div>
      </div>
      <div className="card">
        <h3>Quick drill</h3>
        <p>Say your answer once normally. Then say it again using today’s framework. Your second version should feel cleaner, not more robotic.</p>
      </div>
      <button className="primary big" onClick={() => onComplete(id)} disabled={done}>
        <CheckCircle2/> {done ? "Completed" : "Mark lesson complete + 25 XP"}
      </button>
    </div>
  );
}

"use client";
import { CheckCircle2, Clock3, ChevronRight } from "lucide-react";
import { lessons } from "@/lib/content";
import { UserState } from "@/lib/types";

export default function Learn({ state, onOpen }: { state: UserState; onOpen: (id: string) => void }) {
  return (
    <div className="screen">
      <header><div className="eyebrow">FOUNDATION</div><h1>Communication Academy</h1>
      <p className="muted">Short lessons designed to be used immediately in practice.</p></header>
      <div className="stack">
        {lessons.map((lesson) => {
          const done = state.completedLessons.includes(lesson.id);
          return (
            <button className="lessonListItem" key={lesson.id} onClick={() => onOpen(lesson.id)}>
              <div className={`dayBubble ${done ? "done" : ""}`}>{done ? <CheckCircle2/> : lesson.day}</div>
              <div className="grow">
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
                <span className="tiny muted"><Clock3 size={13}/>{lesson.minutes} min</span>
              </div>
              <ChevronRight/>
            </button>
          )
        })}
      </div>
    </div>
  );
}

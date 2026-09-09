"use client";
import { Mic2, Clock3, ChevronRight } from "lucide-react";
import { exercises } from "@/lib/content";

export default function PracticeList({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="screen">
      <header><div className="eyebrow">PRACTICE LAB</div><h1>Train out loud</h1>
      <p className="muted">Choose a scenario. Record your answer. Get feedback. Repeat.</p></header>
      <div className="stack">
        {exercises.map((ex) => (
          <button className="exerciseCard" key={ex.id} onClick={() => onOpen(ex.id)}>
            <div className="iconSquare"><Mic2/></div>
            <div className="grow">
              <span className="pill">{ex.category}</span>
              <h3>{ex.title}</h3>
              <p>{ex.prompt}</p>
              <div className="tiny muted"><Clock3 size={13}/>{ex.duration} sec target</div>
            </div>
            <ChevronRight/>
          </button>
        ))}
      </div>
    </div>
  );
}

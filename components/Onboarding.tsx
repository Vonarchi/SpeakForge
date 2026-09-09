"use client";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { goalOptions } from "@/lib/content";
import { UserState } from "@/lib/types";

export default function Onboarding({
  state,
  onFinish
}: {
  state: UserState;
  onFinish: (state: UserState) => void;
}) {
  const [name, setName] = useState(state.name);
  const [goal, setGoal] = useState(state.goal || goalOptions[0]);
  const [step, setStep] = useState(1);

  if (step === 1) {
    return (
      <main className="onboard">
        <div className="brandBadge"><Sparkles size={16}/> SpeakForge</div>
        <h1>Your speaking skill should improve <em>because you practiced</em> — not because you watched more videos.</h1>
        <p className="lead">
          SpeakForge gives you a prompt, listens to your answer, analyzes the transcript,
          and gives you one clear thing to improve on the next attempt.
        </p>
        <div className="card">
          <label>Your first name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="James" />
        </div>
        <button className="primary big" onClick={() => setStep(2)}>
          Build my training plan <ArrowRight size={19}/>
        </button>
      </main>
    );
  }

  return (
    <main className="onboard">
      <div className="eyebrow">PERSONALIZE YOUR PLAN</div>
      <h1>What do you most want to improve?</h1>
      <div className="choiceGrid">
        {goalOptions.map((g) => (
          <button key={g} className={`choice ${goal === g ? "selected" : ""}`} onClick={() => setGoal(g)}>
            {g}
          </button>
        ))}
      </div>
      <button
        className="primary big"
        onClick={() => onFinish({ ...state, name: name || "Friend", goal, onboarded: true })}
      >
        Start SpeakForge <ArrowRight size={19}/>
      </button>
    </main>
  );
}

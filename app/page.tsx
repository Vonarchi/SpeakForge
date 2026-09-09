"use client";
import { useEffect, useState } from "react";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import Nav, { Tab } from "@/components/Nav";
import Learn from "@/components/Learn";
import LessonDetail from "@/components/LessonDetail";
import PracticeList from "@/components/PracticeList";
import Recorder from "@/components/Recorder";
import Progress from "@/components/Progress";
import { defaultState, loadState, saveState } from "@/lib/storage";
import { SessionRecord, UserState } from "@/lib/types";

type View =
  | { type: "tabs"; tab: Tab }
  | { type: "lesson"; id: string; backTab: Tab }
  | { type: "practice"; id: string };

export default function Page() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<UserState>(defaultState);
  const [view, setView] = useState<View>({ type: "tabs", tab: "home" });

  useEffect(() => { setState(loadState()); setReady(true); }, []);
  useEffect(() => { if (ready) saveState(state); }, [state, ready]);

  if (!ready) return null;

  if (!state.onboarded) {
    return <Onboarding state={state} onFinish={(s) => setState(s)} />;
  }

  function completeLesson(id: string) {
    if (state.completedLessons.includes(id)) return;
    setState((s) => ({
      ...s,
      completedLessons: [...s.completedLessons, id],
      xp: s.xp + 25,
      streak: Math.max(1, s.streak)
    }));
  }

  function saveSession(session: SessionRecord) {
    setState((s) => ({
      ...s,
      sessions: [session, ...s.sessions],
      xp: s.xp + 50,
      streak: Math.max(1, s.streak)
    }));
  }

  if (view.type === "lesson") {
    return (
      <Shell>
        <LessonDetail id={view.id} state={state} onBack={() => setView({type:"tabs",tab:view.backTab})} onComplete={completeLesson}/>
      </Shell>
    )
  }

  if (view.type === "practice") {
    return (
      <Shell>
        <Recorder id={view.id} onBack={() => setView({type:"tabs",tab:"practice"})} onSaved={saveSession}/>
      </Shell>
    )
  }

  const tab = view.tab;
  return (
    <Shell>
      {tab === "home" && <Home state={state} onPractice={(id)=>setView({type:"practice",id})} onLesson={(id)=>setView({type:"lesson",id,backTab:"home"})}/>}
      {tab === "practice" && <PracticeList onOpen={(id)=>setView({type:"practice",id})}/>}
      {tab === "learn" && <Learn state={state} onOpen={(id)=>setView({type:"lesson",id,backTab:"learn"})}/>}
      {tab === "progress" && <Progress state={state}/>}
      <Nav tab={tab} setTab={(t)=>setView({type:"tabs",tab:t})}/>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="appShell">{children}</main>
}

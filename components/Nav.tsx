import { Home, Mic2, BookOpen, BarChart3 } from "lucide-react";

export type Tab = "home" | "practice" | "learn" | "progress";

export default function Nav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; Icon: any }[] = [
    { id: "home", label: "Home", Icon: Home },
    { id: "practice", label: "Practice", Icon: Mic2 },
    { id: "learn", label: "Learn", Icon: BookOpen },
    { id: "progress", label: "Progress", Icon: BarChart3 }
  ];
  return (
    <nav className="bottomNav">
      {items.map(({ id, label, Icon }) => (
        <button key={id} className={tab === id ? "navActive" : ""} onClick={() => setTab(id)}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

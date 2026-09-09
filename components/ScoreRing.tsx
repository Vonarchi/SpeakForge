export default function ScoreRing({ score, label }: { score: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <div className="scoreRingWrap">
      <div
        className="scoreRing"
        style={{ background: `conic-gradient(var(--accent) ${clamped * 3.6}deg, var(--line) 0deg)` }}
      >
        <div className="scoreRingInner">
          <strong>{clamped}</strong>
          <span>/100</span>
        </div>
      </div>
      <div className="muted tiny">{label}</div>
    </div>
  );
}

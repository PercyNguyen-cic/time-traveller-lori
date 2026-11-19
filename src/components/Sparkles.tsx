import { useMemo } from 'react';

interface SparklesProps {
  x: number;
  y: number;
  count?: number;
}

interface Spark {
  dx: number;
  dy: number;
  delay: number;
  size: number;
  color: string;
}

const COLORS = ['#fde047', '#fb923c', '#f472b6', '#67e8f9', '#a5f3fc'];

/** A localized sparkle burst at stage coordinates. */
export default function Sparkles({ x, y, count = 14 }: SparklesProps) {
  const sparks = useMemo<Spark[]>(
    () =>
      Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 140;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          delay: Math.random() * 0.15,
          size: 20 + Math.random() * 30,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      }),
    [count],
  );

  return (
    <div className="absolute pointer-events-none z-30" style={{ left: x, top: y }}>
      {sparks.map((s, i) => (
        <div
          key={i}
          className="anim-sparkle absolute rounded-full"
          style={{
            left: s.dx,
            top: s.dy,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            animationDelay: `${s.delay}s`,
            boxShadow: `0 0 20px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}

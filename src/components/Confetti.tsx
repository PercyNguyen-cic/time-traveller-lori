import { useMemo } from 'react';

interface ConfettiProps {
  count?: number;
}

interface Piece {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#fde047', '#8b5cf6'];

/** Full-stage confetti burst for the Phase 4 reveal. */
export default function Confetti({ count = 120 }: ConfettiProps) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 5760,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 16 + Math.random() * 24,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="anim-confetti absolute top-0 rounded-sm"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

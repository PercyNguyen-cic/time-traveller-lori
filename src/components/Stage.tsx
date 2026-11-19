import { useEffect, useState, useRef, type ReactNode } from 'react';
import { STAGE_WIDTH, STAGE_HEIGHT } from '@/game/toolData';

interface StageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scales the fixed 5760x1080 stage to fit the viewport while preserving the
 * 16:3 ultra-wide aspect ratio. On the triple-monitor exhibit it displays at
 * full size; on a single preview monitor it scales down proportionally.
 */
export default function Stage({ children, className = '' }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      const el = wrapRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      setScale(Math.min(w / STAGE_WIDTH, h / STAGE_HEIGHT));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      <div
        className="relative origin-center"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <div className={`absolute inset-0 ${className}`}>{children}</div>
      </div>
    </div>
  );
}

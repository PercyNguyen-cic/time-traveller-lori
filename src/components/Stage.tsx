import { useEffect, useState, useRef, type ReactNode } from 'react';
import { STAGE_WIDTH, STAGE_HEIGHT, SCREEN_WIDTH } from '@/game/toolData';

interface StageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scales the fixed 5760x1080 stage to fit the viewport while preserving the
 * 16:3 ultra-wide aspect ratio. On the triple-monitor exhibit it displays at
 * full size; on a single preview monitor it scales down proportionally.
 *
 * Press 'D' to toggle the temporary black screen-divider lines.
 */
export default function Stage({ children, className = '' }: StageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dividers, setDividers] = useState(true);

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

  // 'D' key toggles screen dividers
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'd' || e.key === 'D') {
        setDividers((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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

        {/* Temporary screen dividers - black lines at 1920px and 3840px */}
        {dividers && (
          <>
            <div
              className="absolute top-0 bottom-0 z-50 pointer-events-none"
              style={{
                left: SCREEN_WIDTH - 2,
                width: 4,
                backgroundColor: '#000',
              }}
            />
            <div
              className="absolute top-0 bottom-0 z-50 pointer-events-none"
              style={{
                left: SCREEN_WIDTH * 2 - 2,
                width: 4,
                backgroundColor: '#000',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

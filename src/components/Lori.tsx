import { useEffect, useState } from 'react';
import AssetImage from './AssetImage';
import { Sound } from '@/game/sound';

interface LoriProps {
  pose: 'drop' | 'wave' | 'talk' | 'celebrate';
  message?: string;
  /** stage coordinates for Lori's anchor (top-left of her box) */
  x?: number;
  y?: number;
  /** trigger a prompt chime when message changes */
  chimeOnChange?: boolean;
}

/**
 * Lori, the time-traveling robot beetle mascot.
 * Renders as a persistent floating character with a speech bubble.
 * Default position: bottom-left corner of the stage.
 */
export default function Lori({
  pose,
  message,
  x = 80,
  y = 780,
  chimeOnChange = true,
}: LoriProps) {
  const [shownMessage, setShownMessage] = useState(message);

  useEffect(() => {
    if (message !== shownMessage) {
      setShownMessage(message);
      if (chimeOnChange && message) Sound.prompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const assetKey =
    pose === 'drop'
      ? 'lori_drop'
      : pose === 'wave'
        ? 'lori_wave'
        : pose === 'celebrate'
          ? 'lori_celebrate'
          : 'lori_talk';

  const animClass =
    pose === 'drop'
      ? 'anim-drop-in'
      : pose === 'celebrate'
        ? 'anim-bounce-soft'
        : 'anim-float-bob';

  return (
    <div
      className="absolute z-40 flex flex-col items-start"
      style={{ left: x, top: y, width: 420 }}
    >
      {shownMessage && (
        <div
          className="anim-speech-pop mb-3 ml-12 max-w-[400px] rounded-3xl bg-yellow-50 border-4 border-yellow-300 px-6 py-4 shadow-2xl"
          style={{ minHeight: 80 }}
        >
          <p className="text-2xl font-bold text-slate-800 leading-snug">{shownMessage}</p>
          {/* speech tail */}
          <div
            className="absolute -bottom-3 left-8 w-0 h-0"
            style={{
              borderLeft: '16px solid transparent',
              borderRight: '0 solid transparent',
              borderTop: '20px solid #fde047',
            }}
          />
        </div>
      )}
      <div className={`${animClass} relative`} style={{ width: 280, height: 280 }}>
        <AssetImage
          assetKey={assetKey}
          className="w-full h-full object-contain"
          showLabel={false}
        />
      </div>
    </div>
  );
}

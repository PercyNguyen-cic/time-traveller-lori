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
  /** use the bigger flying animation for celebrate/drop poses */
  bigFly?: boolean;
}

/** Lori sprite size — roughly half the 1080px stage height */
const LORI_SIZE = 540;

/**
 * Lori, the time-traveling robot beetle mascot.
 * Renders as a large floating character that drifts in a gentle figure-8
 * around her anchor point while talking.  The speech bubble stays anchored
 * so kids can read it comfortably.
 */
export default function Lori({
  pose,
  message,
  x = 80,
  y = 400,
  chimeOnChange = true,
  bigFly = false,
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

  const flyAnim =
    pose === 'drop'
      ? 'anim-drop-in'
      : pose === 'celebrate'
        ? bigFly
          ? 'anim-lori-fly-big'
          : 'anim-lori-fly'
        : 'anim-lori-fly';

  return (
    <div
      className="absolute z-40 flex flex-col items-start pointer-events-none select-none"
      style={{ left: x, top: y, width: LORI_SIZE + 160 }}
    >
      {/* Speech bubble — anchored above Lori, does not float */}
      {shownMessage && (
        <div
          className="anim-speech-pop mb-3 ml-12 max-w-[520px] rounded-3xl bg-yellow-50 border-4 border-yellow-300 px-6 py-4 shadow-2xl"
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

      {/* Lori sprite — large & floating */}
      <div
        className={`${flyAnim} relative`}
        style={{ width: LORI_SIZE, height: LORI_SIZE }}
      >
        <AssetImage
          assetKey={assetKey}
          fallbackKey="lori_talk"
          className="w-full h-full object-contain"
          showLabel={false}
        />
      </div>
    </div>
  );
}

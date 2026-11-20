import { useState, useEffect } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import { TOOLS, SCREEN_WIDTH } from '@/game/toolData';
import { Sound } from '@/game/sound';
import type { ToolSpec } from '@/game/types';

const GREETING =
  'Bzzzt! Hi there, time-traveler! I am Lori, your beetle buddy! Let us zoom back in time to discover how Indigenous peoples made amazing tools using just the earth around them!';

/* ─── Greeting ─── */

interface GreetingProps {
  onComplete: () => void;
}

/**
 * Lori drops in large and delivers the welcome message.
 * After 3.5 seconds the view automatically advances to tool selection.
 */
export function Greeting({ onComplete }: GreetingProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // small delay so the drop-in animation plays first
    const show = setTimeout(() => setReady(true), 300);
    const advance = setTimeout(onComplete, 3500);
    return () => {
      clearTimeout(show);
      clearTimeout(advance);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center anim-fade-in">
      <AssetImage
        assetKey="bg_attract"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-black/30" />

      {ready && (
        <Lori
          pose="drop"
          message={GREETING}
          x={SCREEN_WIDTH + SCREEN_WIDTH / 2 - 350}
          y={180}
          chimeOnChange={false}
          bigFly
        />
      )}
    </div>
  );
}

/* ─── Select ─── */

interface SelectProps {
  onSelect: (tool: ToolSpec) => void;
}

export function Select({ onSelect }: SelectProps) {
  // 3 cards evenly spread across 5760px, one centered on each screen
  const cardW = 1100;
  const positions = TOOLS.map(
    (_, i) => SCREEN_WIDTH * i + SCREEN_WIDTH / 2 - cardW / 2,
  );

  return (
    <div className="absolute inset-0 anim-fade-in">
      <AssetImage
        assetKey="bg_attract"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80" />

      {/* Title */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-lg">
          Pick a Tool to Build!
        </h1>
      </div>

      {/* 3 tool cards - one per screen */}
      {TOOLS.map((tool, i) => (
        <button
          key={tool.id}
          onClick={() => {
            Sound.pop();
            onSelect(tool);
          }}
          className="absolute flex flex-col items-center rounded-[2.5rem] bg-white/10 backdrop-blur-md border-4 border-white/30 p-8 transition-all hover:scale-105 hover:border-amber-400 active:scale-95"
          style={{
            left: positions[i],
            top: 260,
            width: cardW,
            minHeight: 600,
            animation: `bounce-soft 1.6s ease-in-out infinite ${i * 0.2}s`,
          }}
        >
          <div className="w-full h-80 flex items-center justify-center">
            <AssetImage
              assetKey={tool.cardAsset}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-white mt-6 text-center leading-tight">
            {tool.shortName}
          </h2>
          <p className="text-xl text-amber-200 mt-2 text-center">{tool.originRegion}</p>
        </button>
      ))}

      <Lori
        pose="wave"
        message="Tap a tool card to start building!"
        x={80}
        y={380}
      />
    </div>
  );
}

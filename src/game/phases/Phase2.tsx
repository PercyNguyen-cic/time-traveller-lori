import { useState, useCallback } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import { Sound } from '@/game/sound';
import type { ResolvedTool, ResolvedMaterial } from '@/game/types';

interface ForageProps {
  tool: ResolvedTool;
  onComplete: () => void;
}

/** Phase 2: Triple-screen foraging scavenger hunt. */
export function Forage({ tool, onComplete }: ForageProps) {
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [flying, setFlying] = useState<string | null>(null);

  const allMaterials = tool.materials;

  const handleTap = useCallback(
    (mat: ResolvedMaterial) => {
      if (collected.has(mat.id)) return;
      Sound.chime();
      setFlying(mat.id);
      setCollected((prev) => {
        const next = new Set(prev);
        next.add(mat.id);
        if (next.size >= allMaterials.length) {
          setTimeout(() => {
            Sound.whoosh();
            onComplete();
          }, 800);
        }
        return next;
      });
      setTimeout(() => setFlying(null), 600);
    },
    [collected, allMaterials.length, onComplete],
  );

  return (
    <div className="absolute inset-0 anim-wipe-in">
      <AssetImage
        assetKey="bg_forest"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />

      {/* Decorative scenery (non-target bushes, rocks) for atmosphere */}
      <DecorScenery />

      {/* Checklist HUD - 3 silhouette slots at top center */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-12 rounded-full bg-slate-900/70 backdrop-blur-md px-16 py-6 border-4 border-white/20">
        {allMaterials.map((mat) => {
          const isCollected = collected.has(mat.id);
          return (
            <div
              key={mat.id}
              className="relative flex items-center justify-center rounded-2xl border-4 transition-all"
              style={{
                width: 140,
                height: 140,
                borderColor: isCollected ? '#4ade80' : 'rgba(255,255,255,0.3)',
                backgroundColor: isCollected ? 'rgba(74,222,128,0.15)' : 'rgba(0,0,0,0.3)',
              }}
            >
              {isCollected ? (
                <AssetImage
                  assetKey={mat.rawAsset}
                  className="w-full h-full object-contain p-1"
                  showLabel={false}
                />
              ) : (
                <div className="text-white/40 text-5xl font-bold">?</div>
              )}
              {isCollected && (
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Inventory tray - bottom right */}
      <div className="absolute bottom-12 right-16 z-20 flex items-center gap-4 rounded-2xl bg-slate-900/70 backdrop-blur-md px-8 py-4 border-4 border-white/20">
        <span className="text-white/70 text-xl font-bold">Found:</span>
        <div className="flex gap-3">
          {allMaterials.map((mat) => (
            <div
              key={mat.id}
              className="flex items-center justify-center rounded-xl border-2 transition-all"
              style={{
                width: 90,
                height: 90,
                borderColor: collected.has(mat.id) ? '#4ade80' : 'rgba(255,255,255,0.2)',
                opacity: collected.has(mat.id) ? 1 : 0.3,
              }}
            >
              {collected.has(mat.id) && (
                <AssetImage
                  assetKey={mat.rawAsset}
                  className="w-full h-full object-contain p-1"
                  showLabel={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Forage targets spread across 3 screens */}
      {allMaterials.map((mat) => {
        const isCollected = collected.has(mat.id);
        const isFlying = flying === mat.id;
        return (
          <button
            key={mat.id}
            onClick={() => handleTap(mat)}
            disabled={isCollected}
            className={`absolute ${isCollected ? 'pointer-events-none' : 'anim-pulse-glow'} ${isFlying ? 'anim-fly' : ''}`}
            style={{
              left: mat.forageX - 100,
              top: mat.forageY - 100,
              width: 200,
              height: 200,
            }}
          >
            <AssetImage
              assetKey={mat.rawAsset}
              className="w-full h-full object-contain"
              showLabel={!isCollected}
            />
          </button>
        );
      })}

      <Lori
        pose="talk"
        message={`Find the 3 materials for the ${tool.shortName}! Run and tap them!`}
        x={80}
        y={380}
      />
    </div>
  );
}

function DecorScenery() {
  // Non-target decorative elements scattered across 3 screens
  const decor = [
    { x: 200, y: 850, w: 300, h: 200, label: 'bush', color: '#1f3d1f' },
    { x: 1100, y: 900, w: 250, h: 160, label: 'rock', color: '#4a4a4a' },
    { x: 2200, y: 850, w: 320, h: 200, label: 'bush', color: '#1f3d1f' },
    { x: 3400, y: 880, w: 280, h: 170, label: 'river water', color: '#1a4a6a' },
    { x: 4400, y: 870, w: 300, h: 190, label: 'bush', color: '#1f3d1f' },
    { x: 5400, y: 900, w: 260, h: 160, label: 'rock', color: '#4a4a4a' },
  ];
  return (
    <>
      {decor.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-2xl border-2 border-white/10 flex items-center justify-center text-white/30 text-sm"
          style={{
            left: d.x,
            top: d.y,
            width: d.w,
            height: d.h,
            backgroundColor: d.color + '88',
          }}
        >
          {d.label}
        </div>
      ))}
    </>
  );
}

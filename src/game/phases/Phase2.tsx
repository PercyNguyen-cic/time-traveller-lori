import { useState, useCallback, useMemo } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import { Sound } from '@/game/sound';
import type { ToolSpec, ResolvedTool, ResolvedMaterial, MaterialVariant, MaterialCategory } from '@/game/types';

interface ForageProps {
  tool: ToolSpec;
  onComplete: (resolved: ResolvedTool) => void;
}

interface ForageOption {
  materialId: string;
  materialLabel: string;
  category: MaterialCategory;
  station: 1 | 2 | 3;
  variant: MaterialVariant;
  x: number;
  y: number;
}

/**
 * Phase 2: Triple-screen foraging scavenger hunt with in-world variant selection.
 *
 * 6 choices are placed across the 3 screens (2 variants per material category).
 * The child must find and pick 3 different materials (1 from each category, e.g.
 * 1 wood, 1 stone, 1 cordage). Once a category is chosen, the other variant
 * is locked so kids cannot choose two sticks!
 */
export function Forage({ tool, onComplete }: ForageProps) {
  // Map of materialId -> chosen MaterialVariant
  const [chosenVariants, setChosenVariants] = useState<Record<string, MaterialVariant>>({});
  const [flyingVariantId, setFlyingVariantId] = useState<string | null>(null);

  // Flatten the 3 materials x 2 variants = 6 forage options
  const options = useMemo<ForageOption[]>(() => {
    const list: ForageOption[] = [];
    tool.materials.forEach((mat) => {
      mat.variants.forEach((v) => {
        list.push({
          materialId: mat.id,
          materialLabel: mat.label,
          category: mat.category,
          station: mat.station,
          variant: v,
          x: v.forageX ?? mat.forageX,
          y: v.forageY ?? mat.forageY,
        });
      });
    });
    return list;
  }, [tool]);

  const handleTap = useCallback(
    (opt: ForageOption) => {
      // If this category already has a variant chosen, do not allow picking another one
      if (chosenVariants[opt.materialId]) return;

      Sound.chime();
      setFlyingVariantId(opt.variant.id);

      setChosenVariants((prev) => {
        const next = { ...prev, [opt.materialId]: opt.variant };

        // Check if all 3 materials have been collected
        if (Object.keys(next).length >= tool.materials.length) {
          setTimeout(() => {
            Sound.fanfare();

            const resolvedMaterials = tool.materials.map((mat) => {
              const chosen = next[mat.id];
              const resolved: ResolvedMaterial = {
                id: mat.id,
                label: mat.label,
                variantLabel: chosen.label,
                category: mat.category,
                rawAsset: chosen.rawAsset,
                shapedAsset: chosen.shapedAsset,
                finalAsset: chosen.finalAsset,
                forageX: chosen.forageX ?? mat.forageX,
                forageY: chosen.forageY ?? mat.forageY,
                station: mat.station,
              };
              return resolved;
            }) as [ResolvedMaterial, ResolvedMaterial, ResolvedMaterial];

            const resolvedTool: ResolvedTool = {
              id: tool.id,
              name: tool.name,
              shortName: tool.shortName,
              originRegion: tool.originRegion,
              cardAsset: tool.cardAsset,
              finalAsset: tool.finalAsset,
              silhouetteAsset: tool.silhouetteAsset,
              materials: resolvedMaterials,
              originFact: tool.originFact,
              summary: tool.summary,
            };

            onComplete(resolvedTool);
          }, 900);
        }

        return next;
      });

      setTimeout(() => setFlyingVariantId(null), 600);
    },
    [chosenVariants, tool, onComplete],
  );

  const countChosen = Object.keys(chosenVariants).length;
  const loriMessage =
    countChosen === 0
      ? `Find 3 different materials for the ${tool.shortName}! Look across all 3 screens!`
      : countChosen === 1
        ? `Great pick! Find 2 more different materials!`
        : countChosen === 2
          ? `Almost ready! Just 1 more material to find!`
          : `Awesome! You found all 3 materials! To the workshop!`;

  return (
    <div className="absolute inset-0 anim-wipe-in select-none">
      {/* Forest / riverbed background */}
      <AssetImage
        assetKey="bg_forest"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />

      {/* Decorative scenery (pointer-events-none so it never blocks clicks) */}
      <DecorScenery />

      {/* Checklist HUD - 3 material category slots at top center */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-10 rounded-full bg-slate-900/80 backdrop-blur-md px-14 py-5 border-4 border-white/20 shadow-2xl">
        {tool.materials.map((mat, i) => {
          const chosen = chosenVariants[mat.id];
          const isDone = Boolean(chosen);

          return (
            <div
              key={mat.id}
              className="relative flex flex-col items-center justify-center rounded-2xl border-4 transition-all px-4 py-2"
              style={{
                width: 170,
                height: 140,
                borderColor: isDone ? '#4ade80' : 'rgba(255,255,255,0.3)',
                backgroundColor: isDone ? 'rgba(74,222,128,0.2)' : 'rgba(0,0,0,0.35)',
              }}
            >
              {isDone ? (
                <>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <AssetImage
                      assetKey={chosen.rawAsset}
                      className="max-w-full max-h-full object-contain"
                      showLabel={false}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-300 mt-1 truncate max-w-[150px]">
                    {chosen.label}
                  </span>
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                    ✓
                  </div>
                </>
              ) : (
                <>
                  <span className="text-white/40 text-4xl font-bold">?</span>
                  <span className="text-xs font-bold text-amber-200/70 mt-1 uppercase tracking-wider">
                    {i + 1}: {mat.category}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Inventory counter - bottom right */}
      <div className="absolute bottom-10 right-16 z-20 flex items-center gap-4 rounded-2xl bg-slate-900/80 backdrop-blur-md px-8 py-4 border-4 border-white/20 shadow-2xl pointer-events-none">
        <span className="text-amber-200 text-2xl font-extrabold">Materials:</span>
        <span className="text-white text-3xl font-black">
          {countChosen} / {tool.materials.length}
        </span>
      </div>

      {/* 6 Forage target buttons spread across the 3 screens */}
      {options.map((opt) => {
        const chosen = chosenVariants[opt.materialId];
        const isThisChosen = chosen?.id === opt.variant.id;
        const isCategoryFulfilled = Boolean(chosen);
        const isLockedOut = isCategoryFulfilled && !isThisChosen;
        const isFlying = flyingVariantId === opt.variant.id;

        return (
          <button
            key={opt.variant.id}
            onClick={() => handleTap(opt)}
            disabled={isCategoryFulfilled}
            className={`absolute flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 ${
              isThisChosen
                ? 'border-4 border-green-400 bg-green-500/20 scale-105 pointer-events-none'
                : isLockedOut
                  ? 'opacity-25 grayscale pointer-events-none scale-90'
                  : 'anim-pulse-glow hover:scale-110 active:scale-95 cursor-pointer bg-black/30 border-4 border-amber-300/60 backdrop-blur-sm'
            } ${isFlying ? 'anim-fly' : ''}`}
            style={{
              left: opt.x - 110,
              top: opt.y - 110,
              width: 220,
              height: 220,
              zIndex: isThisChosen ? 15 : 25,
            }}
          >
            <div className="w-full h-28 flex items-center justify-center pointer-events-none">
              <AssetImage
                assetKey={opt.variant.rawAsset}
                className="max-w-full max-h-full object-contain drop-shadow-xl"
                showLabel={false}
              />
            </div>
            <span className="text-base font-extrabold text-white mt-2 text-center leading-tight drop-shadow-md px-2 pointer-events-none">
              {opt.variant.label}
            </span>

            {isThisChosen && (
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                ✓
              </div>
            )}
            {isLockedOut && (
              <span className="text-xs text-amber-200/60 font-bold mt-1">
                {opt.category} picked
              </span>
            )}
          </button>
        );
      })}

      {/* Lori mascot — click-through enabled via pointer-events-none */}
      <Lori
        pose="talk"
        message={loriMessage}
        x={80}
        y={380}
      />
    </div>
  );
}

function DecorScenery() {
  // Non-target decorative elements scattered across 3 screens (pointer-events-none)
  const decor = [
    { x: 200, y: 850, w: 300, h: 200, label: 'bush', color: '#1f3d1f' },
    { x: 1100, y: 900, w: 250, h: 160, label: 'rock', color: '#4a4a4a' },
    { x: 2200, y: 850, w: 320, h: 200, label: 'bush', color: '#1f3d1f' },
    { x: 3400, y: 880, w: 280, h: 170, label: 'river water', color: '#1a4a6a' },
    { x: 4400, y: 870, w: 300, h: 190, label: 'bush', color: '#1f3d1f' },
    { x: 5400, y: 900, w: 260, h: 160, label: 'rock', color: '#4a4a4a' },
  ];
  return (
    <div className="pointer-events-none">
      {decor.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-2xl border-2 border-white/10 flex items-center justify-center text-white/30 text-sm select-none"
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
    </div>
  );
}

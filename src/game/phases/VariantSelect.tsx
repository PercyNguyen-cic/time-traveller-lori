import { useState } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import { Sound } from '@/game/sound';
import { SCREEN_WIDTH } from '@/game/toolData';
import type { ToolSpec, ResolvedTool, ResolvedMaterial } from '@/game/types';

interface VariantSelectProps {
  tool: ToolSpec;
  onComplete: (resolved: ResolvedTool) => void;
  onBack: () => void;
}

/**
 * After picking a tool, the child picks which variant of each of the 3
 * materials to use. Each material has 2 variants shown as two large
 * cards on the screen for that material's station.
 */
export function VariantSelect({ tool, onComplete, onBack }: VariantSelectProps) {
  const [choices, setChoices] = useState<(0 | 1 | null)[]>([null, null, null]);

  function pick(matIdx: number, variantIdx: 0 | 1) {
    Sound.pop();
    setChoices((prev) => {
      const next = [...prev] as (0 | 1 | null)[];
      next[matIdx] = variantIdx;
      return next;
    });
  }

  function handleConfirm() {
    if (choices.some((c) => c === null)) return;
    const resolvedMaterials = tool.materials.map((mat, i) => {
      const variant = mat.variants[choices[i]!];
      const resolved: ResolvedMaterial = {
        id: mat.id,
        label: mat.label,
        variantLabel: variant.label,
        category: mat.category,
        rawAsset: variant.rawAsset,
        shapedAsset: variant.shapedAsset,
        finalAsset: variant.finalAsset,
        forageX: mat.forageX,
        forageY: mat.forageY,
        station: mat.station,
      };
      return resolved;
    }) as [ResolvedMaterial, ResolvedMaterial, ResolvedMaterial];

    Sound.chime();
    onComplete({
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
    });
  }

  const allChosen = choices.every((c) => c !== null);

  return (
    <div className="absolute inset-0 anim-fade-in">
      <AssetImage
        assetKey="bg_attract"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/85" />

      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
          Build Your {tool.shortName}!
        </h1>
        <p className="text-3xl text-amber-200 mt-3 font-bold">
          Pick one of each material
        </p>
      </div>

      {/* 3 material columns spread across the 3 screens */}
      {tool.materials.map((mat, matIdx) => {
        const screenCenter = SCREEN_WIDTH * matIdx + SCREEN_WIDTH / 2;
        return (
          <div
            key={mat.id}
            className="absolute flex flex-col items-center"
            style={{ left: screenCenter - 750, top: 200, width: 1500 }}
          >
            {/* Material label */}
            <div className="rounded-2xl bg-slate-800/80 px-8 py-3 border-4 border-white/20 mb-8">
              <span className="text-3xl font-extrabold text-white">
                Material {matIdx + 1}: {mat.label}
              </span>
            </div>

            {/* Two variant cards */}
            <div className="flex gap-12">
              {mat.variants.map((variant, varIdx) => {
                const isSelected = choices[matIdx] === varIdx;
                return (
                  <button
                    key={variant.id}
                    onClick={() => pick(matIdx, varIdx as 0 | 1)}
                    className={`flex flex-col items-center rounded-[2rem] p-6 border-4 transition-all hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/20 ring-8 ring-amber-400/40'
                        : 'border-white/30 bg-white/5'
                    }`}
                    style={{ width: 580, minHeight: 500 }}
                  >
                    <div className="w-full h-64 flex items-center justify-center">
                      <AssetImage
                        assetKey={variant.rawAsset}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mt-4 text-center">
                      {variant.label}
                    </h3>
                    {isSelected && (
                      <div className="mt-3 w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-white text-3xl font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Confirm button */}
      {allChosen && (
        <button
          onClick={handleConfirm}
          className="anim-play-pulse absolute z-30 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-16 py-10 text-5xl font-extrabold text-white shadow-2xl"
          style={{ left: 2880 - 300, top: 870, minWidth: 600, minHeight: 140 }}
        >
          Start Building!
        </button>
      )}

      {/* Back button */}
      <button
        onClick={() => {
          Sound.pop();
          onBack();
        }}
        className="absolute z-30 rounded-full bg-white/10 px-8 py-5 text-3xl font-bold text-white border-4 border-white/20 hover:bg-white/20"
        style={{ left: 60, top: 40 }}
      >
        Back
      </button>

      <Lori
        pose="talk"
        message="Pick which material you want for each part! Tap two cards, then start building!"
        x={2660}
        y={780}
      />
    </div>
  );
}

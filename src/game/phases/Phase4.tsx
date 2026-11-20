import { useState, useEffect } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import Confetti from '@/components/Confetti';
import { Sound } from '@/game/sound';
import type { ResolvedTool } from '@/game/types';

interface RevealProps {
  tool: ResolvedTool;
  onMakeAnother: () => void;
  onAllDone: () => void;
}

export function Reveal({ tool, onMakeAnother, onAllDone }: RevealProps) {
  const [showSummary, setShowSummary] = useState(true);
  const [showGoodbye, setShowGoodbye] = useState(false);

  return (
    <div className="absolute inset-0 anim-fade-in">
      <AssetImage
        assetKey="bg_museum"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/60" />

      {/* Spotlights */}
      <Spotlights />

      {/* Confetti */}
      <Confetti count={150} />

      {/* Museum pedestal with completed tool */}
      <div
        className="absolute z-20 flex flex-col items-center"
        style={{ left: 2880 - 250, top: 200, width: 500 }}
      >
        {/* Completed artifact */}
        <div className="anim-rise-up" style={{ width: 500, height: 400 }}>
          <AssetImage
            assetKey={tool.finalAsset}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Pedestal */}
        <div
          className="rounded-t-3xl bg-gradient-to-b from-stone-300 to-stone-500 shadow-2xl border-4 border-stone-200"
          style={{ width: 400, height: 200 }}
        >
          <div className="text-center pt-4">
            <p className="text-2xl font-extrabold text-stone-700">{tool.shortName}</p>
            <p className="text-lg text-stone-500">{tool.originRegion}</p>
          </div>
        </div>
      </div>

      {/* Silhouette animation (looping) - to the left of pedestal */}
      <div
        className="absolute z-20 anim-float-bob"
        style={{ left: 1800, top: 300, width: 400, height: 400 }}
      >
        <AssetImage
          assetKey={tool.silhouetteAsset}
          className="w-full h-full object-contain"
          showLabel={true}
        />
      </div>

      {/* Lori with origin fact */}
      <Lori
        pose="celebrate"
        message={tool.originFact}
        x={3760}
        y={200}
      />

      {/* Completion summary pop-up */}
      {showSummary && (
        <SummaryPopup
          tool={tool}
          onClose={() => {
            Sound.pop();
            setShowSummary(false);
          }}
        />
      )}

      {/* Action buttons (visible after summary dismissed) */}
      {!showSummary && !showGoodbye && (
        <div
          className="absolute z-30 flex items-center gap-16 anim-fade-in"
          style={{ left: 2880 - 700, top: 880, width: 1400 }}
        >
          <button
            onClick={() => {
              Sound.pop();
              onMakeAnother();
            }}
            className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-16 py-10 text-4xl font-extrabold text-white shadow-2xl ring-8 ring-white/20 transition-transform hover:scale-105 active:scale-95"
            style={{ minWidth: 520, minHeight: 130 }}
          >
            Make Another Tool!
          </button>
          <button
            onClick={() => {
              Sound.pop();
              setShowGoodbye(true);
            }}
            className="rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-16 py-10 text-4xl font-extrabold text-white shadow-2xl ring-8 ring-white/20 transition-transform hover:scale-105 active:scale-95"
            style={{ minWidth: 520, minHeight: 130 }}
          >
            All Done!
          </button>
        </div>
      )}

      {/* Goodbye screen */}
      {showGoodbye && <GoodbyeScreen onReset={onAllDone} />}
    </div>
  );
}

function SummaryPopup({ tool, onClose }: { tool: ResolvedTool; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center anim-fade-in">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-[2rem] border-8 border-amber-400 shadow-2xl p-12 anim-speech-pop"
        style={{ width: 900, maxWidth: '90%' }}
      >
        <h2 className="text-5xl font-extrabold text-slate-800 mb-4 text-center">
          {tool.name}
        </h2>
        <p className="text-2xl text-amber-600 font-bold text-center mb-8">
          {tool.originRegion}
        </p>

        <p className="text-3xl text-slate-700 leading-relaxed text-center mb-8">
          {tool.summary}
        </p>

        <div className="flex justify-center gap-6 mb-8">
          {tool.materials.map((mat) => (
            <div
              key={mat.id}
              className="flex flex-col items-center rounded-2xl bg-slate-100 p-4 border-4 border-slate-200"
              style={{ width: 240 }}
            >
              <div style={{ width: 120, height: 120 }}>
                <AssetImage
                  assetKey={mat.rawAsset}
                  className="w-full h-full object-contain"
                  showLabel={false}
                />
              </div>
              <span className="text-lg font-bold text-slate-600 mt-2 text-center">
                {mat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-amber-50 border-4 border-amber-200 p-6 mb-8">
          <p className="text-2xl text-slate-700 leading-relaxed text-center italic">
            {tool.originFact}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 py-8 text-4xl font-extrabold text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
          style={{ minHeight: 110 }}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

function Spotlights() {
  return (
    <>
      {[1920, 2880, 3840].map((x, i) => (
        <div
          key={i}
          className="absolute anim-spotlight"
          style={{
            left: x - 150,
            top: -100,
            width: 300,
            height: 1200,
            background:
              'linear-gradient(180deg, rgba(255,255,200,0.35) 0%, rgba(255,255,200,0.05) 100%)',
            transformOrigin: 'top center',
            animationDelay: `${i * 0.4}s`,
            clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
          }}
        />
      ))}
    </>
  );
}

function GoodbyeScreen({ onReset }: { onReset: () => void }) {
  useEffect(() => {
    Sound.goodbye();
    const timer = setTimeout(onReset, 10000);
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center anim-fade-in">
      <AssetImage
        assetKey="bg_goodbye"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-slate-900/60" />
      <Lori
        pose="wave"
        message="Bye bye, time-traveler! Come back and build another tool soon!"
        x={2460}
        y={200}
        chimeOnChange={false}
      />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/60 text-3xl font-bold">
        Resetting in a few seconds...
      </div>
    </div>
  );
}

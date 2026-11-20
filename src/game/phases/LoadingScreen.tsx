import AssetImage from '@/components/AssetImage';
import { Sound } from '@/game/sound';

interface LoadingScreenProps {
  onStart: () => void;
}

/**
 * Animated loading / attract screen.
 *
 * HOW TO ADD YOUR OWN ANIMATION:
 * -------------------------------
 * 1. Drop your animated file (GIF, APNG, or a CSS-animated sprite) into
 *    /assets/backgrounds/loading_bg.png (or create a new asset key).
 * 2. If it's a GIF/APNG, just place it at that path and the AssetImage
 *    component will render it automatically.
 * 3. If you want a separate animated element on top of the background,
 *    add it inside the <div className="anim-loading-breath"> slot below.
 *    Replace the placeholder circle with an <img> or <div> containing
 *    your animation, and remove the `anim-loading-breath` class if you
 *    have your own animation.
 * 4. The play button is positioned at the bottom-right of the middle
 *    screen. Clicking anywhere on the screen also starts the game.
 *
 * For now, clicking anywhere starts the game.
 */
export function LoadingScreen({ onStart }: LoadingScreenProps) {
  function handleStart() {
    Sound.pop();
    onStart();
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center anim-fade-in"
      onClick={handleStart}
    >
      {/* Background - replace with your animated background */}
      <AssetImage
        assetKey="loading_bg"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />
      <div className="absolute inset-0 bg-slate-900/30" />

      {/* Animation slot - replace this placeholder with your own animation */}
      <div
        className="absolute z-10 anim-loading-breath flex items-center justify-center"
        style={{ left: 2880 - 200, top: 300, width: 400, height: 400 }}
      >
        <div
          className="rounded-full border-8 border-amber-400/60 flex items-center justify-center"
          style={{ width: 300, height: 300 }}
        >
          <span className="text-6xl font-extrabold text-white/80">Lori</span>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-2xl">
          Lori's Time-Travel Tool Workshop
        </h1>
        <p className="text-3xl text-amber-200 mt-4 font-bold">
          Tap anywhere to begin!
        </p>
      </div>

      {/* Play button - bottom-right of the middle screen */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleStart();
        }}
        className="anim-play-pulse absolute z-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl ring-8 ring-white/30"
        style={{
          left: 2880 + SCREEN_W * 0.5 - 120, // bottom-right area of middle screen
          top: 820,
          width: 180,
          height: 180,
        }}
      >
        {/* Play triangle */}
        <div
          className="w-0 h-0 ml-3"
          style={{
            borderLeft: '50px solid white',
            borderTop: '35px solid transparent',
            borderBottom: '35px solid transparent',
          }}
        />
      </button>
    </div>
  );
}

const SCREEN_W = 1920;

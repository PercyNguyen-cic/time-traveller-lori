import { useState, useRef, useCallback, useEffect } from 'react';
import Lori from '@/components/Lori';
import AssetImage from '@/components/AssetImage';
import Sparkles from '@/components/Sparkles';
import { Sound } from '@/game/sound';
import { TAPS_TO_SHAPE } from '@/game/toolData';
import type { ToolSpec, MaterialSpec, PhaseStep } from '@/game/types';

interface AssembleProps {
  tool: ToolSpec;
  onComplete: () => void;
}

const STATION_X = [960, 2880, 4800]; // left, center, right screen centers
const BELT_Y = 620;

export function Assemble({ tool, onComplete }: AssembleProps) {
  const [step, setStep] = useState<PhaseStep>('shape');
  const [tapCount, setTapCount] = useState(0);
  const [shaped, setShaped] = useState(false);
  const [attached, setAttached] = useState(false);
  const [bound, setBound] = useState(false);
  const [beltMoving, setBeltMoving] = useState(false);
  const [itemX, setItemX] = useState(STATION_X[0]); // current position of item on belt
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [sparkleAt, setSparkleAt] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Materials by station
  const mat1 = tool.materials.find((m) => m.station === 1)!;
  const mat2 = tool.materials.find((m) => m.station === 2)!;
  const mat3 = tool.materials.find((m) => m.station === 3)!;

  // Move belt to a target station
  const moveBelt = useCallback((targetIdx: number, onArrive: () => void) => {
    setBeltMoving(true);
    const target = STATION_X[targetIdx];
    setItemX((cur) => {
      const diff = target - cur;
      const steps = 30;
      const stepSize = diff / steps;
      let frame = 0;
      const tick = () => {
        frame++;
        setItemX((prev) => {
          const next = prev + stepSize;
          if (frame >= steps) return target;
          return next;
        });
        if (frame < steps) {
          requestAnimationFrame(tick);
        } else {
          setBeltMoving(false);
          onArrive();
        }
      };
      requestAnimationFrame(tick);
      return cur;
    });
  }, []);

  // Station 1: tap to shape
  const handleShapeTap = useCallback(() => {
    if (shaped || beltMoving) return;
    Sound.chip();
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= TAPS_TO_SHAPE) {
      setShaped(true);
      Sound.snap();
      setTimeout(() => {
        moveBelt(1, () => setStep('attach'));
      }, 700);
    }
  }, [tapCount, shaped, beltMoving, moveBelt]);

  // Station 2: drag head onto shaft
  const handleDragStart = useCallback(
    (e: React.PointerEvent, mat: MaterialSpec) => {
      if (step !== 'attach' || attached) return;
      e.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const scale = rect.width / 5760;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const stageX = px / scale;
      const stageY = py / scale;
      const itemW = 220;
      dragRef.current = {
        id: mat.id,
        offsetX: stageX - (STATION_X[1] - itemW / 2),
        offsetY: stageY - (BELT_Y - 100),
      };
      setDragPos({ x: stageX - itemW / 2, y: stageY - 100 });
      Sound.pop();
    },
    [step, attached],
  );

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const scale = rect.width / 5760;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setDragPos({ x: px / scale - 110, y: py / scale - 100 });
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current) return;
    // Check if dropped near the target zone (shaft at station 2)
    if (dragPos) {
      const targetX = STATION_X[1];
      const targetY = BELT_Y;
      const dist = Math.hypot(dragPos.x + 110 - targetX, dragPos.y + 100 - targetY);
      if (dist < 250) {
        // Snap!
        Sound.snap();
        setAttached(true);
        setDragPos(null);
        dragRef.current = null;
        setTimeout(() => {
          moveBelt(2, () => setStep('bind'));
        }, 800);
        return;
      }
    }
    // Return to start position
    setDragPos(null);
    dragRef.current = null;
  }, [dragPos, moveBelt]);

  // Station 3: drag binding onto joint
  const handleBindStart = useCallback(
    (e: React.PointerEvent) => {
      if (step !== 'bind' || bound) return;
      e.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const scale = rect.width / 5760;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      dragRef.current = {
        id: mat3.id,
        offsetX: 0,
        offsetY: 0,
      };
      setDragPos({ x: px / scale - 110, y: py / scale - 100 });
      Sound.pop();
    },
    [step, bound, mat3.id],
  );

  const handleBindEnd = useCallback(() => {
    if (!dragRef.current) return;
    if (dragPos) {
      const targetX = STATION_X[2];
      const targetY = BELT_Y;
      const dist = Math.hypot(dragPos.x + 110 - targetX, dragPos.y + 100 - targetY);
      if (dist < 250) {
        Sound.sparkle();
        setBound(true);
        setSparkleAt({ x: targetX, y: targetY });
        setDragPos(null);
        dragRef.current = null;
        setTimeout(() => {
          setSparkleAt(null);
          Sound.fanfare();
          onComplete();
        }, 1200);
        return;
      }
    }
    setDragPos(null);
    dragRef.current = null;
  }, [dragPos, onComplete]);

  // Global pointer listeners for drag
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return;
      e.preventDefault();
      const rect = stage!.getBoundingClientRect();
      const scale = rect.width / 5760;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      setDragPos({ x: px / scale - 110, y: py / scale - 100 });
    }
    function onUp() {
      if (!dragRef.current) return;
      if (step === 'attach') handleDragEnd();
      else if (step === 'bind') handleBindEnd();
    }
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [step, handleDragEnd, handleBindEnd]);

  // Current item asset for the assembly on the belt
  const beltItemAsset = shaped
    ? attached
      ? bound
        ? tool.finalAsset
        : mat1.shapedAsset ?? mat1.finalAsset
      : mat1.shapedAsset ?? mat1.finalAsset
    : mat1.rawAsset;

  const loriMessage =
    step === 'shape'
      ? shaped
        ? 'Great shaping! Off to the next station!'
        : `Tap ${TAPS_TO_SHAPE} times to chip and shape the ${mat1.label}!`
      : step === 'attach'
        ? attached
          ? 'Perfect snap! Off to the binding station!'
          : `Drag the ${mat2.label} onto the handle!`
        : step === 'bind'
          ? bound
            ? 'Beautiful! Your tool is complete!'
            : `Drag the ${mat3.label} onto the joint to bind it!`
          : 'All done!';

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 anim-wipe-in"
      onPointerMove={handleDragMove}
    >
      <AssetImage
        assetKey="bg_conveyor"
        className="absolute inset-0 w-full h-full object-cover"
        showLabel={false}
      />

      {/* Conveyor belt - full width */}
      <ConveyorBelt />

      {/* Station labels */}
      {['Shaping', 'Attach', 'Bind'].map((label, i) => (
        <div
          key={i}
          className="absolute text-center z-10"
          style={{ left: STATION_X[i] - 300, top: BELT_Y - 320, width: 600 }}
        >
          <div className="inline-block rounded-2xl bg-slate-900/80 px-8 py-3 border-4 border-white/20">
            <span className="text-3xl font-extrabold text-white">
              Station {i + 1}: {label}
            </span>
          </div>
        </div>
      ))}

      {/* Item on belt (the assembly) */}
      <div
        className="absolute z-15"
        style={{
          left: itemX - 110,
          top: BELT_Y - 110,
          width: 220,
          height: 220,
          transition: beltMoving ? 'none' : 'all 0.3s ease',
        }}
      >
        <AssetImage
          assetKey={beltItemAsset}
          className="w-full h-full object-contain"
          showLabel={true}
        />
      </div>

      {/* Station 1: shaping interaction */}
      {step === 'shape' && !shaped && (
        <button
          onClick={handleShapeTap}
          className="absolute z-20 rounded-full bg-amber-500/30 border-4 border-amber-400 anim-pulse-glow"
          style={{
            left: STATION_X[0] - 130,
            top: BELT_Y - 130,
            width: 260,
            height: 260,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-6xl font-extrabold text-white drop-shadow-lg">
              TAP!
            </span>
            <span className="text-2xl font-bold text-amber-100 mt-1">
              {tapCount}/{TAPS_TO_SHAPE}
            </span>
          </div>
        </button>
      )}

      {/* Station 2: draggable head/tip (mat2) */}
      {step === 'attach' && !attached && (
        <>
          {/* Glowing target outline on the shaft */}
          <div
            className="absolute z-16 rounded-xl border-4 border-dashed border-cyan-300 anim-pulse-glow"
            style={{
              left: STATION_X[1] - 100,
              top: BELT_Y - 100,
              width: 200,
              height: 200,
            }}
          />
          {/* Draggable head/tip */}
          <div
            onPointerDown={(e) => handleDragStart(e, mat2)}
            className="absolute z-25 cursor-grab active:cursor-grabbing touch-none"
            style={{
              left: dragPos?.x ?? STATION_X[1] - 400,
              top: dragPos?.y ?? BELT_Y - 100,
              width: 220,
              height: 220,
            }}
          >
            <AssetImage
              assetKey={mat2.shapedAsset ?? mat2.rawAsset}
              className="w-full h-full object-contain"
            />
          </div>
        </>
      )}

      {/* Station 3: draggable binding (mat3) */}
      {step === 'bind' && !bound && (
        <>
          {/* Glowing target outline on the joint */}
          <div
            className="absolute z-16 rounded-xl border-4 border-dashed border-green-300 anim-pulse-glow"
            style={{
              left: STATION_X[2] - 100,
              top: BELT_Y - 100,
              width: 200,
              height: 200,
            }}
          />
          {/* Draggable binding material */}
          <div
            onPointerDown={handleBindStart}
            className="absolute z-25 cursor-grab active:cursor-grabbing touch-none"
            style={{
              left: dragPos?.x ?? STATION_X[2] - 400,
              top: dragPos?.y ?? BELT_Y - 100,
              width: 220,
              height: 220,
            }}
          >
            <AssetImage
              assetKey={mat3.rawAsset}
              className="w-full h-full object-contain"
            />
          </div>
        </>
      )}

      {/* Sparkles for binding */}
      {sparkleAt && <Sparkles x={sparkleAt.x} y={sparkleAt.y} count={20} />}

      <Lori
        pose={bound ? 'celebrate' : 'talk'}
        message={loriMessage}
        x={80}
        y={780}
      />
    </div>
  );
}

function ConveyorBelt() {
  return (
    <div
      className="absolute z-10 anim-belt"
      style={{
        left: 0,
        top: BELT_Y,
        width: 5760,
        height: 120,
        background: 'repeating-linear-gradient(90deg, #333 0px, #333 80px, #555 80px, #555 120px)',
        borderTop: '8px solid #666',
        borderBottom: '8px solid #666',
      }}
    >
      {/* Belt rollers */}
      {[0, 960, 1920, 2880, 3840, 4800, 5760].map((x, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-b from-gray-500 to-gray-700"
          style={{
            left: x - 30,
            top: -20,
            width: 60,
            height: 160,
          }}
        />
      ))}
    </div>
  );
}

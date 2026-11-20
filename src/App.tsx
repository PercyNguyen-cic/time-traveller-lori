import { useState, useCallback } from 'react';
import Stage from '@/components/Stage';
import { LoadingScreen } from '@/game/phases/LoadingScreen';
import { Greeting, Select } from '@/game/phases/Phase1';
import { Forage } from '@/game/phases/Phase2';
import { Assemble } from '@/game/phases/Phase3';
import { Reveal } from '@/game/phases/Phase4';
import { Sound } from '@/game/sound';
import type { Phase, ToolSpec, ResolvedTool } from '@/game/types';

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [selectedTool, setSelectedTool] = useState<ToolSpec | null>(null);
  const [resolvedTool, setResolvedTool] = useState<ResolvedTool | null>(null);

  /* Loading → Greeting */
  const handleLoadingStart = useCallback(() => {
    Sound.unlock();
    setPhase('greeting');
  }, []);

  /* Greeting → Select */
  const handleGreetingComplete = useCallback(() => {
    setPhase('select');
  }, []);

  /* Select → Forage (selection happens in-world during foraging) */
  const handleSelect = useCallback((tool: ToolSpec) => {
    setSelectedTool(tool);
    setPhase('forage');
  }, []);

  /* Forage → Assemble (provides the resolved tool with chosen variants) */
  const handleForageComplete = useCallback((resolved: ResolvedTool) => {
    setResolvedTool(resolved);
    setPhase('assemble');
  }, []);

  /* Assemble → Reveal */
  const handleAssembleComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  /* Reveal → Select (make another) */
  const handleMakeAnother = useCallback(() => {
    setSelectedTool(null);
    setResolvedTool(null);
    setPhase('select');
  }, []);

  /* Reveal → Loading (all done) */
  const handleAllDone = useCallback(() => {
    setSelectedTool(null);
    setResolvedTool(null);
    setPhase('loading');
  }, []);

  return (
    <Stage>
      {phase === 'loading' && <LoadingScreen onStart={handleLoadingStart} />}
      {phase === 'greeting' && <Greeting onComplete={handleGreetingComplete} />}
      {phase === 'select' && <Select onSelect={handleSelect} />}
      {phase === 'forage' && selectedTool && (
        <Forage tool={selectedTool} onComplete={handleForageComplete} />
      )}
      {phase === 'assemble' && resolvedTool && (
        <Assemble tool={resolvedTool} onComplete={handleAssembleComplete} />
      )}
      {phase === 'reveal' && resolvedTool && (
        <Reveal
          tool={resolvedTool}
          onMakeAnother={handleMakeAnother}
          onAllDone={handleAllDone}
        />
      )}
    </Stage>
  );
}

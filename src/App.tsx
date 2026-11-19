import { useState, useCallback } from 'react';
import Stage from '@/components/Stage';
import { Attract, Select } from '@/game/phases/Phase1';
import { Forage } from '@/game/phases/Phase2';
import { Assemble } from '@/game/phases/Phase3';
import { Reveal } from '@/game/phases/Phase4';
import { Sound } from '@/game/sound';
import type { Phase, ToolSpec } from '@/game/types';

export default function App() {
  const [phase, setPhase] = useState<Phase>('attract');
  const [selectedTool, setSelectedTool] = useState<ToolSpec | null>(null);

  const handleStart = useCallback(() => {
    Sound.unlock();
    setPhase('select');
  }, []);

  const handleSelect = useCallback((tool: ToolSpec) => {
    setSelectedTool(tool);
    setPhase('forage');
  }, []);

  const handleForageComplete = useCallback(() => {
    setPhase('assemble');
  }, []);

  const handleAssembleComplete = useCallback(() => {
    setPhase('reveal');
  }, []);

  const handleMakeAnother = useCallback(() => {
    setSelectedTool(null);
    setPhase('select');
  }, []);

  const handleAllDone = useCallback(() => {
    setSelectedTool(null);
    setPhase('attract');
  }, []);

  return (
    <Stage>
      {phase === 'attract' && <Attract onStart={handleStart} />}
      {phase === 'select' && <Select onSelect={handleSelect} />}
      {phase === 'forage' && selectedTool && (
        <Forage tool={selectedTool} onComplete={handleForageComplete} />
      )}
      {phase === 'assemble' && selectedTool && (
        <Assemble tool={selectedTool} onComplete={handleAssembleComplete} />
      )}
      {phase === 'reveal' && selectedTool && (
        <Reveal
          tool={selectedTool}
          onMakeAnother={handleMakeAnother}
          onAllDone={handleAllDone}
        />
      )}
    </Stage>
  );
}

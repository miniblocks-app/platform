import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { LogicBlocksPalette } from './LogicBlocksPalette';
import { BlocksCanvas } from './BlocksCanvas';
import { useAppStore } from '../../store';

export const BlocksWindow = () => {
  useAppStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    if (over && over.id === 'blocks-canvas') {
      const blockType = (active.data?.current as any)?.type;
      if (blockType) {
        // Add block to canvas
        console.log('Add block:', blockType);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex-1 flex">
        <div className="w-64 bg-white border-r flex flex-col">
          <LogicBlocksPalette />
        </div>
        <BlocksCanvas />
      </div>
    </DndContext>
  );
};
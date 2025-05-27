import React from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { ComponentTree } from './ComponentTree';
import { ComponentPalette } from './ComponentPalette';
import { DesignCanvas } from './DesignCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { useAppStore } from '../../store';
import { ComponentPreview } from './ComponentPreview';
import { BlocklyWorkspace } from 'react-blockly';

export const DesignWindow = () => {
  const { selectedScreen, addComponent } = useAppStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeDragType, setActiveDragType] = React.useState<string | null>(null);
  const { currentProject, workspace } = useAppStore();

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    setActiveDragType(event.active.data.current?.type);
  };

  React.useEffect(() => {
    console.log("Workspace changed:", workspace);
  }, [workspace]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveId(null);
    setActiveDragType(null);

    if (over && over.id === 'canvas' && selectedScreen) {
      const componentType = (active.data?.current as any)?.type;
      if (componentType) {
        // Get the canvas element
        const canvas = document.querySelector('.mobile-canvas');
        if (!canvas) return;

        // Get canvas and pointer positions
        const canvasRect = canvas.getBoundingClientRect();
        const pointerX = event.activatorEvent.clientX;
        const pointerY = event.activatorEvent.clientY;

        // Calculate position relative to canvas
        const x = Math.max(0, Math.min(
          pointerX - canvasRect.left - 8, // Subtract padding
          390 - 100 // Max width minus approximate component width
        ));
        const y = Math.max(0, Math.min(
          pointerY - canvasRect.top - 8, // Subtract padding
          844 - 100 // Max height minus approximate component height
        ));

        addComponent(selectedScreen, {
          id: crypto.randomUUID(),
          type: componentType,
          props: {
            style: {
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
            },
            text: componentType === 'text' ? 'Text' : undefined,
          },
        });
        // Create the corresponding Blockly block if the workspace is available
        if (workspace) {
            if (componentType === 'button') {
            const buttonBlock = workspace.newBlock('flutter_raised_button');
            buttonBlock.initSvg();
            buttonBlock.render();
            buttonBlock.moveBy(Math.random() * 300, Math.random() * 200);
            } else if (componentType === 'text') {
            const textBlock = workspace.newBlock('flutter_text');
            textBlock.initSvg();
            textBlock.render();
            textBlock.moveBy(Math.random() * 300, Math.random() * 200);
            } else if (componentType === 'input') {
            const inputBlock = workspace.newBlock('flutter_textfield');
            inputBlock.initSvg();
            inputBlock.render();
            inputBlock.moveBy(Math.random() * 300, Math.random() * 200);
            }
        } else {
          console.warn("Blockly workspace is not available in DesignWindow.");
        }
      }
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex-1 flex">
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="flex-shrink-0">
            <ComponentTree
              workspace={workspace}
              currentProject={currentProject}
            />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto left-panel-scroll">
            <ComponentPalette />   
          </div>
        </div>
        <DesignCanvas />
        <PropertiesPanel />
      </div>
      <DragOverlay>
        {activeId && activeDragType && (
          <ComponentPreview type={activeDragType} />
        )}
      </DragOverlay>
    </DndContext>
  );
};
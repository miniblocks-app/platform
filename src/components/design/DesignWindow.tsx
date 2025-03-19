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
        const position = {
          x: over.rect.left - active.rect.left,
          y: over.rect.top - active.rect.top,
        };
  
        // Add the component to your store
        const newComponent = {
          id: crypto.randomUUID(),
          type: componentType,
          props: {
            style: {
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
            },
          },
        };
  
        addComponent(selectedScreen, newComponent);
  
        // Create the corresponding Blockly block if the workspace is available
        if (workspace) {
          if (componentType === 'button') {
            const buttonBlock = workspace.newBlock('flutter_raised_button');
            buttonBlock.initSvg();
            buttonBlock.render();
          } else if (componentType === 'text') {
            const textBlock = workspace.newBlock('flutter_text');
            textBlock.initSvg();
            textBlock.render();
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
        <ComponentTree
          workspace={workspace}
          currentProject={currentProject}
        />
            <ComponentPalette />   
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
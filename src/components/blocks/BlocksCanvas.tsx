import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { Settings, Grid } from 'lucide-react';

export const BlocksCanvas = () => {
  const [showGrid, setShowGrid] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'blocks-canvas',
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Toolbar */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className={clsx(
              "p-2 rounded-md",
              showGrid ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-600"
            )}
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle Grid"
          >
            <Grid className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            >
              -
            </button>
            <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
            <button
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            >
              +
            </button>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-auto bg-gray-100">
        <div 
          ref={setNodeRef}
          className={clsx(
            'w-full h-full min-h-[800px]',
            showGrid && 'bg-grid-pattern',
            isOver && 'ring-2 ring-blue-500'
          )}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Blocks will be rendered here */}
        </div>
      </div>
    </div>
  );
};
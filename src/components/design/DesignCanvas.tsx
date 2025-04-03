import { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useAppStore } from '../../store';
import { Undo2, Redo2, ZoomIn, ZoomOut, Grid, Trash2 } from 'lucide-react';
import { ComponentPreview } from './ComponentPreview';
import clsx from 'clsx';

interface ComponentData {
  id: string;
  type: string;
  props: {
    style?: {
      position?: string;
      left?: string;
      top?: string;
      [key: string]: any;
    };
    text?: string;
    [key: string]: any;
  };
}

interface Screen {
  id: string;
  name: string;
  components: ComponentData[];
  settings: {
    scrollable: boolean;
    backgroundColor: string;
    orientation: 'portrait' | 'landscape';
    statusBar?: {
      visible: boolean;
      style: 'default' | 'light' | 'dark';
      color: string;
    };
  };
}

interface AlignmentLine {
  type: 'vertical' | 'horizontal';
  position: number;
  start: number;
  end: number;
  spacing?: number;
  isDashed?: boolean;
}

export const DesignCanvas = () => {
  const { selectedScreen, selectedComponent, currentProject, updateComponent, deleteComponent, undo, redo, addComponent } = useAppStore();
  const screen = currentProject?.screens.find((s) => s.id === selectedScreen) as Screen | undefined;
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [clipboard, setClipboard] = useState<ComponentData | null>(null);
  const [alignmentLines, setAlignmentLines] = useState<AlignmentLine[]>([]);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: {
      accepts: ['component'],
    },
  });

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!selectedScreen) return;

      // Check for both Ctrl and Command (Meta) key
      const isModifierKey = e.ctrlKey || e.metaKey;

      if (isModifierKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo(); // Shift + Cmd/Ctrl + Z for Redo on Mac
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo(); // For Windows Ctrl + Y
            break;
          case 'c': {
            e.preventDefault();
            if (!selectedComponent || !screen) return;
            
            const componentToCopy = screen.components.find(c => c.id === selectedComponent);
            if (componentToCopy) {
              // Create a deep copy of the component
              const copy = JSON.parse(JSON.stringify(componentToCopy));
              setClipboard(copy);
            }
            break;
          }
          case 'v': {
            e.preventDefault();
            if (!clipboard || !selectedScreen) return;
            
            // Create a new component with a new ID but same properties
            const newComponent: ComponentData = {
              ...clipboard,
              id: crypto.randomUUID(),
              props: {
                ...clipboard.props,
                style: {
                  ...(clipboard.props.style || {}),
                  // Offset the pasted component slightly to make it visible
                  left: `${parseInt(clipboard.props.style?.left || '0') + 20}px`,
                  top: `${parseInt(clipboard.props.style?.top || '0') + 20}px`,
                }
              }
            };
            
            addComponent(selectedScreen, newComponent);
            break;
          }
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedComponent) {
          e.preventDefault();
          deleteComponent(selectedScreen, selectedComponent);
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedScreen, selectedComponent, clipboard, screen, undo, redo, deleteComponent, addComponent]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const calculateAlignmentLines = (componentId: string, newLeft: number, newTop: number) => {
    if (!screen) return [];
    
    const component = screen.components.find(c => c.id === componentId);
    if (!component) return [];

    const lines: AlignmentLine[] = [];
    const componentWidth = 100; // Approximate width of components
    const componentHeight = 40; // Approximate height of components
    
    // Screen dimensions
    const screenWidth = 390;
    const screenHeight = 844;
    
    // Calculate centers
    const screenCenterX = screenWidth / 2;
    const screenCenterY = screenHeight / 2;
    const componentCenterX = newLeft + (componentWidth / 2);
    const componentCenterY = newTop + (componentHeight / 2);
    
    // Center alignment lines
    if (Math.abs(componentCenterX - screenCenterX) < 10) {
      lines.push({
        type: 'vertical',
        position: screenCenterX,
        start: 0,
        end: screenHeight
      });
    }
    
    if (Math.abs(componentCenterY - screenCenterY) < 10) {
      lines.push({
        type: 'horizontal',
        position: screenCenterY,
        start: 0,
        end: screenWidth
      });
    }
    
    // Margin lines
    if (Math.abs(newLeft - 16) < 10) { // Left margin
      lines.push({
        type: 'vertical',
        position: 16,
        start: 0,
        end: screenHeight
      });
    }
    
    if (Math.abs(newLeft + componentWidth - (screenWidth - 16)) < 10) { // Right margin
      lines.push({
        type: 'vertical',
        position: screenWidth - 16,
        start: 0,
        end: screenHeight
      });
    }
    
    // Spacing between components
    screen.components.forEach(otherComponent => {
      if (otherComponent.id === componentId) return;
      
      const otherLeft = parseInt(otherComponent.props.style?.left || '0');
      const otherTop = parseInt(otherComponent.props.style?.top || '0');
      const otherCenterX = otherLeft + (componentWidth / 2);
      const otherCenterY = otherTop + (componentHeight / 2);
      
      // Vertical spacing (align centers)
      if (Math.abs(componentCenterX - otherCenterX) < 10) {
        const spacing = Math.abs(newTop - otherTop);
        if (spacing > 0) {
          // Center alignment line
          lines.push({
            type: 'vertical',
            position: componentCenterX,
            start: Math.min(newTop, otherTop),
            end: Math.max(newTop + componentHeight, otherTop + componentHeight)
          });
          
          // Add spacing indicator
          lines.push({
            type: 'vertical',
            position: componentCenterX,
            start: Math.min(newTop + componentHeight, otherTop + componentHeight),
            end: Math.max(newTop, otherTop),
            spacing
          });
        }
      }
      
      // Horizontal spacing (align centers)
      if (Math.abs(componentCenterY - otherCenterY) < 10) {
        const spacing = Math.abs(newLeft - otherLeft);
        if (spacing > 0) {
          // Center alignment line
          lines.push({
            type: 'horizontal',
            position: componentCenterY,
            start: Math.min(newLeft, otherLeft),
            end: Math.max(newLeft + componentWidth, otherLeft + componentWidth)
          });
          
          // Add spacing indicator
          lines.push({
            type: 'horizontal',
            position: componentCenterY,
            start: Math.min(newLeft + componentWidth, otherLeft + componentWidth),
            end: Math.max(newLeft, otherLeft),
            spacing
          });
        }
      }
    });
    
    return lines;
  };

  const handleComponentDrag = (componentId: string, deltaX: number, deltaY: number) => {
    if (!screen) return;
    
    const component = screen.components.find(c => c.id === componentId);
    if (!component) return;

    const currentLeft = parseInt(component.props.style?.left || '0');
    const currentTop = parseInt(component.props.style?.top || '0');

    // Calculate new position
    const newLeft = Math.max(0, Math.min(currentLeft + deltaX, 390 - 100));
    const newTop = Math.max(0, Math.min(currentTop + deltaY, 844 - 100));

    // Calculate alignment lines
    const lines = calculateAlignmentLines(componentId, newLeft, newTop);
    setAlignmentLines(lines);

    // Snap to alignment if close enough
    let finalLeft = newLeft;
    let finalTop = newTop;
    
    lines.forEach(line => {
      if (line.type === 'vertical') {
        // Adjust the position based on component center
        const componentCenterX = newLeft + 50; // half of componentWidth
        if (Math.abs(componentCenterX - line.position) < 10) {
          finalLeft = line.position - 50; // Subtract half width to align center
        }
      }
      if (line.type === 'horizontal') {
        // Adjust the position based on component center
        const componentCenterY = newTop + 20; // half of componentHeight
        if (Math.abs(componentCenterY - line.position) < 10) {
          finalTop = line.position - 20; // Subtract half height to align center
        }
      }
    });

    updateComponent(screen.id, componentId, {
      props: {
        ...component.props,
        style: {
          ...(component.props.style || {}),
          left: `${finalLeft}px`,
          top: `${finalTop}px`,
        }
      }
    } as Partial<ComponentData>);
  };

  const renderAlignmentLines = () => {
    return alignmentLines.map((line, index) => (
      <div
        key={index}
        className="absolute pointer-events-none"
        style={{
          [line.type === 'vertical' ? 'left' : 'top']: `${line.position}px`,
          [line.type === 'vertical' ? 'top' : 'left']: `${line.start}px`,
          [line.type === 'vertical' ? 'width' : 'height']: '1px',
          [line.type === 'vertical' ? 'height' : 'width']: `${line.end - line.start}px`,
          backgroundColor: 'rgb(59, 130, 246)', // blue-500
          borderStyle: line.isDashed ? 'dashed' : 'solid',
          borderWidth: '1px',
          borderColor: 'rgb(59, 130, 246)', // blue-500
        }}
      >
        {line.spacing && (
          <div
            className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded-full transform -translate-x-1/2"
            style={{
              [line.type === 'vertical' ? 'top' : 'left']: '50%',
              [line.type === 'vertical' ? 'left' : 'top']: '50%',
              transform: line.type === 'vertical' 
                ? 'translate(-50%, -50%)' 
                : 'translate(-50%, -50%) rotate(-90deg)',
            }}
          >
            {line.spacing}
          </div>
        )}
      </div>
    ));
  };

  const renderComponent = (component: any) => {
    return (
      <div 
        key={component.id}
        style={component.props.style}
        className={clsx(
          "absolute cursor-move",
          selectedComponent === component.id && "ring-2 ring-blue-500"
        )}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startY = e.clientY;
          
          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            handleComponentDrag(component.id, deltaX, deltaY);
          };
          
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            setAlignmentLines([]); // Clear alignment lines when done dragging
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
        onClick={(e) => {
          e.stopPropagation();
          useAppStore.getState().setSelectedComponent(component.id);
        }}
      >
        <ComponentPreview 
          type={component.type} 
          props={component.props}
        />
      </div>
    );
  };

  const renderMobileFrame = () => (
    <div 
      style={{ 
        transform: `scale(${zoom})`,
        transition: 'transform 0.2s ease-in-out'
      }}
      className="relative"
    >
      {/* Mobile Device Frame */}
      <div className="absolute inset-0 bg-black rounded-[60px] -m-4 shadow-xl" />
      
      {/* Screen Content */}
      <div
        ref={setNodeRef}
        className={clsx(
          'mobile-canvas w-[390px] h-[844px] bg-white rounded-[50px] overflow-hidden relative p-8',
          isOver && 'ring-2 ring-blue-500',
          screen?.settings.orientation === 'landscape' && 'rotate-90',
          showGrid && 'bg-grid-pattern',
          !screen && 'border-2 border-dashed border-gray-300 bg-gray-50'
        )}
        style={{ backgroundColor: screen?.settings.backgroundColor }}
        onClick={() => useAppStore.getState().setSelectedComponent(null)}
      >
        {screen ? (
          <>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[20px]" />
            
            {/* Content Area */}
            <div className={clsx(
              'h-full pt-[35px] relative',
              screen.settings.scrollable && 'overflow-y-auto'
            )}>
              {renderAlignmentLines()}
              {screen.components.map(renderComponent)}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Create a new screen to start designing
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Toolbar */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-md" 
            title="Undo (Ctrl/⌘ + Z)"
            onClick={undo}
          >
            <Undo2 className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-md" 
            title="Redo (Ctrl/⌘ + Y or Shift + ⌘ + Z)"
            onClick={redo}
          >
            <Redo2 className="w-5 h-5 text-gray-600" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button 
            className="p-2 hover:bg-gray-100 rounded-md" 
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
          <button 
            className="p-2 hover:bg-gray-100 rounded-md" 
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
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
        </div>
        <button 
          className={clsx(
            "p-2 rounded-md",
            selectedComponent 
              ? "text-red-600 hover:bg-red-50" 
              : "text-gray-400 cursor-not-allowed"
          )}
          title="Delete (Delete or Backspace)"
          onClick={() => {
            if (selectedComponent && selectedScreen) {
              deleteComponent(selectedScreen, selectedComponent);
            }
          }}
          disabled={!selectedComponent}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-auto bg-gray-100 p-8">
        <div className="absolute inset-0 flex items-center justify-center">
          {renderMobileFrame()}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { ChevronRight, Plus, Smartphone, Type, Image, Donut as Button, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store';
import clsx from 'clsx';

const ComponentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'button':
      return <Button className="w-4 h-4 text-gray-600" />;
    case 'text':
      return <Type className="w-4 h-4 text-gray-600" />;
    case 'image':
      return <Image className="w-4 h-4 text-gray-600" />;
    default:
      return null;
  }
};

export const ComponentTree = () => {
  const { 
    currentProject, 
    selectedScreen, 
    selectedComponent,
    setSelectedScreen, 
    setSelectedComponent,
    addScreen,
    setShowDeleteDialog,
    setScreenToDelete
  } = useAppStore();
  const [expandedScreens, setExpandedScreens] = React.useState<Set<string>>(new Set());

  const handleAddScreen = () => {
    const screenCount = currentProject?.screens.length ?? 0;
    const newScreen = {
      id: crypto.randomUUID(),
      name: `Screen ${screenCount + 1}`,
      components: [],
      settings: {
        scrollable: false,
        backgroundColor: '#ffffff',
        orientation: 'portrait' as const,
        statusBar: {
          visible: true,
          style: 'default' as const,
          color: '#000000',
        },
      },
    };
    
    addScreen(newScreen);
    setSelectedScreen(newScreen.id);
  };

  const toggleScreenExpand = (screenId: string) => {
    setExpandedScreens(prev => {
      const next = new Set(prev);
      if (next.has(screenId)) {
        next.delete(screenId);
      } else {
        next.add(screenId);
      }
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-700 mb-2 flex items-center justify-between">
          Component Tree
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={handleAddScreen}
            title="Add new screen"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {currentProject?.screens.map((screen) => (
          <div key={screen.id}>
            <div
              className={clsx(
                'flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50',
                selectedScreen === screen.id && 'bg-blue-50'
              )}
            >
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => toggleScreenExpand(screen.id)}
              >
                <ChevronRight 
                  className={clsx(
                    "w-4 h-4 text-gray-400 transition-transform",
                    expandedScreens.has(screen.id) && "rotate-90"
                  )} 
                />
              </button>
              <button
                className="flex items-center flex-1"
                onClick={() => setSelectedScreen(screen.id)}
              >
                <Smartphone className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">{screen.name}</span>
              </button>
              <button
                className="p-1 hover:bg-red-50 rounded text-red-500"
                onClick={() => {
                  setScreenToDelete(screen.id);
                  setShowDeleteDialog(true);
                }}
                title="Delete screen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {expandedScreens.has(screen.id) && screen.components.map(component => (
              <div
                key={component.id}
                className={clsx(
                  'flex items-center px-8 py-1 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer',
                  selectedComponent === component.id && 'bg-blue-50'
                )}
                onClick={() => setSelectedComponent(component.id)}
              >
                <ComponentIcon type={component.type} />
                <span className="ml-2 capitalize">{component.type}</span>
              </div>
            ))}
          </div>
        ))}
        {(!currentProject?.screens || currentProject.screens.length === 0) && (
          <div className="p-4 text-sm text-gray-500 text-center">
            No screens yet. Click the + button to create one.
          </div>
        )}
      </div>
    </div>
  );
};
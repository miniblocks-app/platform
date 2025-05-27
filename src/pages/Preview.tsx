import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { ComponentPreview } from '../components/design/ComponentPreview';
import { RotateCcw, Smartphone, Tablet, Maximize2, Minimize2, RefreshCw, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

export const Preview = () => {
  const { screenId } = useParams();
  const { currentProject } = useAppStore();
  const [zoom, setZoom] = useState(1);
  const [isRotated, setIsRotated] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet'>('mobile');
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const screen = (currentProject?.screens.find(s => s.id === screenId) as import('../types').Screen | undefined);

  // Hot reload functionality
  useEffect(() => {
    const checkForUpdates = () => {
      const currentState = JSON.parse(localStorage.getItem('miniblocks-storage') || '{}');
      const currentStateHash = JSON.stringify(currentState);
      const previousStateHash = JSON.stringify(window._previousState || {});
      
      if (currentStateHash !== previousStateHash) {
        window._previousState = currentState;
        setLastUpdate(Date.now());
      }
    };

    const interval = setInterval(checkForUpdates, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const currentState = JSON.parse(localStorage.getItem('miniblocks-storage') || '{}');
    window._previousState = currentState;
    setLastUpdate(Date.now());
    
    // Visual feedback for refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };
  
  if (!screen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Screen not found</h1>
          <p className="text-gray-600">The screen you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const deviceDimensions = {
    mobile: { width: 390, height: 844 },
    tablet: { width: 820, height: 1180 },
  };

  const { width, height } = deviceDimensions[deviceType];
  const actualWidth = isRotated ? height : width;
  const actualHeight = isRotated ? width : height;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Preview Toolbar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className={clsx(
              'p-2 rounded-md transition-colors',
              deviceType === 'mobile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
            )}
            onClick={() => setDeviceType('mobile')}
            title="Mobile view"
          >
            <Smartphone className="w-5 h-5" />
          </button>
          <button
            className={clsx(
              'p-2 rounded-md transition-colors',
              deviceType === 'tablet' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
            )}
            onClick={() => setDeviceType('tablet')}
            title="Tablet view"
          >
            <Tablet className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <button
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsRotated(!isRotated)}
            title="Rotate device"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <button
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))}
            title="Zoom in"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
          <button
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
            title="Zoom out"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Auto-refreshing</span>
            <RefreshCw className="w-4 h-4 text-green-500 animate-spin" />
          </div>
          <button
            className={clsx(
              "p-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors",
              isRefreshing && "animate-spin"
            )}
            onClick={handleManualRefresh}
            title="Manual refresh"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="flex items-center justify-center min-h-full">
          <div 
            className="relative transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
            }}
          >
            {/* Device Frame */}
            <div className="absolute inset-0 bg-black rounded-[60px] -m-4 shadow-xl" />
            
            {/* Screen Content */}
            <div
              className={clsx(
                'bg-white rounded-[50px] overflow-hidden relative p-8 transition-all duration-300',
                isRotated && 'origin-center rotate-90'
              )}
              style={{ 
                width: `${actualWidth}px`,
                height: `${actualHeight}px`,
                backgroundColor: screen.settings.backgroundColor,
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[20px]" />
              
              {/* Content Area */}
              <div 
                className={clsx(
                  'h-full pt-[35px] relative',
                  screen.settings.scrollable && 'overflow-y-auto'
                )}
              >
                {screen.components.map(component => {
                  const comp = component as import('../types').ComponentData;
                  return (
                    <div
                      key={comp.id}
                      style={comp.props.style}
                      className="absolute"
                    >
                      <ComponentPreview type={comp.type} props={comp.props} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add type declaration for window object
declare global {
  interface Window {
    _previousState: any;
  }
}
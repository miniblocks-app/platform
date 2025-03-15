import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { ComponentPreview } from '../components/design/ComponentPreview';

export const Preview = () => {
  const { screenId } = useParams();
  const { currentProject } = useAppStore();
  
  const screen = currentProject?.screens.find(s => s.id === screenId);
  
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="relative">
        {/* Mobile Device Frame */}
        <div className="absolute inset-0 bg-black rounded-[60px] -m-4 shadow-xl" />
        
        {/* Screen Content */}
        <div
          className="w-[390px] h-[844px] bg-white rounded-[50px] overflow-hidden relative p-8"
          style={{ backgroundColor: screen.settings.backgroundColor }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[20px]" />
          
          {/* Content Area */}
          <div className={`h-full pt-[35px] relative ${screen.settings.scrollable ? 'overflow-y-auto' : ''}`}>
            {screen.components.map(component => (
              <div
                key={component.id}
                style={component.props.style}
                className="absolute"
              >
                <ComponentPreview type={component.type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
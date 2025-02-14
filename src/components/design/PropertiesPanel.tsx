import React from 'react';
import { useAppStore } from '../../store';
import { ChevronDown } from 'lucide-react';

export const PropertiesPanel = () => {
  const { selectedScreen, currentProject, updateScreen } = useAppStore();
  
  const screen = currentProject?.screens.find(s => s.id === selectedScreen);
  
  if (!screen) return null;
  
  const handleSettingChange = (key: string, value: any) => {
    updateScreen(screen.id, {
      settings: {
        ...screen.settings,
        [key]: value,
      },
    });
  };

  return (
    <div className="h-full w-72 bg-white border-l">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">{screen.name}</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scrollable
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={screen.settings.scrollable}
                onChange={(e) => handleSettingChange('scrollable', e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={screen.settings.backgroundColor}
              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
              className="h-8 w-full rounded border"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orientation
            </label>
            <select
              value={screen.settings.orientation}
              onChange={(e) => handleSettingChange('orientation', e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
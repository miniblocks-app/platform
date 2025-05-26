import { useAppStore } from '../../store';
import { ChevronDown } from 'lucide-react';
import { ComponentType, Screen, ComponentData } from '../../types';
import { TooltipIcon, TOOLTIP_DESCRIPTIONS } from '../ui/TooltipIcon';
import React, { ChangeEvent } from 'react';

interface CommonPropertiesProps {
  style: ComponentData['props']['style'];
  text?: string;
  onStyleChange: (updates: Partial<ComponentData['props']['style']>) => void;
  onTextChange?: (text: string) => void;
  tooltipsEnabled?: boolean;
}

const CommonProperties = ({
  style,
  text,
  onStyleChange,
  onTextChange,
  tooltipsEnabled
}: CommonPropertiesProps) => (
  <div className="space-y-4">
    {onTextChange && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          Text
          {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS.Text} />}
        </label>
        <input
          type="text"
          value={text || ''}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )}
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        Color
        {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS.Color} />}
      </label>
      <input
        type="color"
        value={style?.color || '#000000'}
        onChange={(e) => onStyleChange({ color: e.target.value })}
        className="h-8 w-full rounded border"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        Background Color
        {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Background Color"]} />}
      </label>
      <input
        type="color"
        value={style?.backgroundColor || '#ffffff'}
        onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
        className="h-8 w-full rounded border"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        Opacity
        {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS.Opacity} />}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={style?.opacity || 1}
        onChange={(e) => onStyleChange({ opacity: parseFloat(e.target.value) })}
        className="w-full"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        Padding
        {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS.Padding} />}
      </label>
      <input
        type="text"
        value={style?.padding || '0px'}
        onChange={(e) => onStyleChange({ padding: e.target.value })}
        placeholder="e.g., 8px or 8px 16px"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        Font Size
        {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Font Size"]} />}
      </label>
      <input
        type="text"
        value={style?.fontSize || '16px'}
        onChange={(e) => onStyleChange({ fontSize: e.target.value })}
        placeholder="e.g., 16px or 1rem"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

interface ComponentSpecificPropertiesProps {
  type: ComponentType;
  props: ComponentData['props'];
  onChange: (updates: Partial<ComponentData['props']>) => void;
  tooltipsEnabled?: boolean;
}

const ComponentSpecificProperties = ({
  type,
  props,
  onChange,
  tooltipsEnabled
}: ComponentSpecificPropertiesProps) => {
  switch (type) {
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Button Style
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Button Style"]} />}
            </label>
            <select
              value={props.variant || 'filled'}
              onChange={(e) => onChange({ variant: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
              <option value="text">Text</option>
            </select>
          </div>
        </div>
      );
      
    case 'input':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Placeholder
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS.Placeholder} />}
            </label>
            <input
              type="text"
              value={props.placeholder || ''}
              onChange={(e) => onChange({ placeholder: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      );
      
    case 'dropdown':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Options (one per line)
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Options (one per line)"]} />}
            </label>
            <textarea
              value={(props.options || []).join('\n')}
              onChange={(e) => onChange({ options: e.target.value.split('\n') })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>
      );
      
    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Upload Image
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Upload Image"]} />}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    onChange({ src: ev.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {props.src && (
              <div className="mt-2 relative">
                <img src={props.src} alt="Preview" className="w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 border border-gray-300 hover:bg-red-100"
                  onClick={() => onChange({ src: undefined })}
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      );
      
    case 'slider':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Min Value
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Min Value"]} />}
            </label>
            <input
              type="number"
              value={props.min || 0}
              onChange={(e) => onChange({ min: parseInt(e.target.value, 10) })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Max Value
              {tooltipsEnabled && <TooltipIcon description={TOOLTIP_DESCRIPTIONS["Max Value"]} />}
            </label>
            <input
              type="number"
              value={props.max || 100}
              onChange={(e) => onChange({ max: parseInt(e.target.value, 10) })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

interface PropertiesPanelProps {
  tooltipsEnabled?: boolean;
}

export const PropertiesPanel = ({ tooltipsEnabled }: PropertiesPanelProps) => {
  const { 
    selectedScreen, 
    selectedComponent,
    currentProject, 
    updateScreen,
    updateComponent
  } = useAppStore();
  
  const screen = currentProject?.screens.find(s => s.id === selectedScreen) as Screen | undefined;
  const component = screen?.components.find(c => c.id === selectedComponent) as ComponentData | undefined;
  
  const handleScreenSettingChange = (key: keyof Screen['settings'], value: any) => {
    if (!selectedScreen || !screen) return;
    updateComponent(selectedScreen, selectedScreen, { 
      settings: {
        ...screen.settings,
        [key]: value,
      }
    } as any);
  };

  const handleComponentStyleChange = (updates: Partial<ComponentData['props']['style']>) => {
    if (!selectedScreen || !selectedComponent || !component) return;
    updateComponent(selectedScreen, selectedComponent, {
      props: {
        ...component.props,
        style: {
          ...(component.props.style || {}),
          ...updates,
        },
      }
    });
  };

  const handleComponentPropChange = (updates: Partial<ComponentData['props']>) => {
    if (!selectedScreen || !selectedComponent || !component) return;
    updateComponent(selectedScreen, selectedComponent, {
      props: {
        ...component.props,
        ...updates,
      }
    });
  };

  if (!selectedScreen) {
    return (
      <div className="w-64 bg-gray-50 p-4 border-l flex-shrink-0 overflow-y-auto text-gray-600 text-sm">
        Select a screen or component to edit properties.
      </div>
    );
  }

  const screenComponentData = screen ? { 
    id: screen.id, 
    type: 'screen' as ComponentType,
    props: { style: screen.settings as any }
  } : undefined;

  return (
    <div className="w-64 bg-white p-4 border-l flex-shrink-0 overflow-y-auto right-panel-scroll">
      <h2 className="text-lg font-semibold mb-4">
        {selectedComponent ? `${component?.type} Properties` : 'Screen Properties'}
      </h2>

      {selectedComponent ? (
        <>
          <CommonProperties
            style={component.props.style}
            text={component.props.text}
            onStyleChange={handleComponentStyleChange}
            onTextChange={handleComponentPropChange}
            tooltipsEnabled={tooltipsEnabled}
          />
          <div className="mt-6 pt-4 border-t">
            <ComponentSpecificProperties
              type={component.type}
              props={component.props}
              onChange={handleComponentPropChange}
              tooltipsEnabled={tooltipsEnabled}
            />
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Scrollable
              {tooltipsEnabled && <TooltipIcon description="Enables or disables scrolling for the screen." />}
            </label>
            <input
              type="checkbox"
              checked={screen.settings.scrollable}
              onChange={(e) => handleScreenSettingChange('scrollable', e.target.checked)}
              className="mr-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Background Color
              {tooltipsEnabled && <TooltipIcon description="Sets the background color of the screen." />}
            </label>
            <input
              type="color"
              value={screen.settings.backgroundColor || '#ffffff'}
              onChange={(e) => handleScreenSettingChange('backgroundColor', e.target.value)}
              className="h-8 w-full rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              Orientation
              {tooltipsEnabled && <TooltipIcon description="Sets the screen orientation." />}
            </label>
            <select
              value={screen.settings.orientation}
              onChange={(e) => handleScreenSettingChange('orientation', e.target.value as 'portrait' | 'landscape')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
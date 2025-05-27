import { useAppStore } from '../../store';
import { ChevronDown } from 'lucide-react';
import { ComponentType } from '../../types';

const CommonProperties = ({ 
  style,
  text,
  onStyleChange,
  onTextChange 
}: { 
  style: any;
  text?: string;
  onStyleChange: (updates: any) => void;
  onTextChange?: (text: string) => void;
}) => (
  <div className="space-y-4">
    {onTextChange && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Color
      </label>
      <input
        type="color"
        value={style.color || '#000000'}
        onChange={(e) => onStyleChange({ color: e.target.value })}
        className="h-8 w-full rounded border"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Background Color
      </label>
      <input
        type="color"
        value={style.backgroundColor || '#ffffff'}
        onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
        className="h-8 w-full rounded border"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Opacity
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={style.opacity || 1}
        onChange={(e) => onStyleChange({ opacity: e.target.value })}
        className="w-full"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Padding
      </label>
      <input
        type="text"
        value={style.padding || '0px'}
        onChange={(e) => onStyleChange({ padding: e.target.value })}
        placeholder="e.g., 8px or 8px 16px"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Font Size
      </label>
      <input
        type="text"
        value={style.fontSize || '16px'}
        onChange={(e) => onStyleChange({ fontSize: e.target.value })}
        placeholder="e.g., 16px or 1rem"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

const ComponentSpecificProperties = ({
  type,
  props,
  onChange
}: {
  type: ComponentType;
  props: any;
  onChange: (updates: any) => void;
}) => {
  switch (type) {
    case 'healthbar':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Health
            </label>
            <input
              type="number"
              min="0"
              max={props.max || 100}
              value={props.value || 75}
              onChange={(e) => onChange({ value: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Health
            </label>
            <input
              type="number"
              min="1"
              value={props.max || 100}
              onChange={(e) => onChange({ max: parseInt(e.target.value) || 100 })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show Heart Icon
            </label>
            <input
              type="checkbox"
              checked={props.showIcon !== false}
              onChange={(e) => onChange({ showIcon: e.target.checked })}
              className="rounded focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show HP Text
            </label>
            <input
              type="checkbox"
              checked={props.showText !== false}
              onChange={(e) => onChange({ showText: e.target.checked })}
              className="rounded focus:ring-blue-500"
            />
          </div>
        </div>
      );
    
    case 'scoreboard':{
      const scores = props.scores || [
        { name: 'Player 1', score: 2500 },
        { name: 'Player 2', score: 1800 },
        { name: 'Player 3', score: 1200 }
      ];
      
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={props.title || 'SCOREBOARD'}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Players
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={props.maxPlayers || 3}
              onChange={(e) => onChange({ maxPlayers: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Players & Scores
            </label>
            {scores.slice(0, props.maxPlayers || 3).map((player, index) => (
              <div key={index} className="mb-3 p-3 border rounded-md bg-gray-50">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">Player {index + 1}</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Player name"
                    value={player.name}
                    onChange={(e) => {
                      const newScores = [...scores];
                      newScores[index] = { ...newScores[index], name: e.target.value };
                      onChange({ scores: newScores });
                    }}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Score"
                    value={player.score}
                    onChange={(e) => {
                      const newScores = [...scores];
                      newScores[index] = { ...newScores[index], score: parseInt(e.target.value) || 0 };
                      onChange({ scores: newScores });
                    }}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show Rankings
            </label>
            <input
              type="checkbox"
              checked={props.showRankings !== false}
              onChange={(e) => onChange({ showRankings: e.target.checked })}
              className="rounded focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show Trophy Icon
            </label>
            <input
              type="checkbox"
              checked={props.showTrophy !== false}
              onChange={(e) => onChange({ showTrophy: e.target.checked })}
              className="rounded focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ranking Style
            </label>
            <select
              value={props.rankingStyle || 'medals'}
              onChange={(e) => onChange({ rankingStyle: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="medals">Medals (1st, 2nd, 3rd)</option>
              <option value="numbers">Numbers Only</option>
              <option value="none">No Rankings</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score Format
            </label>
            <select
              value={props.scoreFormat || 'number'}
              onChange={(e) => onChange({ scoreFormat: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="number">Number (1000)</option>
              <option value="comma">Comma Separated (1,000)</option>
              <option value="abbreviated">Abbreviated (1K)</option>
            </select>
          </div>
        </div>
      );}
      
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Style
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options (one per line)
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
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
      
    default:
      return null;
  }
};

export const PropertiesPanel = () => {
  const { 
    selectedScreen, 
    selectedComponent,
    currentProject, 
    updateScreen,
    updateComponent
  } = useAppStore();
  
  const screen = currentProject?.screens.find(s => s.id === selectedScreen);
  const component = screen?.components.find(c => c.id === selectedComponent);
  
  const handleScreenSettingChange = (key: string, value: any) => {
    if (!screen) return;
    updateScreen(screen.id, {
      settings: {
        ...screen.settings,
        [key]: value,
      },
    } as Partial<import('../../types').Screen>);
  };

  const handleComponentStyleChange = (updates: any) => {
    if (!screen || !component) return;
    updateComponent(screen.id, component.id, {
      props: {
        ...component.props,
        style: {
          ...component.props.style,
          ...updates,
        },
      },
    } as Partial<import('../../types').ComponentData>);
  };

  const handleComponentPropChange = (updates: any) => {
    if (!screen || !component) return;
    updateComponent(screen.id, component.id, {
      props: {
        ...component.props,
        ...updates,
      },
    } as Partial<import('../../types').ComponentData>);
  };

  if (!screen) return null;

  return (
    <div className="h-full w-72 bg-white border-l flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">
            {component ? 'Component Properties' : 'Screen Properties'}
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {component ? (
            <>
              <CommonProperties
                style={component.props.style || {}}
                text={component.props.text}
                onStyleChange={handleComponentStyleChange}
                onTextChange={(text) => handleComponentPropChange({ text })}
              />
              <div className="mt-6">
                <ComponentSpecificProperties
                  type={component.type}
                  props={component.props}
                  onChange={handleComponentPropChange}
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scrollable
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={screen.settings.scrollable}
                    onChange={(e) => handleScreenSettingChange('scrollable', e.target.checked)}
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
                  onChange={(e) => handleScreenSettingChange('backgroundColor', e.target.value)}
                  className="h-8 w-full rounded border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Orientation
                </label>
                <select
                  value={screen.settings.orientation}
                  onChange={(e) => handleScreenSettingChange('orientation', e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
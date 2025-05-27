import React, { useState } from 'react';
import { ComponentType } from '../../types';
import { Info } from 'lucide-react';

interface ComponentPreviewProps {
  type: ComponentType;
  props?: {
    style?: React.CSSProperties;
    text?: string;
    value?: string | number;
    options?: string[];
    checked?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    src?: string;
  };
  tooltipsEnabled?: boolean;
}

// Update the TOOLTIP_DESCRIPTIONS object
const TOOLTIP_DESCRIPTIONS: Record<ComponentType, string> = {
  button: 'A clickable button to perform actions.',
  text: 'Displays static or dynamic text.',
  image: 'Shows an image or icon.',
  spacer: 'Adds empty space between components.',
  input: 'A field for user text input.',
  counter: 'A numeric input with increment/decrement.',
  dropdown: 'A menu to select one option from a list.',
  radio: 'A single selectable option in a group.',
  checkbox: 'A box that can be checked or unchecked.',
  slider: 'A draggable bar for selecting a value.',
  circle: 'A circular shape.',
  line: 'A straight line shape.',
  rectangle: 'A rectangular shape.',
  square: 'A square shape.',
  star: 'A star shape.',
  scoreboard: 'Displays player scores and rankings in a game.',
  healthbar: 'Shows player health/HP with visual bar indicator.',
  timer: 'Displays countdown or elapsed time for games.',
  minimap: 'Shows a small overview map for navigation.',
  pausemenu: 'Game pause overlay with resume/quit options.',
  levelindicator: 'Shows current level and progress to next level.'
};

function TooltipIcon({ description }: { description: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block', marginLeft: 4, cursor: 'pointer' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Info size={16} style={{ color: '#2563eb', verticalAlign: 'middle' }} />
      {show && (
        <span
          style={{
            position: 'absolute',
            left: '120%',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#333',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 13,
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {description}
        </span>
      )}
    </span>
  );
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ type, props = {}, tooltipsEnabled }) => {
  const [counterValue, setCounterValue] = useState(0);
  const [timerValue, setTimerValue] = useState(0);
  
  // Timer effect for demo purposes
  React.useEffect(() => {
    if (type === 'timer') {
      const interval = setInterval(() => {
        setTimerValue(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [type]);
  
  const style = props.style || {};
  const tooltip = tooltipsEnabled ? <TooltipIcon description={TOOLTIP_DESCRIPTIONS[type]} /> : null;
  
  switch (type) {
    case 'button':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <button 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            style={{
              backgroundColor: style.backgroundColor || '#3B82F6',
              color: style.color || '#FFFFFF',
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
          >
            {props.text || 'Button'}
          </button>
          {tooltip}
        </span>
      );
      
    case 'text':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{
            color: style.color,
            backgroundColor: style.backgroundColor,
            opacity: style.opacity,
            padding: style.padding,
            fontSize: style.fontSize,
          }}>
            {props.text || 'Text'}
          </p>
          {tooltip}
        </span>
      );
      
    case 'image':{
      const [preview, setPreview] = useState(props.src || null);
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setPreview(ev.target?.result as string);
            if (props && typeof props === 'object') {
              props.src = ev.target?.result as string;
            }
          };
          reader.readAsDataURL(file);
        }
      };
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div 
            className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors relative overflow-hidden"
            style={{
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            {preview ? (
              <img src={preview} alt="Uploaded" className="object-cover w-full h-full" />
            ) : (
              <span style={{ color: style.color, fontSize: style.fontSize }}>Image</span>
            )}
            <label className="absolute bottom-1 right-1 bg-white bg-opacity-80 rounded-full p-1 cursor-pointer shadow hover:bg-opacity-100 transition-all border border-gray-300">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m4.5 4.5h-9" />
              </svg>
            </label>
          </div>
          {tooltip}
        </span>
      );}
      
    case 'spacer':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div 
            className="bg-gray-100 border border-dashed border-gray-300 rounded"
            style={{ 
              width: '100px', 
              height: '20px',
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
            }}
          />
          {tooltip}
        </span>
      );
      
    case 'input':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder={props.placeholder || "Enter text..."}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              color: style.color,
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
            value={props.value || ''}
            readOnly
          />
          {tooltip}
        </span>
      );
      
    case 'counter':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div 
            className="flex items-center space-x-2"
            style={{
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <button 
              className="px-3 py-1 bg-gray-200 rounded-md"
              style={{
                color: style.color,
                backgroundColor: style.backgroundColor,
                fontSize: style.fontSize,
              }}
              onClick={() => setCounterValue(prev => prev - 1)}
            >
              -
            </button>
            <span style={{ color: style.color, fontSize: style.fontSize }}>{counterValue}</span>
            <button 
              className="px-3 py-1 bg-gray-200 rounded-md"
              style={{
                color: style.color,
                backgroundColor: style.backgroundColor,
                fontSize: style.fontSize,
              }}
              onClick={() => setCounterValue(prev => prev + 1)}
            >
              +
            </button>
          </div>
          {tooltip}
        </span>
      );
      
    case 'dropdown':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <select 
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              color: style.color,
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
          >
            {(props.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          {tooltip}
        </span>
      );
      
    case 'radio':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <label 
            className="flex items-center space-x-2"
            style={{
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <input type="radio" checked={props.checked || false} readOnly />
            <span style={{ color: style.color, fontSize: style.fontSize }}>
              {props.text || 'Radio Option'}
            </span>
          </label>
          {tooltip}
        </span>
      );
      
    case 'checkbox':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <label 
            className="flex items-center space-x-2"
            style={{
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <input type="checkbox" checked={props.checked || false} readOnly />
            <span style={{ color: style.color, fontSize: style.fontSize }}>
              {props.text || 'Checkbox'}
            </span>
          </label>
          {tooltip}
        </span>
      );
      
    case 'slider':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div 
            className="flex flex-col space-y-2"
            style={{
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <input
              type="range"
              min={props.min || 0}
              max={props.max || 100}
              value={props.value || 50}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: style.color || '#3B82F6',
              }}
              readOnly
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{props.min || 0}</span>
              <span>{props.max || 100}</span>
            </div>
          </div>
          {tooltip}
        </span>
      );
      
    case 'circle':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            className="rounded-full"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              border: `2px solid ${style.color || '#000000'}`,
              opacity: style.opacity,
            }}
          />
          {tooltip}
        </span>
      );
      
    case 'line':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              width: '100px',
              height: '2px',
              backgroundColor: style.color || '#000000',
              opacity: style.opacity,
            }}
          />
          {tooltip}
        </span>
      );
      
    case 'rectangle':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              width: '100px',
              height: '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              border: `2px solid ${style.color || '#000000'}`,
              opacity: style.opacity,
            }}
          />
          {tooltip}
        </span>
      );
      
    case 'square':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              border: `2px solid ${style.color || '#000000'}`,
              opacity: style.opacity,
            }}
          />
          {tooltip}
        </span>
      );
      
    case 'star':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              position: 'relative',
              opacity: style.opacity,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={style.backgroundColor || '#3B82F6'}
              stroke={style.color || '#000000'}
              strokeWidth="2"
              style={{ width: '100%', height: '100%' }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          {tooltip}
        </span>
      );
      
    case 'scoreboard':
      { const scores = props.scores || [
        { name: 'Player 1', score: 2500 },
        { name: 'Player 2', score: 1800 },
        { name: 'Player 3', score: 1200 }
      ];
      
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || '#1F2937',
              color: style.color || '#FFFFFF',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #374151',
              minWidth: '200px',
              opacity: style.opacity,
              fontSize: style.fontSize || '14px',
            }}
          >
            <div style={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              marginBottom: '8px',
              fontSize: '16px',
              borderBottom: '1px solid #374151',
              paddingBottom: '6px'
            }}>
              🏆 SCOREBOARD
            </div>
            {scores.map((player, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 0',
                  borderBottom: index < scores.length - 1 ? '1px solid #374151' : 'none'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                    color: '#000',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginRight: '8px'
                  }}>
                    {index + 1}
                  </span>
                  {player.name}
                </span>
                <span style={{ fontWeight: 'bold' }}>
                  {player.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          {tooltip}
        </span>
      ); }
      
    case 'healthbar':{
      const currentHealth = props.value || 75;
      const maxHealth = props.max || 100;
      const healthPercentage = (currentHealth / maxHealth) * 100;
      
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || '#2D1B69',
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid #1E1B4B',
              minWidth: '180px',
              opacity: style.opacity,
              fontSize: style.fontSize || '14px',
            }}
          >
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px',
              color: style.color || '#FFFFFF'
            }}>
              <span style={{ marginRight: '8px' }}>❤️</span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                HP: {currentHealth}/{maxHealth}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '16px',
              backgroundColor: '#4B5563',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #374151'
            }}>
              <div style={{
                width: `${healthPercentage}%`,
                height: '100%',
                background: healthPercentage > 60 
                  ? 'linear-gradient(90deg, #10B981, #059669)' 
                  : healthPercentage > 30 
                    ? 'linear-gradient(90deg, #F59E0B, #D97706)'
                    : 'linear-gradient(90deg, #EF4444, #DC2626)',
                transition: 'width 0.3s ease',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  animation: healthPercentage > 0 ? 'shimmer 2s infinite' : 'none'
                }} />
              </div>
            </div>
          </div>
          {tooltip}
        </span>
      );}
      
    case 'timer':{
      const timerMode = props.mode || 'countdown'; // 'countdown' or 'stopwatch'
      const initialTime = props.value || 300; // 5 minutes default
      const displayTime = timerMode === 'countdown' 
        ? Math.max(0, initialTime - timerValue) 
        : timerValue;
      
      const minutes = Math.floor(displayTime / 60);
      const seconds = displayTime % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      const isLowTime = timerMode === 'countdown' && displayTime <= 30 && displayTime > 0;
      const isTimeUp = timerMode === 'countdown' && displayTime === 0;
      
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || '#0F172A',
              color: style.color || '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '12px',
              border: `3px solid ${isTimeUp ? '#DC2626' : isLowTime ? '#F59E0B' : '#1E293B'}`,
              minWidth: '140px',
              textAlign: 'center',
              opacity: style.opacity,
              fontSize: style.fontSize || '16px',
              boxShadow: isLowTime ? '0 0 20px rgba(245, 158, 11, 0.5)' : 'none',
              animation: isTimeUp ? 'pulse 1s infinite' : 'none'
            }}
          >
            <div style={{ 
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '4px',
              color: isTimeUp ? '#DC2626' : isLowTime ? '#F59E0B' : '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {isTimeUp ? '⏰ TIME UP!' : timerMode === 'countdown' ? '⏱️ COUNTDOWN' : '⏱️ TIMER'}
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: isTimeUp ? '#DC2626' : isLowTime ? '#F59E0B' : style.color || '#FFFFFF',
              textShadow: isLowTime ? '0 0 10px rgba(245, 158, 11, 0.8)' : 'none'
            }}>
              {formattedTime}
            </div>
            {timerMode === 'countdown' && (
              <div style={{
                marginTop: '6px',
                fontSize: '10px',
                color: '#64748B'
              }}>
                {isTimeUp ? 'GAME OVER' : `${Math.floor((displayTime / initialTime) * 100)}% remaining`}
              </div>
            )}
          </div>
          {tooltip}
        </span>
      );}
      
    case 'minimap':{
      const playerPosition = props.playerPosition || { x: 40, y: 60 };
      const enemies = props.enemies || [
        { x: 20, y: 30 },
        { x: 70, y: 20 },
        { x: 80, y: 80 }
      ];
      const objectives = props.objectives || [
        { x: 10, y: 10 },
        { x: 90, y: 90 }
      ];
      
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || '#111827',
              padding: '8px',
              borderRadius: '8px',
              border: '2px solid #374151',
              minWidth: '120px',
              minHeight: '120px',
              opacity: style.opacity,
              position: 'relative'
            }}
          >
            <div style={{ 
              fontSize: '10px',
              fontWeight: 'bold',
              marginBottom: '6px',
              color: style.color || '#9CA3AF',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🗺️ MAP
            </div>
            
            {/* Map container */}
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#1F2937',
              border: '1px solid #4B5563',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Grid pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(rgba(75, 85, 99, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 85, 99, 0.3) 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }} />
              
              {/* Terrain/obstacles */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '25%',
                height: '15%',
                backgroundColor: '#059669',
                borderRadius: '2px'
              }} />
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '20%',
                width: '20%',
                height: '20%',
                backgroundColor: '#7C2D12',
                borderRadius: '2px'
              }} />
              
              {/* Objectives */}
              {objectives.map((obj, index) => (
                <div
                  key={`obj-${index}`}
                  style={{
                    position: 'absolute',
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#FBBF24',
                    borderRadius: '50%',
                    border: '1px solid #F59E0B',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse 2s infinite'
                  }}
                />
              ))}
              
              {/* Enemies */}
              {enemies.map((enemy, index) => (
                <div
                  key={`enemy-${index}`}
                  style={{
                    position: 'absolute',
                    left: `${enemy.x}%`,
                    top: `${enemy.y}%`,
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#DC2626',
                    borderRadius: '50%',
                    border: '1px solid #B91C1C',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              {/* Player position */}
              <div
                style={{
                  position: 'absolute',
                  left: `${playerPosition.x}%`,
                  top: `${playerPosition.y}%`,
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)'
                }}
              />
              
              {/* Compass */}
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: '#FFFFFF',
                fontWeight: 'bold'
              }}>
                N
              </div>
            </div>
            
            {/* Legend */}
            <div style={{
              marginTop: '4px',
              fontSize: '8px',
              color: '#6B7280',
              display: 'flex',
              justifyContent: 'space-around'
            }}>
              <span>🔵 You</span>
              <span>🔴 Enemy</span>
              <span>🟡 Goal</span>
            </div>
          </div>
          {tooltip}
        </span>
      );}
      
    case 'pausemenu':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || 'rgba(0, 0, 0, 0.9)',
              color: style.color || '#FFFFFF',
              padding: '20px',
              borderRadius: '12px',
              border: '3px solid #374151',
              minWidth: '200px',
              opacity: style.opacity,
              fontSize: style.fontSize || '14px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#F59E0B',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              ⏸️ PAUSED
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <button style={{
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                ▶️ RESUME
              </button>
              
              <button style={{
                backgroundColor: '#6B7280',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                ⚙️ SETTINGS
              </button>
              
              <button style={{
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                🚪 QUIT GAME
              </button>
            </div>
            
            <div style={{
              marginTop: '16px',
              fontSize: '10px',
              color: '#9CA3AF',
              borderTop: '1px solid #374151',
              paddingTop: '12px'
            }}>
              Press ESC to resume
            </div>
          </div>
          {tooltip}
        </span>
      );
      
    case 'levelindicator':{
      const currentLevel = props.value || 5;
      const currentXP = props.currentXP || 750;
      const nextLevelXP = props.nextLevelXP || 1000;
      const xpProgress = (currentXP / nextLevelXP) * 100;
      
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: style.backgroundColor || '#1F2937',
              color: style.color || '#FFFFFF',
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid #4B5563',
              minWidth: '180px',
              opacity: style.opacity,
              fontSize: style.fontSize || '14px',
            }}
          >
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>⭐</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  LEVEL {currentLevel}
                </span>
              </div>
              <div style={{
                backgroundColor: '#4B5563',
                color: '#F59E0B',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {currentXP}/{nextLevelXP} XP
              </div>
            </div>
            
            <div style={{
              width: '100%',
              height: '12px',
              backgroundColor: '#374151',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #4B5563',
              marginBottom: '6px'
            }}>
              <div style={{
                width: `${xpProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                transition: 'width 0.5s ease',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite'
                }} />
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              color: '#9CA3AF'
            }}>
              <span>{Math.round(xpProgress)}% to Level {currentLevel + 1}</span>
              <span>+{nextLevelXP - currentXP} XP needed</span>
            </div>
          </div>
          {tooltip}
        </span>
      );}
      
    default:
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span>{type}</span>
          {tooltip}
        </span>
      );
  }
};

// Update CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);
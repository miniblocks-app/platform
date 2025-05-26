import React, { useState } from 'react';
import { ComponentType } from '../../types';
import { TooltipIcon, TOOLTIP_DESCRIPTIONS } from '../ui/TooltipIcon';

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
    variant?: 'filled' | 'outlined' | 'text';
  };
  tooltipsEnabled?: boolean;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ type, props = {}, tooltipsEnabled }) => {
  const [counterValue, setCounterValue] = useState(0);
  const style = props.style || {};
  const [showTooltip, setShowTooltip] = useState(false);
  
  const renderComponentElement = () => {
    switch (type) {
      case 'button':
        return (
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
        );
        
      case 'text':
        return (
          <p style={{
            color: style.color,
            backgroundColor: style.backgroundColor,
            opacity: style.opacity,
            padding: style.padding,
            fontSize: style.fontSize,
          }}>
            {props.text || 'Text'}
          </p>
        );
        
      case 'image':
        const [preview, setPreview] = useState(props.src || null);
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              setPreview(ev.target?.result as string);
              if (props && typeof props === 'object') {
                (props as any).src = ev.target?.result as string;
              }
            };
            reader.readAsDataURL(file);
          }
        };
        return (
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
        );
        
      case 'spacer':
        return (
          <div
            className="bg-gray-100 border border-dashed border-gray-300 rounded"
            style={{ 
              width: style.width || '100px', 
              height: style.height || '20px',
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
            }}
          />
        );
        
      case 'input':
        return (
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
            value={props.value as string || ''}
            readOnly
          />
        );
        
      case 'counter':
        return (
          <div
            className="flex items-center space-x-2"
            style={{
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <button
              className="px-2 py-1 bg-gray-200 rounded-l-md"
              onClick={() => setCounterValue(prev => Math.max(0, prev - 1))}
            >
              -
            </button>
            <span className="px-2 py-1 border-t border-b">
              {counterValue}
            </span>
            <button
              className="px-2 py-1 bg-gray-200 rounded-r-md"
              onClick={() => setCounterValue(prev => prev + 1)}
            >
              +
            </button>
          </div>
        );
        
      case 'dropdown':
        return (
          <select
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              color: style.color,
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
            value={props.value as string}
            onChange={() => { /* Prevent interaction in preview */ }}
          >
            {(props.options || []).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        
      case 'radio':
        return (
          <label 
            className="flex items-center space-x-2"
            style={{
              color: style.color,
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
          >
            <input
              type="radio"
              checked={props.checked}
              onChange={() => { /* Prevent interaction in preview */ }}
              className="form-radio"
            />
            <span>Radio</span>
          </label>
        );
        
      case 'checkbox':
        return (
          <label 
            className="flex items-center space-x-2"
            style={{
              color: style.color,
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
              fontSize: style.fontSize,
            }}
          >
            <input
              type="checkbox"
              checked={props.checked}
              onChange={() => { /* Prevent interaction in preview */ }}
              className="form-checkbox"
            />
            <span>Checkbox</span>
          </label>
        );
        
      case 'slider':
        return (
          <div
            className="flex flex-col space-y-2"
            style={{
              backgroundColor: style.backgroundColor,
              opacity: style.opacity,
              padding: style.padding,
            }}
          >
            <input
              type="range"
              min={props.min || 0}
              max={props.max || 100}
              value={props.value as number || 50}
              onChange={() => { /* Prevent interaction in preview */ }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{props.min || 0}</span>
              <span>{props.max || 100}</span>
            </div>
          </div>
        );
        
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: style.width || '50px',
              height: style.height || '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              opacity: style.opacity,
            }}
          />
        );
        
      case 'line':
        return (
          <div
            style={{
              width: style.width || '100px',
              height: style.height || '2px',
              backgroundColor: style.backgroundColor || '#000000',
              opacity: style.opacity,
            }}
          />
        );
        
      case 'rectangle':
        return (
          <div
            style={{
              width: style.width || '100px',
              height: style.height || '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              opacity: style.opacity,
            }}
          />
        );
        
      case 'square':
        return (
          <div
            style={{
              width: style.width || '50px',
              height: style.height || '50px',
              backgroundColor: style.backgroundColor || '#3B82F6',
              opacity: style.opacity,
            }}
          />
        );
        
      case 'star':
        return (
          <div style={{ 
            width: style.width || '50px', 
            height: style.height || '50px', 
            opacity: style.opacity,
          }}>
            <svg viewBox="0 0 24 24" fill={style.color || '#FFD700'} stroke="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
            </svg>
          </div>
        );
        
      default:
        return (
          <span>{type}</span>
        );
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => tooltipsEnabled && setShowTooltip(true)}
      onMouseLeave={() => tooltipsEnabled && setShowTooltip(false)}
    >
      {renderComponentElement()}
      {showTooltip && tooltipsEnabled && TOOLTIP_DESCRIPTIONS[type as ComponentType] && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '100%',
            transform: 'translateX(-50%) translateY(5px)',
            background: '#333',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 13,
            whiteSpace: 'nowrap',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {TOOLTIP_DESCRIPTIONS[type as ComponentType]}
        </span>
      )}
    </div>
  );
};
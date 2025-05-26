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
  star: 'A star shape.'
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
      
    case 'image':
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
      );
      
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
      
    default:
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span>{type}</span>
          {tooltip}
        </span>
      );
  }
};
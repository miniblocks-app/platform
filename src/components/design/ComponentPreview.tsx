import React, { useState } from 'react';
import { ComponentType } from '../../types';

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
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ type, props = {} }) => {
  const [counterValue, setCounterValue] = useState(0);
  const style = props.style || {};
  
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
              props.src = ev.target?.result as string;
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
            width: '100px', 
            height: '20px',
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
          value={props.value || ''}
          readOnly
        />
      );
      
    case 'counter':
      return (
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
        >
          {(props.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      );
      
    case 'radio':
      return (
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
      );
      
    case 'checkbox':
      return (
        <label 
          className="flex items-center space-x-2"
          style={{
            opacity: style.opacity,
            padding: style.padding,
          }}
        >
          <input type="checkbox" checked={props.checked || false} readOnly />
          <span style={{ color: style.color, fontSize: style.fontSize }}>
            {props.text || 'Checkbox Option'}
          </span>
        </label>
      );
      
    case 'slider':
      return (
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
      );
      
    case 'circle':
      return (
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
      );
      
    case 'line':
      return (
        <div
          style={{
            width: '100px',
            height: '2px',
            backgroundColor: style.color || '#000000',
            opacity: style.opacity,
          }}
        />
      );
      
    case 'rectangle':
      return (
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: style.backgroundColor || '#3B82F6',
            border: `2px solid ${style.color || '#000000'}`,
            opacity: style.opacity,
          }}
        />
      );
      
    case 'square':
      return (
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: style.backgroundColor || '#3B82F6',
            border: `2px solid ${style.color || '#000000'}`,
            opacity: style.opacity,
          }}
        />
      );
      
    case 'star':
      return (
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
      );
      
    default:
      return null;
  }
};
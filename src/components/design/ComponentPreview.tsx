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
      return (
        <div 
          className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
          style={{
            backgroundColor: style.backgroundColor,
            opacity: style.opacity,
            padding: style.padding,
          }}
        >
          <span style={{ color: style.color, fontSize: style.fontSize }}>Image</span>
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
      
    default:
      return null;
  }
};
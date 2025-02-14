import React from 'react';
import { ComponentType } from '../../types';

interface ComponentPreviewProps {
  type: ComponentType;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ type }) => {
  switch (type) {
    case 'button':
      return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Button
        </button>
      );
    case 'text':
      return <p className="text-gray-800">Text</p>;
    case 'image':
      return (
        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>
      );
    default:
      return null;
  }
};
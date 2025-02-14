import React, { useState } from 'react';
import { Type, Image, Donut, Search } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType } from '../../types';
import clsx from 'clsx';

interface ComponentItemProps {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
}

const COMPONENTS: ComponentItemProps[] = [
  {
    type: 'button',
    label: 'Button',
    icon: <Donut className="w-6 h-6 text-gray-600" />,
  },
  {
    type: 'text',
    label: 'Text',
    icon: <Type className="w-6 h-6 text-gray-600" />,
  },
  {
    type: 'image',
    label: 'Image',
    icon: <Image className="w-6 h-6 text-gray-600" />,
  },
];

const ComponentItem = ({ type, label, icon }: ComponentItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `component-${type}`,
    data: {
      type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        'flex flex-col items-center p-4 border rounded-lg cursor-move hover:bg-gray-50',
        isDragging && 'opacity-50'
      )}
    >
      {icon}
      <span className="mt-2 text-sm text-gray-600">{label}</span>
    </div>
  );
};

export const ComponentPalette = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = COMPONENTS.filter(component =>
    component.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border-t">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-700 mb-3">Add Components</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredComponents.map((component) => (
          <ComponentItem
            key={component.type}
            type={component.type}
            label={component.label}
            icon={component.icon}
          />
        ))}
        {filteredComponents.length === 0 && (
          <div className="col-span-2 text-center py-4 text-gray-500 text-sm">
            No components found
          </div>
        )}
      </div>
    </div>
  );
};
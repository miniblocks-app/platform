import React, { useState } from 'react';
import { Type, Image, Search, Square, FileInput as InputIcon, Plus, Minus, List, CircleDot, CheckSquare, Donut, Circle, Minus as LineIcon, Box as RectangleIcon, Star, SlidersHorizontal, Trophy, Heart, Timer, Map, Pause, BarChart3 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType, ComponentSection } from '../../types';
import clsx from 'clsx';

const COMPONENT_SECTIONS: ComponentSection[] = [
  {
    title: 'General',
    components: [
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
      {
        type: 'spacer',
        label: 'Spacer',
        icon: <Square className="w-6 h-6 text-gray-600" />,
      },
    ],
  },
  {
    title: 'Form Elements',
    components: [
      {
        type: 'input',
        label: 'Input Field',
        icon: <InputIcon className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'counter',
        label: 'Counter',
        icon: <Plus className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'dropdown',
        label: 'Dropdown',
        icon: <List className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'radio',
        label: 'Radio Button',
        icon: <CircleDot className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'checkbox',
        label: 'Checkbox',
        icon: <CheckSquare className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'slider',
        label: 'Slider',
        icon: <SlidersHorizontal className="w-6 h-6 text-gray-600" />,
      },
    ],
  },
  {
    title: 'Shapes',
    components: [
      {
        type: 'circle',
        label: 'Circle',
        icon: <Circle className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'line',
        label: 'Line',
        icon: <LineIcon className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'rectangle',
        label: 'Rectangle',
        icon: <RectangleIcon className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'square',
        label: 'Square',
        icon: <Square className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'star',
        label: 'Star',
        icon: <Star className="w-6 h-6 text-gray-600" />,
      },
    ],
  },
   {
    title: 'Gaming Elements',
    components: [
      {
        type: 'scoreboard',
        label: 'Scoreboard',
        icon: <Trophy className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'healthbar',
        label: 'Health Bar',
        icon: <Heart className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'timer',
        label: 'Timer/ Countdown',
        icon: <Timer className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'minimap',
        label: 'Mini Map',
        icon: <Map className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'pausemenu',
        label: 'Pause Menu',
        icon: <Pause className="w-6 h-6 text-gray-600" />,
      },
      {
        type: 'levelindicator',
        label: 'Level Indicator',
        icon: <BarChart3 className="w-6 h-6 text-gray-600" />,
      },
    ],
  },
];

interface ComponentItemProps {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
}

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
        'flex flex-col items-center justify-center p-3 rounded-lg cursor-move hover:bg-gray-50 border border-gray-200',
        isDragging && 'opacity-50'
      )}
    >
      <div className="p-2 rounded-md mb-2 bg-gray-50">
        {icon}
      </div>
      <span className="text-sm text-gray-700 text-center">{label}</span>
    </div>
  );
};

export const ComponentPalette = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = COMPONENT_SECTIONS.map(section => ({
    ...section,
    components: section.components.filter(component =>
      component.label.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(section => section.components.length > 0);

  return (
    <div className="border-t">
      <div className="p-4 border-b">
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
      <div>
        {filteredSections.map((section, index) => (
          <div key={section.title} className={clsx(index > 0 && 'border-t')}>
            <div className="px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">{section.title}</h3>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2">
              {section.components.map((component) => (
                <ComponentItem
                  key={component.type}
                  type={component.type}
                  label={component.label}
                  icon={component.icon}
                />
              ))}
            </div>
          </div>
        ))}
        {filteredSections.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            No components found
          </div>
        )}
      </div>
    </div>
  );
};
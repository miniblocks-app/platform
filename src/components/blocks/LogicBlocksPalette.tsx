import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Search, Play, Pause, RotateCw, ArrowRight, Settings, Database } from 'lucide-react';
import clsx from 'clsx';

interface BlockType {
  id: string;
  type: string;
  category: 'control' | 'data' | 'logic';
  label: string;
  icon: React.ReactNode;
  color: string;
}

const BLOCKS: BlockType[] = [
  {
    id: 'start',
    type: 'control_start',
    category: 'control',
    label: 'Start',
    icon: <Play className="w-4 h-4" />,
    color: 'bg-green-500',
  },
  {
    id: 'wait',
    type: 'control_wait',
    category: 'control',
    label: 'Wait',
    icon: <Pause className="w-4 h-4" />,
    color: 'bg-yellow-500',
  },
  {
    id: 'loop',
    type: 'control_loop',
    category: 'control',
    label: 'Loop',
    icon: <RotateCw className="w-4 h-4" />,
    color: 'bg-blue-500',
  },
  {
    id: 'if',
    type: 'logic_if',
    category: 'logic',
    label: 'If',
    icon: <ArrowRight className="w-4 h-4" />,
    color: 'bg-purple-500',
  },
  {
    id: 'variable',
    type: 'data_variable',
    category: 'data',
    label: 'Variable',
    icon: <Database className="w-4 h-4" />,
    color: 'bg-orange-500',
  },
];

const BlockItem = ({ block }: { block: BlockType }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: {
      type: block.type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        'flex items-center p-3 rounded-lg cursor-move hover:bg-gray-50 border border-gray-200',
        isDragging && 'opacity-50'
      )}
    >
      <div className={clsx('p-2 rounded-md mr-3', block.color)}>
        {block.icon}
      </div>
      <span className="text-sm text-gray-700">{block.label}</span>
    </div>
  );
};

export const LogicBlocksPalette = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBlocks = BLOCKS.filter(block => {
    const matchesSearch = block.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-700 mb-3">Logic Blocks</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex space-x-2 mb-2">
          {['control', 'logic', 'data'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={clsx(
                'px-3 py-1 text-xs rounded-full capitalize',
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredBlocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
        {filteredBlocks.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            No blocks found
          </div>
        )}
      </div>
    </div>
  );
};
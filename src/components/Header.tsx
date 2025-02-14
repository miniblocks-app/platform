import React from 'react';
import { useAppStore } from '../store';
import { Play, Share2, User } from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, currentProject } = useAppStore();
  
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          miniblocks
        </h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-1 rounded-md ${
              activeTab === 'DESIGN'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('DESIGN')}
          >
            DESIGN
          </button>
          <button
            className={`px-4 py-1 rounded-md ${
              activeTab === 'BLOCKS'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('BLOCKS')}
          >
            BLOCKS
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">
            {currentProject?.name || 'My First Project'}
          </span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-blue-500 text-white rounded-md flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store';
import { Play, Share2, User } from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, currentProject, renameProject } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(currentProject?.name || 'My First Project');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleNameSubmit = () => {
    setIsEditing(false);
    renameProject(projectName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setProjectName(currentProject?.name || 'My First Project');
    }
  };

  const handleBlur = () => {
    handleNameSubmit();
  };
  
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
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-700 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-50"
            >
              {currentProject?.name || 'My First Project'}
            </button>
          )}
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
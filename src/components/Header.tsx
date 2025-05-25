import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store';
import { CogIcon, ComputerIcon, Hammer, Play, Share2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';

export const Header = () => {
  const {
    activeTab,
    setActiveTab,
    currentProject,
    renameProject,
    debugMode,
    setDebugMode,
    advanceMode,
    setAdvanceMode,
    selectedScreen,
    dartCode
  } = useAppStore();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(currentProject?.name || 'My First Project');
  const [buildStatus, setBuildStatus] = useState<'idle' | 'zipping' | 'finished' | 'error'>('idle');
  const [showQR, setShowQR] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBuildClick = async () => {
    setBuildStatus('zipping');
    setShowQR(false);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: dartCode })
    });

    if (response.ok) {
      console.log('Build request sent successfully');
      setBuildStatus('finished');

      // After 3 minutes, show the QR code
      setTimeout(() => {
        setShowQR(true);
      }, 180000); // 180000ms = 3 minutes
    } else {
      console.error('Failed to send build request');
      setBuildStatus('error');
    }
  };

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

  const handlePreview = () => {
    if (selectedScreen) {
      window.open(`/preview/${selectedScreen}`, '_blank');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    if (authService.isAuthenticated()) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="flex items-center space-x-8">
          <img 
            src="/miniblocks-colored.png" 
            alt="Miniblocks Logo" 
            className="h-8 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={handleLogoClick}
          />
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
            {activeTab === 'BLOCKS' && (
              <>
                <button
                  className={`p-2 ${
                    advanceMode ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  } rounded-md flex items-center space-x-2`}
                  onClick={() => setAdvanceMode((prev) => !prev)}
                >
                  <CogIcon className="w-4 h-4" />
                  <span>Advance Mode</span>
                </button>
                <button
                  className={`p-2 ${
                    debugMode ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  } rounded-md flex items-center space-x-2`}
                  onClick={() => setDebugMode((prev) => !prev)}
                >
                  <ComputerIcon className="w-4 h-4" />
                  <span>Debug</span>
                </button>
              </>
            )}
            <button
              className="p-2 bg-blue-500 text-white rounded-md flex items-center space-x-2"
              onClick={handleBuildClick}
            >
              <Hammer className="w-4 h-4" />
              <span>Build</span>
            </button>
            <button
              className={`p-2 ${
                selectedScreen ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
              } text-white rounded-md flex items-center space-x-2 transition-colors`}
              onClick={handlePreview}
              disabled={!selectedScreen}
              title={
                selectedScreen ? 'Open preview in new tab' : 'Select a screen to preview'
              }
            >
              <Play className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button 
              onClick={handleUserClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title={authService.isAuthenticated() ? "View Profile" : "Sign In"}
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Loader / QR Code Display */}
      {buildStatus !== 'idle' && (
        <div className="p-4 text-center bg-gray-50 border-t">
          {buildStatus === 'zipping' && <p>Zipping your code!</p>}
          {buildStatus === 'finished' && !showQR && (
            <p>Build finished. Preparing your download...</p>
          )}
          {showQR && (
            <div className="flex flex-col items-center">
              <p>Download is available!</p>
              <img
                src="./qr-code.png"
                alt="Download QR"
                className="w-32 h-32 mt-2"
              />
            </div>
          )}
          {buildStatus === 'error' && <p>Error sending build request.</p>}
        </div>
      )}
    </>
  );
};
import { useState } from 'react';
import { FiUser, FiSmartphone } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<'my-projects' | 'sample-projects'>('my-projects');

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b flex items-center justify-between px-6">
        <div className="flex items-center">
          <img src="/miniblocks-colored.png" alt="Miniblocks Logo" className="h-8" />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <FiUser size={20} className="text-gray-600" />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Side Panel */}
        <div className="w-64 border-r bg-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            <div className="space-y-1">
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === 'my-projects' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('my-projects')}
              >
                <FiSmartphone className={activeTab === 'my-projects' ? 'text-purple-700' : 'text-gray-500'} />
                My Projects
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === 'sample-projects' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('sample-projects')}
              >
                <FiSmartphone className={activeTab === 'sample-projects' ? 'text-purple-700' : 'text-gray-500'} />
                Sample Projects
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {activeTab === 'my-projects' ? (
            children
          ) : (
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Sample Projects</h1>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 cursor-not-allowed opacity-75">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                    <div>
                      <h3 className="font-medium">Sample Project {i}</h3>
                      <p className="text-sm text-gray-500">Example project template</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiList, FiChevronLeft, FiChevronRight, FiSearch, FiChevronDown } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';

interface Project {
  id: string;
  name: string;
  createdAt: string;
  thumbnail?: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  youtubeUrl: string;
}

const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'Sample Project',
    createdAt: new Date().toLocaleString(),
    thumbnail: '/project-thumbnail.png'
  }
];

const dummyVideos: Video[] = [
  {
    id: '1',
    title: 'Tutorial 1 Video',
    duration: '1:55',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Tutorial 1 Video',
    duration: '1:55',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Tutorial 1 Video',
    duration: '1:55',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Tutorial 1 Video',
    duration: '1:55',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function ProjectsDashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateProject = () => {
    navigate('/canvas');
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/canvas/${projectId}`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Projects</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Find all of your creations and resources to help you build your first mobile app!</p>
          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <IoAdd size={20} />
            Create New Project
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <button
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>
          <div className="relative">
            <select className="appearance-none border rounded-lg pl-3 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Date Modified</option>
              <option>Name</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Getting Started Videos</h2>
          <a href="#" className="text-purple-500 hover:underline">See All Videos</a>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {dummyVideos.map((video) => (
            <div
              key={video.id}
              className="cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm">{video.title}</span>
                <span className="text-sm text-gray-500">{video.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Projects</h2>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
          {dummyProjects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className={viewMode === 'grid' ? 'aspect-video bg-gray-100 rounded-lg mb-4' : 'hidden'}>
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.createdAt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center items-center gap-4">
          <button className="p-2 rounded hover:bg-gray-100">
            <FiChevronLeft />
          </button>
          <span>Page 1 of 1</span>
          <button className="p-2 rounded hover:bg-gray-100">
            <FiChevronRight />
          </button>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-3xl">
            <div className="aspect-video mb-4">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.youtubeUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedVideo.title}</h3>
                <p className="text-sm text-gray-500">{selectedVideo.duration}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
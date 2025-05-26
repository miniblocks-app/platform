import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { authService } from '../../lib/auth';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();

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
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-36 border-b flex items-center justify-between px-6">
        <div className="flex items-center">
          <img 
            src="/miniblocks-colored.png" 
            alt="Miniblocks Logo" 
            className="h-8 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={handleLogoClick}
          />
        </div>
        <div 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={handleUserClick}
          title={authService.isAuthenticated() ? "View Profile" : "Sign In"}
        >
          <User size={20} className="text-gray-600" />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Scale, User, Settings, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-legal-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-legal-indigo-600" />
            <span className="text-xl font-bold text-legal-slate-900">Legal NER Suite</span>
          </Link>

          {/* Navigation Links - Only show if user is logged in */}
          {user && (
            <div className="hidden md:flex space-x-8">
              {user.role === 'police' && (
                <Link
                  to="/fir-assistant"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/fir-assistant')
                      ? 'text-legal-indigo-600 bg-legal-indigo-50'
                      : 'text-legal-slate-700 hover:text-legal-indigo-600'
                  }`}
                >
                  👮 FIR Assistant
                </Link>
              )}

              {user.role === 'researcher' && (
                <>
                  <Link
                    to="/legal-research"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/legal-research')
                        ? 'text-legal-indigo-600 bg-legal-indigo-50'
                        : 'text-legal-slate-700 hover:text-legal-indigo-600'
                    }`}
                  >
                    🧠 Legal Research
                  </Link>
                  <Link
                    to="/case-prediction"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/case-prediction')
                        ? 'text-legal-indigo-600 bg-legal-indigo-50'
                        : 'text-legal-slate-700 hover:text-legal-indigo-600'
                    }`}
                  >
                    ⚖️ Case Prediction
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-legal-slate-700 hover:text-legal-indigo-600">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">Get Started</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Scale, User, Settings, LogOut, Menu, X, Shield, Brain } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getRoleIcon = () => {
    return user?.role === 'police' ? 
      <Shield className="h-4 w-4 text-legal-indigo-600" /> : 
      <Brain className="h-4 w-4 text-legal-teal-600" />;
  };

  const getRoleBadge = () => {
    return user?.role === 'police' ? '👮 Police' : '🧠 Researcher';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-legal-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2 icon-hover">
            <Scale className="h-8 w-8 text-legal-indigo-600" />
            <span className="text-xl font-bold text-legal-slate-900">Legal NER Suite</span>
          </Link>

          {/* Desktop Navigation Links */}
          {user && (
            <div className="hidden md:flex space-x-8">
              {user.role === 'police' && (
                <Link
                  to="/fir-assistant"
                  onClick={closeMobileMenu}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/fir-assistant')
                      ? 'text-legal-indigo-600 bg-legal-indigo-50 shadow-sm'
                      : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-indigo-50'
                  }`}
                >
                  👮 FIR Assistant
                </Link>
              )}

              {user.role === 'researcher' && (
                <>
                  <Link
                    to="/legal-research"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/legal-research')
                        ? 'text-legal-indigo-600 bg-legal-indigo-50 shadow-sm'
                        : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-indigo-50'
                    }`}
                  >
                    🧠 Legal Research
                  </Link>
                  <Link
                    to="/case-prediction"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/case-prediction')
                        ? 'text-legal-indigo-600 bg-legal-indigo-50 shadow-sm'
                        : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-indigo-50'
                    }`}
                  >
                    ⚖️ Case Prediction
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-legal-slate-700 hover:text-legal-indigo-600 transition-colors">
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
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-legal-slate-50 transition-colors">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon()}
                      <User className="h-5 w-5" />
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-legal-slate-500">{getRoleBadge()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-legal-slate-200">
                  <DropdownMenuItem className="hover:bg-legal-slate-50 transition-colors">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 text-red-600 transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-legal-slate-200 bg-white shadow-lg fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!user ? (
                <div className="space-y-2">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-legal-slate-700">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <Button className="btn-primary w-full">Get Started</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="px-3 py-2 border-b border-legal-slate-200 mb-2">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon()}
                      <div>
                        <p className="text-sm font-medium text-legal-slate-900">{user.name}</p>
                        <p className="text-xs text-legal-slate-500">{getRoleBadge()}</p>
                      </div>
                    </div>
                  </div>

                  {user.role === 'police' && (
                    <Link
                      to="/fir-assistant"
                      onClick={closeMobileMenu}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/fir-assistant')
                          ? 'text-legal-indigo-600 bg-legal-indigo-50'
                          : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-slate-50'
                      }`}
                    >
                      👮 FIR Assistant
                    </Link>
                  )}

                  {user.role === 'researcher' && (
                    <>
                      <Link
                        to="/legal-research"
                        onClick={closeMobileMenu}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive('/legal-research')
                            ? 'text-legal-indigo-600 bg-legal-indigo-50'
                            : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-slate-50'
                        }`}
                      >
                        🧠 Legal Research
                      </Link>
                      <Link
                        to="/case-prediction"
                        onClick={closeMobileMenu}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive('/case-prediction')
                            ? 'text-legal-indigo-600 bg-legal-indigo-50'
                            : 'text-legal-slate-700 hover:text-legal-indigo-600 hover:bg-legal-slate-50'
                        }`}
                      >
                        ⚖️ Case Prediction
                      </Link>
                    </>
                  )}

                  <div className="border-t border-legal-slate-200 pt-2 mt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-legal-slate-700"
                      onClick={closeMobileMenu}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

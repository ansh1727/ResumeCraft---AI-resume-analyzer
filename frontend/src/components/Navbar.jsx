import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  FileText, Sun, Moon, LogOut, Menu, X, LayoutDashboard,
  Upload, History, Brain, Target, Briefcase, Users, BarChart3, Settings,
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-primary-600 p-1.5">
            <FileText className="h-5 w-5 text-white" />
          </span>
          <div>
            <span className="block text-xl font-bold leading-none gradient-text">ResumeCraft</span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Made By Ansh Pathak
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {!user &&
            publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600 dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={`/${user.role}/dashboard`}
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden dark:border-gray-800">
          {!user &&
            publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {link.label}
              </Link>
            ))}
          {user ? (
            <>
              <Link
                to={`/${user.role}/dashboard`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block py-2 text-sm font-medium text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export const getSidebarLinks = (role) => {
  const links = {
    candidate: [
      { to: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/candidate/upload', label: 'Upload Resume', icon: Upload },
      { to: '/candidate/history', label: 'Resume History', icon: History },
      { to: '/candidate/analysis', label: 'Resume Analysis', icon: Brain },
      { to: '/candidate/job-match', label: 'Job Match', icon: Target },
      { to: '/candidate/jobs', label: 'Browse Jobs', icon: Briefcase },
    ],
    recruiter: [
      { to: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/recruiter/post-job', label: 'Post Job', icon: Briefcase },
      { to: '/recruiter/manage-jobs', label: 'Manage Jobs', icon: Settings },
      { to: '/recruiter/applicants', label: 'Applicants', icon: Users },
    ],
    admin: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  };
  return links[role] || [];
};

export default Navbar;

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSidebarLinks } from './Navbar';
import { LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const links = getSidebarLinks(user?.role);

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="colorful-card relative sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary-600" />
          <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</p>
            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
            <span className="mt-1 inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium capitalize text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {user?.role}
            </span>
          </div>
          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={logout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;

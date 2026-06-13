import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary-600" />
            <div>
              <span className="block text-lg font-bold gradient-text">ResumeCraft</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Made by Ansh Pathak</span>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/features" className="hover:text-primary-600">Features</Link>
            <Link to="/pricing" className="hover:text-primary-600">Pricing</Link>
            <Link to="/login" className="hover:text-primary-600">Login</Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Ansh Pathak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSkeleton from './LoadingSkeleton';

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSkeleton fullPage />;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    const redirectMap = {
      candidate: '/candidate/dashboard',
      recruiter: '/recruiter/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={redirectMap[user.role] || '/'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

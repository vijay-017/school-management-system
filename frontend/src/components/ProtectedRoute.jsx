import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route so it requires:
 *  1. A valid token (else → /login)
 *  2. The user's role to be in `allowedRoles` (else → their own dashboard)
 *
 * Usage:
 *   <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
 *     <AdminLayout />
 *   </ProtectedRoute>
 */
const roleDashboard = {
  SUPER_ADMIN: '/dashboard/admin',
  ADMIN: '/dashboard/admin',
  TEACHER: '/dashboard/teacher',
  PARENT: '/dashboard/parent',
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    const home = roleDashboard[auth.role] ?? '/login';
    return <Navigate to={home} replace />;
  }

  return children;
};

export default ProtectedRoute;

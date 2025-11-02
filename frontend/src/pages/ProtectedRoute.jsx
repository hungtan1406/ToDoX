import { useAuthStore } from '@/stores/useAuthStore';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { accessToken, tasks, loading, refresh, fetchTask } = useAuthStore();
  const [starting, setStarting] = useState(true);
  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !tasks) {
      await fetchTask();
    }

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Đang tải trang...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to='signin' replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;

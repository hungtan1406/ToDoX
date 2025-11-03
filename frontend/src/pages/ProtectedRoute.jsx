import { useAuthStore } from '@/stores/useAuthStore';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { accessToken, tasks, loading, refresh, fetchTask } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    let token = accessToken;

    // chưa có -> thử lấy từ cookie
    if (!token) {
      token = await refresh();
    }

    // nếu có token rồi mà chưa có tasks -> load tasks
    if (token && (!tasks || tasks.length === 0)) {
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

  // lấy state mới nhất từ store, tránh closure cũ
  if (!useAuthStore.getState().accessToken) {
    return <Navigate to='signin' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

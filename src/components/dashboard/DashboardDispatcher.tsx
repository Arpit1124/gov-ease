import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserDashboard } from './UserDashboard';
import { AgentDashboard } from './AgentDashboard';
import { AdminDashboard } from './AdminDashboard';

export const DashboardDispatcher: React.FC = () => {
  const { userRole } = useApp();

  if (userRole === 'ADMIN') {
    return <AdminDashboard />;
  }

  if (userRole === 'AGENT') {
    return <AgentDashboard />;
  }

  return <UserDashboard />;
};

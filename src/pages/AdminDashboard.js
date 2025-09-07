import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="section-header">
        <h2 className="section-title">Admin Dashboard</h2>
        <p className="section-description">Welcome, {user?.name}. Manage courses, quizzes, and students.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;



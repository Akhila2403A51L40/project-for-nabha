import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="section-header">
        <h2 className="section-title">Student Dashboard</h2>
        <p className="section-description">Welcome, {user?.name}. Continue your learning journey.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;



import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ usernameOrEmail, password, role });
      const redirectTo = role === 'admin' ? '/admin' : '/dashboard';
      const from = location.state?.from || redirectTo;
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="hero-card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <div className="card-content">
          <h2 style={{ marginBottom: 16 }}>Login</h2>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Username or Email</label>
              <input value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
            <div style={{ marginTop: 12, color: '#6b7280' }}>
              Demo: admin/admin (Admin) or student/student (Student)
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;



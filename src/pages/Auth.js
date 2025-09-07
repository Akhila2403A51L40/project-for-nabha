import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Auth = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const resetErrors = () => setError('');

  const onSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    try {
      if (mode === 'signup') {
        if (!username || !email || !password) throw new Error('Please fill all fields');
        if (password !== confirm) throw new Error('Passwords do not match');
        await register({ username, email, password, role, name });
      }
      const authed = await login({ usernameOrEmail: mode === 'login' ? username : email || username, password, role: mode === 'signup' ? role : undefined });
      navigate(authed.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="hero-card" style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="card-content">
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('login')}>Login</button>
            <button className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('signup')}>Sign Up</button>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <form onSubmit={onSubmit}>
            {mode === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label>Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: mode === 'signup' ? '1fr 1fr' : '1fr', gap: 12, marginTop: 12 }}>
              {mode === 'signup' && (
                <div>
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
                </div>
              )}
              <div>
                <label>{mode === 'login' ? 'Username or Email' : 'Username'}</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
              {mode === 'signup' && (
                <div>
                  <label>Confirm Password</label>
                  <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>{mode === 'login' ? 'Login' : 'Create Account'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;



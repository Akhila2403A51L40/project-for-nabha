import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Signup = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password) return setError('Please fill all fields');
    if (password !== confirm) return setError('Passwords do not match');

    try {
      await register({ username, email, password, role, name });
      await login({ usernameOrEmail: email || username, password, role });
      navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="hero-card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <div className="card-content">
          <h2 style={{ marginBottom: 16 }}>Create Account</h2>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <form onSubmit={onSubmit}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
              <div>
                <label>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
              <div>
                <label>Confirm Password</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4 }} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;



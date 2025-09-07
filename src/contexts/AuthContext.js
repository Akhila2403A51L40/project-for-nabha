import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, username, email, name, role }
  const [users, setUsers] = useState([]); // persisted registered users

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth:user');
      if (raw) setUser(JSON.parse(raw));
      const rawUsers = localStorage.getItem('auth:users');
      if (rawUsers) setUsers(JSON.parse(rawUsers));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth:user', JSON.stringify(user));
      else localStorage.removeItem('auth:user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('auth:users', JSON.stringify(users));
    } catch {}
  }, [users]);

  const register = async ({ username, email, password, role, name }) => {
    const usernameExists = users.some(u => u.username === username);
    if (usernameExists) throw new Error('Username already exists');
    const emailExists = users.some(u => (u.email || '').toLowerCase() === (email || '').toLowerCase());
    if (emailExists) throw new Error('Email already exists');
    const newUser = { id: String(Date.now()), username, email, password, role, name: name || username };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const login = async ({ usernameOrEmail, password, role }) => {
    const query = (u) => {
      const matchUser = u.username === usernameOrEmail || (u.email || '').toLowerCase() === (usernameOrEmail || '').toLowerCase();
      const matchPass = u.password === password;
      const matchRole = !role || u.role === role;
      return matchUser && matchPass && matchRole;
    };
    const found = users.find(query);
    if (!found) throw new Error('Invalid credentials');
    setUser({ id: found.id, username: found.username, email: found.email, name: found.name, role: found.role });
    return found;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, register, login, logout }), [user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



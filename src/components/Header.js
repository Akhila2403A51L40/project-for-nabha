import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Globe, User, Trophy, Download, HelpCircle, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { downloadManager } from '../utils/downloadManager';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const updateDownloadCount = () => {
      const downloads = downloadManager.getDownloadedCourses();
      setDownloadCount(downloads.length);
    };

    // Initial load
    updateDownloadCount();

    // Listen for storage changes (when downloads are added/removed)
    const handleStorageChange = () => {
      updateDownloadCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('downloadsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('downloadsUpdated', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <BookOpen className="logo-icon" />
            <span className="logo-text">
              <span className="logo-main">Nabha</span>
              <span className="logo-sub">Digital Learning</span>
            </span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              to="/courses" 
              className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('courses')}
            </Link>
            <Link 
              to="/progress" 
              className={`nav-link ${isActive('/progress') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="nav-icon" />
              {t('progress')}
            </Link>
            <Link 
              to="/quizzes" 
              className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="nav-icon" />
              {t('quizzes')}
            </Link>
            <Link 
              to="/downloads" 
              className={`nav-link ${isActive('/downloads') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Download className="nav-icon" />
              {t('downloads')}
              {downloadCount > 0 && (
                <span className="download-badge">{downloadCount}</span>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
          </nav>

          <div className="header-actions">
            <button 
              className="language-toggle" 
              title="Switch Language"
              onClick={() => {
                const nextLanguage = language === 'en' ? 'hi' : language === 'hi' ? 'pa' : 'en';
                changeLanguage(nextLanguage);
              }}
            >
              <Globe className="icon" />
              <span>
                {language === 'en' ? 'हिंदी' : language === 'hi' ? 'ਪੰਜਾਬੀ' : 'English'}
              </span>
            </button>
            {isAuthenticated ? (
              <button className="user-menu" title="Logout" onClick={logout}>
                <LogOut className="icon" />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/auth" className="user-menu" title="Login / Sign Up">
                  <User className="icon" />
                </Link>
              </div>
            )}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

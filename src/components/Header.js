import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Globe, User, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();

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
            <button className="user-menu" title="User Profile">
              <User className="icon" />
            </button>
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

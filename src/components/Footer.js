import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <BookOpen className="logo-icon" />
              <div className="logo-text">
                <span className="logo-main">Nabha Digital Learning</span>
                <span className="logo-sub">Empowering Rural Education</span>
              </div>
            </div>
            <p className="footer-description">
              Bridging the digital divide in rural education through innovative 
              learning solutions for students in Nabha and surrounding areas.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/progress">Progress</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Subjects</h3>
            <ul className="footer-links">
              <li><a href="/courses?subject=mathematics">Mathematics</a></li>
              <li><a href="/courses?subject=science">Science</a></li>
              <li><a href="/courses?subject=english">English</a></li>
              <li><a href="/courses?subject=hindi">Hindi</a></li>
              <li><a href="/courses?subject=punjabi">Punjabi</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Nabha, Punjab, India</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@nabhalearning.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Nabha Digital Learning Platform. All rights reserved.
            </p>
            <p className="made-with-love">
              Made with <Heart className="heart-icon" /> for rural students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

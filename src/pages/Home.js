import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import './Home.css';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { t } = useLanguage();
  useAuth();

  const features = [
    {
      icon: <BookOpen className="feature-icon" />,
      title: t('interactiveLearning'),
      description: t('interactiveLearningDesc')
    },
    {
      icon: <Globe className="feature-icon" />,
      title: t('offlineAccess'),
      description: t('offlineAccessDesc')
    },
    {
      icon: <Users className="feature-icon" />,
      title: t('communitySupport'),
      description: t('communitySupportDesc')
    },
    {
      icon: <Award className="feature-icon" />,
      title: t('progressTracking'),
      description: t('progressTrackingDesc')
    }
  ];

  const subjects = [
    { name: t('mathematics'), slug: 'mathematics', color: "#3b82f6", icon: "🔢" },
    { name: t('science'), slug: 'science', color: "#10b981", icon: "🔬" },
    { name: t('english'), slug: 'english', color: "#f59e0b", icon: "📚" },
    { name: t('hindi'), slug: 'hindi', color: "#ef4444", icon: "📖" },
    { name: t('punjabi'), slug: 'punjabi', color: "#8b5cf6", icon: "✍️" },
    { name: t('socialStudies'), slug: 'social-studies', color: "#06b6d4", icon: "🌍" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      school: "Government High School, Nabha",
      text: "This platform has made learning so much fun! I can now understand difficult concepts easily.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      school: "Rural Primary School, Nabha",
      text: "Even with limited internet, I can download lessons and study offline. Amazing!",
      rating: 5
    },
    {
      name: "Sunita Devi",
      school: "Village School, Nabha",
      text: "The Hindi and Punjabi content helps me learn in my own language. Thank you!",
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{t('heroTitle')}</h1>
              <p className="hero-description">
                {t('heroDescription')}
              </p>
              <div className="hero-actions">
                <Link to="/courses" className="btn btn-primary hero-btn">
                  {t('startLearning')}
                </Link>
                <Link to="/about" className="btn btn-secondary hero-btn">
                  {t('learnMore')}
                  <ArrowRight className="btn-icon" />
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">{t('students')}</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">{t('coursesCount')}</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">{t('schools')}</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-card">
                <div className="card-header">
                  <div className="card-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="learning-demo">
                    <BookOpen className="demo-icon" />
                    <h3>{t('interactiveLearning')}</h3>
                    <p>{t('demoEngagingContent')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('whyChoosePlatform')}</h2>
            <p className="section-description">{t('designedForRuralStudents')}</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="subjects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('exploreSubjects')}</h2>
            <p className="section-description">{t('comprehensiveCurriculum')}</p>
          </div>
          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <Link 
                key={index} 
                to={`/courses?subject=${subject.slug}`}
                className="subject-card"
                style={{ '--subject-color': subject.color }}
              >
                <div className="subject-icon">{subject.icon}</div>
                <h3 className="subject-name">{subject.name}</h3>
                <div className="subject-arrow">
                  <ArrowRight className="arrow-icon" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('whatStudentsSay')}</h2>
            <p className="section-description">{t('realFeedback')}</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-school">{testimonial.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">{t('readyToStartLearning')}</h2>
              <p className="cta-description">{t('joinHundreds')}</p>
            </div>
            <div className="cta-actions">
              <Link to="/courses" className="btn btn-primary cta-btn">
                <TrendingUp className="btn-icon" />
                {t('getStartedToday')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

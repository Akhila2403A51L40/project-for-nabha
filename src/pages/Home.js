import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  Play, 
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Interactive Learning",
      description: "Engaging multimedia content designed for rural students"
    },
    {
      icon: <Globe className="feature-icon" />,
      title: "Offline Access",
      description: "Download content for learning without internet connection"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Community Support",
      description: "Connect with teachers and fellow students"
    },
    {
      icon: <Award className="feature-icon" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const subjects = [
    { name: "Mathematics", color: "#3b82f6", icon: "🔢" },
    { name: "Science", color: "#10b981", icon: "🔬" },
    { name: "English", color: "#f59e0b", icon: "📚" },
    { name: "Hindi", color: "#ef4444", icon: "📖" },
    { name: "Punjabi", color: "#8b5cf6", icon: "✍️" },
    { name: "Social Studies", color: "#06b6d4", icon: "🌍" }
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
              <h1 className="hero-title">
                Empowering Rural Education in 
                <span className="highlight"> Nabha</span>
              </h1>
              <p className="hero-description">
                A comprehensive digital learning platform designed specifically for rural school students. 
                Access quality education, interactive content, and progress tracking - all in your local language.
              </p>
              <div className="hero-actions">
                <Link to="/courses" className="btn btn-primary hero-btn">
                  <Play className="btn-icon" />
                  Start Learning
                </Link>
                <Link to="/about" className="btn btn-secondary hero-btn">
                  Learn More
                  <ArrowRight className="btn-icon" />
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Schools</span>
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
                    <h3>Interactive Learning</h3>
                    <p>Engaging content for all subjects</p>
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
            <h2 className="section-title">Why Choose Our Platform?</h2>
            <p className="section-description">
              Designed specifically for rural students with unique needs and challenges
            </p>
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
            <h2 className="section-title">Explore Subjects</h2>
            <p className="section-description">
              Comprehensive curriculum covering all major subjects
            </p>
          </div>
          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <Link 
                key={index} 
                to={`/courses?subject=${subject.name.toLowerCase()}`}
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
            <h2 className="section-title">What Students Say</h2>
            <p className="section-description">
              Real feedback from students using our platform
            </p>
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
              <h2 className="cta-title">Ready to Start Learning?</h2>
              <p className="cta-description">
                Join hundreds of students in Nabha who are already using our platform to improve their education.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/courses" className="btn btn-primary cta-btn">
                <TrendingUp className="btn-icon" />
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

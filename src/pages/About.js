import React from 'react';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Heart, 
  Target,
  Award,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import './About.css';

const About = () => {
  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Project Director",
      bio: "Education specialist with 20+ years experience in rural education development.",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Technical Lead",
      bio: "Software engineer passionate about making technology accessible to rural communities.",
      avatar: "RK"
    },
    {
      name: "Sunita Devi",
      role: "Content Coordinator",
      bio: "Former teacher with expertise in multilingual educational content creation.",
      avatar: "SD"
    },
    {
      name: "Amit Singh",
      role: "Community Outreach",
      bio: "Local community leader working to bridge the digital divide in Nabha.",
      avatar: "AS"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Project Initiation",
      description: "Started with a vision to improve rural education in Nabha"
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Launched the digital learning platform with 50+ courses"
    },
    {
      year: "2024",
      title: "500+ Students",
      description: "Reached 500+ students across 15+ schools in Nabha"
    },
    {
      year: "2024",
      title: "Offline Support",
      description: "Added offline learning capabilities for low-connectivity areas"
    }
  ];

  const values = [
    {
      icon: <BookOpen className="value-icon" />,
      title: "Quality Education",
      description: "Providing high-quality educational content tailored for rural students"
    },
    {
      icon: <Globe className="value-icon" />,
      title: "Accessibility",
      description: "Making education accessible regardless of internet connectivity"
    },
    {
      icon: <Users className="value-icon" />,
      title: "Community Focus",
      description: "Building solutions with and for the local community"
    },
    {
      icon: <Heart className="value-icon" />,
      title: "Empathy",
      description: "Understanding the unique challenges faced by rural students"
    }
  ];

  const testimonials = [
    {
      name: "Mrs. Geeta Singh",
      role: "Principal, Government High School, Nabha",
      text: "This platform has transformed how our students learn. The offline capabilities are especially valuable in our area.",
      rating: 5
    },
    {
      name: "Harpal Singh",
      role: "Parent & Community Leader",
      text: "My children can now access quality education in Punjabi and Hindi. This is exactly what our community needed.",
      rating: 5
    },
    {
      name: "Dr. Rajesh Verma",
      role: "Education Officer, Punjab",
      text: "The Nabha Digital Learning Platform is a model for rural education innovation across the state.",
      rating: 5
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Empowering Rural Education in 
              <span className="highlight"> Nabha</span>
            </h1>
            <p className="hero-description">
              We believe every child deserves access to quality education, regardless of their location or circumstances. 
              Our digital learning platform is designed specifically for rural students in Nabha, Punjab.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                To bridge the digital divide in rural education by providing accessible, 
                high-quality learning resources that work even with limited internet connectivity. 
                We're committed to empowering students in Nabha and surrounding areas with the 
                tools they need to succeed in their educational journey.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Students Reached</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Schools Partnered</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Courses Available</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <BookOpen className="placeholder-icon" />
                <p>Rural students learning with technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-description">
              Meet the passionate individuals behind this initiative
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  <span className="avatar-text">{member.avatar}</span>
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="milestones-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-description">
              Key milestones in our mission to improve rural education
            </p>
          </div>
          <div className="milestones-timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <div className="milestone-year">{milestone.year}</div>
                <div className="milestone-content">
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What People Say</h2>
            <p className="section-description">
              Feedback from educators, parents, and community leaders
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
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-description">
                Have questions or want to partner with us? We'd love to hear from you.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div className="contact-text">
                    <h4>Address</h4>
                    <p>Nabha, Punjab, India</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>info@nabhalearning.org</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form className="form">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    placeholder="Your Message" 
                    className="form-textarea"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  Send Message
                  <ArrowRight className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

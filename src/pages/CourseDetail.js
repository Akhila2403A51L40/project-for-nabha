import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  CheckCircle,
  Lock,
  Globe,
  FileText,
  Video,
  Image,
  Volume2
} from 'lucide-react';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [progress, setProgress] = useState(0);

  const courses = [
    {
      id: 1,
      title: "Basic Mathematics for Class 6",
      subject: "mathematics",
      level: "middle",
      description: "Learn fundamental mathematical concepts including fractions, decimals, and basic algebra. This comprehensive course is designed specifically for rural students with interactive examples and practical applications.",
      duration: "4 weeks",
      students: 245,
      rating: 4.8,
      thumbnail: "🔢",
      isOffline: true,
      lessons: 24,
      instructor: "Mrs. Priya Sharma",
      instructorBio: "Experienced mathematics teacher with 15+ years of experience in rural education.",
      fullDescription: "This course covers all essential mathematical concepts for Class 6 students. You'll learn about fractions, decimals, basic algebra, geometry, and practical applications of mathematics in daily life. The course includes interactive exercises, real-world examples, and step-by-step solutions.",
      objectives: [
        "Understand basic mathematical operations",
        "Master fractions and decimals",
        "Learn basic algebraic concepts",
        "Apply mathematics in real-life situations",
        "Develop problem-solving skills"
      ],
      lessons: [
        {
          id: 1,
          title: "Introduction to Numbers",
          type: "video",
          duration: "15 min",
          isCompleted: true,
          description: "Understanding whole numbers and their properties"
        },
        {
          id: 2,
          title: "Addition and Subtraction",
          type: "video",
          duration: "20 min",
          isCompleted: true,
          description: "Basic operations with whole numbers"
        },
        {
          id: 3,
          title: "Multiplication and Division",
          type: "video",
          duration: "25 min",
          isCompleted: false,
          description: "Advanced operations and their applications"
        },
        {
          id: 4,
          title: "Introduction to Fractions",
          type: "video",
          duration: "30 min",
          isCompleted: false,
          description: "Understanding parts of a whole"
        },
        {
          id: 5,
          title: "Fraction Operations",
          type: "interactive",
          duration: "35 min",
          isCompleted: false,
          description: "Adding, subtracting, multiplying, and dividing fractions"
        },
        {
          id: 6,
          title: "Decimals and Their Uses",
          type: "video",
          duration: "25 min",
          isCompleted: false,
          description: "Understanding decimal numbers and their applications"
        },
        {
          id: 7,
          title: "Practice Quiz - Fractions",
          type: "quiz",
          duration: "20 min",
          isCompleted: false,
          description: "Test your understanding of fractions"
        },
        {
          id: 8,
          title: "Geometry Basics",
          type: "video",
          duration: "30 min",
          isCompleted: false,
          description: "Introduction to shapes and their properties"
        }
      ]
    }
  ];

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    
    if (foundCourse) {
      const completedLessons = foundCourse.lessons.filter(lesson => lesson.isCompleted).length;
      const totalLessons = foundCourse.lessons.length;
      setProgress((completedLessons / totalLessons) * 100);
    }
  }, [id]);

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="lesson-icon" />;
      case 'interactive':
        return <FileText className="lesson-icon" />;
      case 'quiz':
        return <CheckCircle className="lesson-icon" />;
      default:
        return <BookOpen className="lesson-icon" />;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  if (!course) {
    return (
      <div className="course-detail">
        <div className="container">
          <div className="not-found">
            <h2>Course not found</h2>
            <Link to="/courses" className="btn btn-primary">
              <ArrowLeft className="btn-icon" />
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/courses" className="breadcrumb-link">
            <ArrowLeft className="breadcrumb-icon" />
            Back to Courses
          </Link>
        </div>

        <div className="course-detail-content">
          {/* Course Header */}
          <div className="course-header">
            <div className="course-info">
              <div className="course-badge">
                <span className="badge-text">{course.level.charAt(0).toUpperCase() + course.level.slice(1)} Level</span>
              </div>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta">
                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{course.duration}</span>
                </div>
                <div className="meta-item">
                  <BookOpen className="meta-icon" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="meta-item">
                  <Users className="meta-icon" />
                  <span>{course.students} students</span>
                </div>
                <div className="course-rating">
                  {renderStars(course.rating)}
                  <span className="rating-value">{course.rating}</span>
                </div>
              </div>

              <div className="course-actions">
                <button className="btn btn-primary start-course-btn">
                  <Play className="btn-icon" />
                  {progress > 0 ? 'Continue Course' : 'Start Course'}
                </button>
                {course.isOffline && (
                  <button className="btn btn-secondary">
                    <Download className="btn-icon" />
                    Download for Offline
                  </button>
                )}
              </div>
            </div>

            <div className="course-thumbnail">
              <div className="thumbnail-content">
                <div className="thumbnail-icon">{course.thumbnail}</div>
                <div className="progress-ring">
                  <svg className="progress-svg" viewBox="0 0 100 100">
                    <circle
                      className="progress-bg"
                      cx="50"
                      cy="50"
                      r="45"
                    />
                    <circle
                      className="progress-fill"
                      cx="50"
                      cy="50"
                      r="45"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 45}`,
                        strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
                      }}
                    />
                  </svg>
                  <div className="progress-text">
                    <span className="progress-percentage">{Math.round(progress)}%</span>
                    <span className="progress-label">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="course-detail-grid">
            {/* Course Content */}
            <div className="course-main">
              {/* About Course */}
              <section className="course-section">
                <h2 className="section-title">About This Course</h2>
                <p className="section-content">{course.fullDescription}</p>
              </section>

              {/* Learning Objectives */}
              <section className="course-section">
                <h2 className="section-title">What You'll Learn</h2>
                <ul className="objectives-list">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="objective-item">
                      <CheckCircle className="objective-icon" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Course Curriculum */}
              <section className="course-section">
                <h2 className="section-title">Course Curriculum</h2>
                <div className="lessons-list">
                  {course.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className={`lesson-item ${lesson.isCompleted ? 'completed' : ''} ${selectedLesson === index ? 'selected' : ''}`}
                      onClick={() => setSelectedLesson(index)}
                    >
                      <div className="lesson-icon-wrapper">
                        {lesson.isCompleted ? (
                          <CheckCircle className="lesson-status-icon completed" />
                        ) : (
                          <Lock className="lesson-status-icon locked" />
                        )}
                        {getLessonIcon(lesson.type)}
                      </div>
                      <div className="lesson-content">
                        <h3 className="lesson-title">{lesson.title}</h3>
                        <p className="lesson-description">{lesson.description}</p>
                        <div className="lesson-meta">
                          <span className="lesson-duration">{lesson.duration}</span>
                          <span className="lesson-type">{lesson.type}</span>
                        </div>
                      </div>
                      <div className="lesson-action">
                        {lesson.isCompleted ? (
                          <CheckCircle className="action-icon completed" />
                        ) : (
                          <Play className="action-icon" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Course Sidebar */}
            <div className="course-sidebar">
              {/* Instructor */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Instructor</h3>
                <div className="instructor-info">
                  <div className="instructor-avatar">
                    <span className="avatar-text">{course.instructor.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="instructor-details">
                    <h4 className="instructor-name">{course.instructor}</h4>
                    <p className="instructor-bio">{course.instructorBio}</p>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Course Statistics</h3>
                <div className="stats-list">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <BookOpen className="icon" />
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{course.lessons}</span>
                      <span className="stat-label">Lessons</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Clock className="icon" />
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{course.duration}</span>
                      <span className="stat-label">Duration</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Users className="icon" />
                    </div>
                    <div className="stat-content">
                      <span className="stat-value">{course.students}</span>
                      <span className="stat-label">Students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offline Access */}
              {course.isOffline && (
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Offline Access</h3>
                  <div className="offline-info">
                    <Globe className="offline-icon" />
                    <p>This course is available for offline learning. Download content to study without internet connection.</p>
                    <button className="btn btn-secondary offline-btn">
                      <Download className="btn-icon" />
                      Download Course
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

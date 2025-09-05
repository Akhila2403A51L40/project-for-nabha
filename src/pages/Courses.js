import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Play,
  Download,
  Globe
} from 'lucide-react';
import './Courses.css';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'social-studies', label: 'Social Studies' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'primary', label: 'Primary (1-5)' },
    { value: 'middle', label: 'Middle (6-8)' },
    { value: 'secondary', label: 'Secondary (9-10)' }
  ];

  const courses = [
    {
      id: 1,
      title: "Basic Mathematics for Class 6",
      subject: "mathematics",
      level: "middle",
      description: "Learn fundamental mathematical concepts including fractions, decimals, and basic algebra.",
      duration: "4 weeks",
      students: 245,
      rating: 4.8,
      thumbnail: "🔢",
      isOffline: true,
      lessons: 24,
      instructor: "Mrs. Priya Sharma"
    },
    {
      id: 2,
      title: "Science Experiments - Class 7",
      subject: "science",
      level: "middle",
      description: "Interactive science experiments and concepts covering physics, chemistry, and biology.",
      duration: "6 weeks",
      students: 189,
      rating: 4.9,
      thumbnail: "🔬",
      isOffline: true,
      lessons: 30,
      instructor: "Mr. Rajesh Kumar"
    },
    {
      id: 3,
      title: "English Grammar Basics",
      subject: "english",
      level: "primary",
      description: "Master English grammar with interactive exercises and examples.",
      duration: "3 weeks",
      students: 312,
      rating: 4.7,
      thumbnail: "📚",
      isOffline: false,
      lessons: 18,
      instructor: "Ms. Sunita Devi"
    },
    {
      id: 4,
      title: "हिंदी व्याकरण - कक्षा 8",
      subject: "hindi",
      level: "middle",
      description: "हिंदी व्याकरण के मूलभूत नियम और अभ्यास।",
      duration: "5 weeks",
      students: 156,
      rating: 4.6,
      thumbnail: "📖",
      isOffline: true,
      lessons: 25,
      instructor: "श्रीमती गीता सिंह"
    },
    {
      id: 5,
      title: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ - ਕਲਾਸ 5",
      subject: "punjabi",
      level: "primary",
      description: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਦੇ ਮੂਲ ਸਿਧਾਂਤ ਅਤੇ ਅਭਿਆਸ।",
      duration: "4 weeks",
      students: 98,
      rating: 4.5,
      thumbnail: "✍️",
      isOffline: true,
      lessons: 20,
      instructor: "ਸ੍ਰੀ ਹਰਪਾਲ ਸਿੰਘ"
    },
    {
      id: 6,
      title: "Social Studies - Indian History",
      subject: "social-studies",
      level: "secondary",
      description: "Comprehensive study of Indian history from ancient to modern times.",
      duration: "8 weeks",
      students: 203,
      rating: 4.8,
      thumbnail: "🌍",
      isOffline: true,
      lessons: 40,
      instructor: "Dr. Amit Kumar"
    }
  ];

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(course => course.subject === selectedSubject);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedSubject, selectedLevel]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="courses">
      <div className="container">
        {/* Header */}
        <div className="courses-header">
          <h1 className="courses-title">Explore Courses</h1>
          <p className="courses-description">
            Discover a wide range of educational content designed for rural students in Nabha
          </p>
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              {subjects.map(subject => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filter-select"
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail">
                <div className="thumbnail-icon">{course.thumbnail}</div>
                <div className="course-badges">
                  {course.isOffline && (
                    <span className="badge offline-badge">
                      <Download className="badge-icon" />
                      Offline
                    </span>
                  )}
                  <span className="badge level-badge">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
              </div>

              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-rating">
                    {renderStars(course.rating)}
                    <span className="rating-value">{course.rating}</span>
                  </div>
                </div>

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
                </div>

                <div className="course-instructor">
                  <span className="instructor-label">Instructor:</span>
                  <span className="instructor-name">{course.instructor}</span>
                </div>

                <div className="course-actions">
                  <Link 
                    to={`/course/${course.id}`} 
                    className="btn btn-primary course-btn"
                  >
                    <Play className="btn-icon" />
                    Start Course
                  </Link>
                  {course.isOffline && (
                    <button className="btn btn-secondary course-btn">
                      <Download className="btn-icon" />
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>No courses found</h3>
            <p>Try adjusting your search criteria or browse all courses.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedLevel('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

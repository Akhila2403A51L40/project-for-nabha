import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import './Progress.css';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const userStats = {
    totalCourses: 6,
    completedCourses: 2,
    totalLessons: 45,
    completedLessons: 18,
    totalStudyTime: 24, // hours
    currentStreak: 7, // days
    longestStreak: 15,
    averageScore: 85,
    certificates: 2
  };

  const recentActivity = [
    {
      id: 1,
      type: 'course_completed',
      title: 'Basic Mathematics for Class 6',
      date: '2024-01-15',
      score: 92,
      time: '2 hours'
    },
    {
      id: 2,
      type: 'lesson_completed',
      title: 'Introduction to Fractions',
      course: 'Mathematics',
      date: '2024-01-14',
      time: '25 minutes'
    },
    {
      id: 3,
      type: 'quiz_completed',
      title: 'Science Quiz - Class 7',
      date: '2024-01-13',
      score: 88,
      time: '15 minutes'
    },
    {
      id: 4,
      type: 'certificate_earned',
      title: 'English Grammar Certificate',
      date: '2024-01-12',
      score: 90
    },
    {
      id: 5,
      type: 'lesson_completed',
      title: 'हिंदी व्याकरण - कक्षा 8',
      course: 'Hindi',
      date: '2024-01-11',
      time: '30 minutes'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Basic Mathematics for Class 6',
      subject: 'Mathematics',
      progress: 100,
      status: 'completed',
      lessonsCompleted: 24,
      totalLessons: 24,
      lastAccessed: '2024-01-15',
      score: 92
    },
    {
      id: 2,
      title: 'Science Experiments - Class 7',
      subject: 'Science',
      progress: 75,
      status: 'in_progress',
      lessonsCompleted: 22,
      totalLessons: 30,
      lastAccessed: '2024-01-14',
      score: 85
    },
    {
      id: 3,
      title: 'English Grammar Basics',
      subject: 'English',
      progress: 60,
      status: 'in_progress',
      lessonsCompleted: 11,
      totalLessons: 18,
      lastAccessed: '2024-01-13',
      score: 78
    },
    {
      id: 4,
      title: 'हिंदी व्याकरण - कक्षा 8',
      subject: 'Hindi',
      progress: 40,
      status: 'in_progress',
      lessonsCompleted: 10,
      totalLessons: 25,
      lastAccessed: '2024-01-11',
      score: 82
    },
    {
      id: 5,
      title: 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ - ਕਲਾਸ 5',
      subject: 'Punjabi',
      progress: 20,
      status: 'not_started',
      lessonsCompleted: 4,
      totalLessons: 20,
      lastAccessed: '2024-01-10',
      score: 0
    },
    {
      id: 6,
      title: 'Social Studies - Indian History',
      subject: 'Social Studies',
      progress: 0,
      status: 'not_started',
      lessonsCompleted: 0,
      totalLessons: 40,
      lastAccessed: null,
      score: 0
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Course Complete',
      description: 'Completed your first course',
      icon: <Trophy className="achievement-icon" />,
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Math Master',
      description: 'Scored 90% or higher in Mathematics',
      icon: <Award className="achievement-icon" />,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 3,
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: <TrendingUp className="achievement-icon" />,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 4,
      title: 'Language Learner',
      description: 'Complete courses in 3 different languages',
      icon: <BookOpen className="achievement-icon" />,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: <Star className="achievement-icon" />,
      earned: false,
      date: null
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'course_completed':
        return <Trophy className="activity-icon completed" />;
      case 'lesson_completed':
        return <BookOpen className="activity-icon lesson" />;
      case 'quiz_completed':
        return <CheckCircle className="activity-icon quiz" />;
      case 'certificate_earned':
        return <Award className="activity-icon certificate" />;
      default:
        return <BookOpen className="activity-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in_progress':
        return '#3b82f6';
      case 'not_started':
        return '#64748b';
      default:
        return '#64748b';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="progress">
      <div className="container">
        <div className="progress-header">
          <h1 className="progress-title">Your Learning Progress</h1>
          <p className="progress-description">
            Track your educational journey and celebrate your achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.completedCourses}/{userStats.totalCourses}</div>
              <div className="stat-label">Courses Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.completedLessons}/{userStats.totalLessons}</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.totalStudyTime}h</div>
              <div className="stat-label">Study Time</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.currentStreak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Target className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.averageScore}%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Award className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{userStats.certificates}</div>
              <div className="stat-label">Certificates</div>
            </div>
          </div>
        </div>

        <div className="progress-content">
          {/* Courses Progress */}
          <div className="progress-section">
            <div className="section-header">
              <h2 className="section-title">Course Progress</h2>
              <Link to="/courses" className="view-all-link">
                View All Courses
                <ArrowRight className="link-icon" />
              </Link>
            </div>

            <div className="courses-progress">
              {courses.map(course => (
                <div key={course.id} className="course-progress-card">
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-subject">{course.subject}</p>
                    <div className="course-meta">
                      <span className="lessons-progress">
                        {course.lessonsCompleted}/{course.totalLessons} lessons
                      </span>
                      {course.lastAccessed && (
                        <span className="last-accessed">
                          Last accessed: {formatDate(course.lastAccessed)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="progress-info">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${course.progress}%`,
                          backgroundColor: getStatusColor(course.status)
                        }}
                      ></div>
                    </div>
                    <div className="progress-details">
                      <span className="progress-percentage">{course.progress}%</span>
                      <span 
                        className="progress-status"
                        style={{ color: getStatusColor(course.status) }}
                      >
                        {course.status.replace('_', ' ')}
                      </span>
                    </div>
                    {course.score > 0 && (
                      <div className="course-score">
                        <Star className="score-icon" />
                        <span>{course.score}%</span>
                      </div>
                    )}
                  </div>

                  <div className="course-actions">
                    <Link 
                      to={`/course/${course.id}`}
                      className="btn btn-primary course-btn"
                    >
                      {course.status === 'completed' ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="progress-section">
            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
              <div className="period-selector">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="period-select"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon-wrapper">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <h4 className="activity-title">{activity.title}</h4>
                    {activity.course && (
                      <p className="activity-course">{activity.course}</p>
                    )}
                    <div className="activity-meta">
                      <span className="activity-date">
                        <Calendar className="meta-icon" />
                        {formatDate(activity.date)}
                      </span>
                      {activity.time && (
                        <span className="activity-time">
                          <Clock className="meta-icon" />
                          {activity.time}
                        </span>
                      )}
                      {activity.score && (
                        <span className="activity-score">
                          <Star className="meta-icon" />
                          {activity.score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="progress-section">
            <div className="section-header">
              <h2 className="section-title">Achievements</h2>
              <span className="achievement-count">
                {achievements.filter(a => a.earned).length}/{achievements.length} earned
              </span>
            </div>

            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <div className="achievement-icon-wrapper">
                    {achievement.icon}
                  </div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                    {achievement.earned && (
                      <span className="achievement-date">
                        Earned on {formatDate(achievement.date)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

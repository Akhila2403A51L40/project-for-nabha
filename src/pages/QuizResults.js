import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  XCircle,
  BarChart3,
  Award,
  BookOpen,
  Calendar,
  Star
} from 'lucide-react';
import { quizAnalysis } from '../utils/quizAnalysis';
import './QuizResults.css';

const QuizResults = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizResults();
  }, [quizId]);

  const loadQuizResults = () => {
    const quizResults = quizAnalysis.getResultsByQuiz(quizId);
    const quizAnalytics = quizAnalysis.getQuizAnalytics(quizId);
    
    setResults(quizResults);
    setAnalytics(quizAnalytics);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return '#10b981';
      case 'B+':
      case 'B':
        return '#3b82f6';
      case 'C+':
      case 'C':
        return '#f59e0b';
      default:
        return '#ef4444';
    }
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Excellent', color: '#10b981' };
    if (percentage >= 70) return { level: 'Good', color: '#3b82f6' };
    if (percentage >= 50) return { level: 'Average', color: '#f59e0b' };
    return { level: 'Needs Improvement', color: '#ef4444' };
  };

  if (loading) {
    return (
      <div className="quiz-results">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading quiz results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-results">
      <div className="container">
        {/* Header */}
        <div className="results-header">
          <div className="header-content">
            <Link to="/quizzes" className="back-link">
              <ArrowLeft className="back-icon" />
              Back to Quizzes
            </Link>
            <h1 className="results-title">Quiz Results & Analysis</h1>
            <p className="results-description">
              Detailed performance analysis and insights for Quiz #{quizId}
            </p>
          </div>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="analytics-overview">
            <h2 className="section-title">Quiz Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="card-icon">
                  <BarChart3 className="icon" />
                </div>
                <div className="card-content">
                  <span className="card-value">{analytics.totalAttempts}</span>
                  <span className="card-label">Total Attempts</span>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="card-icon">
                  <Target className="icon" />
                </div>
                <div className="card-content">
                  <span className="card-value">{analytics.averageScore}%</span>
                  <span className="card-label">Average Score</span>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="card-icon">
                  <Trophy className="icon" />
                </div>
                <div className="card-content">
                  <span className="card-value">{analytics.highestScore}%</span>
                  <span className="card-label">Highest Score</span>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="card-icon">
                  <Clock className="icon" />
                </div>
                <div className="card-content">
                  <span className="card-value">{formatTime(analytics.averageTimeSpent)}</span>
                  <span className="card-label">Avg. Time</span>
                </div>
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="performance-distribution">
              <h3 className="subsection-title">Performance Distribution</h3>
              <div className="distribution-bars">
                <div className="distribution-item">
                  <span className="dist-label">Excellent (90%+)</span>
                  <div className="dist-bar">
                    <div 
                      className="dist-fill excellent" 
                      style={{ width: `${(analytics.performanceDistribution.excellent / analytics.totalAttempts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="dist-count">{analytics.performanceDistribution.excellent}</span>
                </div>
                
                <div className="distribution-item">
                  <span className="dist-label">Good (70-89%)</span>
                  <div className="dist-bar">
                    <div 
                      className="dist-fill good" 
                      style={{ width: `${(analytics.performanceDistribution.good / analytics.totalAttempts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="dist-count">{analytics.performanceDistribution.good}</span>
                </div>
                
                <div className="distribution-item">
                  <span className="dist-label">Average (50-69%)</span>
                  <div className="dist-bar">
                    <div 
                      className="dist-fill average" 
                      style={{ width: `${(analytics.performanceDistribution.average / analytics.totalAttempts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="dist-count">{analytics.performanceDistribution.average}</span>
                </div>
                
                <div className="distribution-item">
                  <span className="dist-label">Needs Improvement (&lt;50%)</span>
                  <div className="dist-bar">
                    <div 
                      className="dist-fill poor" 
                      style={{ width: `${(analytics.performanceDistribution.poor / analytics.totalAttempts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="dist-count">{analytics.performanceDistribution.poor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Individual Results */}
        <div className="individual-results">
          <h2 className="section-title">Individual Results</h2>
          
          {results.length === 0 ? (
            <div className="no-results">
              <BookOpen className="no-results-icon" />
              <h3>No Results Yet</h3>
              <p>No students have attempted this quiz yet.</p>
              <Link to="/quizzes" className="btn btn-primary">
                Browse Quizzes
              </Link>
            </div>
          ) : (
            <div className="results-list">
              {results.map((result, index) => {
                const performance = getPerformanceLevel(result.percentage);
                return (
                  <div key={result.id} className="result-card">
                    <div className="result-header">
                      <div className="result-info">
                        <h3 className="result-title">Attempt #{index + 1}</h3>
                        <div className="result-meta">
                          <span className="meta-item">
                            <Calendar className="meta-icon" />
                            {formatDate(result.timestamp)}
                          </span>
                          <span className="meta-item">
                            <Clock className="meta-icon" />
                            {formatTime(result.timeSpent)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="result-score">
                        <div className="score-circle">
                          <span className="score-value">{result.percentage}%</span>
                        </div>
                        <div className="score-details">
                          <span 
                            className="grade-badge"
                            style={{ backgroundColor: getGradeColor(result.grade) }}
                          >
                            {result.grade}
                          </span>
                          <span 
                            className="performance-badge"
                            style={{ color: performance.color }}
                          >
                            {performance.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="result-stats">
                      <div className="stat-item">
                        <CheckCircle className="stat-icon correct" />
                        <span className="stat-label">Correct</span>
                        <span className="stat-value">{result.correctAnswers}</span>
                      </div>
                      
                      <div className="stat-item">
                        <XCircle className="stat-icon wrong" />
                        <span className="stat-label">Wrong</span>
                        <span className="stat-value">{result.wrongAnswers}</span>
                      </div>
                      
                      <div className="stat-item">
                        <BookOpen className="stat-icon" />
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{result.totalQuestions}</span>
                      </div>
                    </div>

                    {/* Strengths and Weaknesses */}
                    {(result.strengths.length > 0 || result.weaknesses.length > 0) && (
                      <div className="result-analysis">
                        {result.strengths.length > 0 && (
                          <div className="analysis-section">
                            <h4 className="analysis-title">
                              <TrendingUp className="analysis-icon" />
                              Strengths
                            </h4>
                            <ul className="analysis-list">
                              {result.strengths.map((strength, idx) => (
                                <li key={idx} className="analysis-item strength">
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.weaknesses.length > 0 && (
                          <div className="analysis-section">
                            <h4 className="analysis-title">
                              <TrendingDown className="analysis-icon" />
                              Areas for Improvement
                            </h4>
                            <ul className="analysis-list">
                              {result.weaknesses.map((weakness, idx) => (
                                <li key={idx} className="analysis-item weakness">
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                      <div className="recommendations">
                        <h4 className="recommendations-title">
                          <Award className="recommendations-icon" />
                          Recommendations
                        </h4>
                        <ul className="recommendations-list">
                          {result.recommendations.map((recommendation, idx) => (
                            <li key={idx} className="recommendation-item">
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;

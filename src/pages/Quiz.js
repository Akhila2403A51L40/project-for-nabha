import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  RotateCcw,
  Home
} from 'lucide-react';
import './Quiz.css';

const Quiz = () => {
  const { courseId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    1: {
      title: "Mathematics Quiz - Fractions",
      totalQuestions: 5,
      timeLimit: 10, // minutes
      questions: [
        {
          id: 1,
          question: "What is 1/2 + 1/4?",
          options: ["1/6", "2/6", "3/4", "1/4"],
          correct: 2,
          explanation: "1/2 + 1/4 = 2/4 + 1/4 = 3/4"
        },
        {
          id: 2,
          question: "Which fraction is equivalent to 0.5?",
          options: ["1/3", "1/2", "2/3", "3/4"],
          correct: 1,
          explanation: "0.5 = 1/2"
        },
        {
          id: 3,
          question: "What is 3/4 - 1/4?",
          options: ["1/4", "1/2", "2/4", "4/4"],
          correct: 1,
          explanation: "3/4 - 1/4 = 2/4 = 1/2"
        },
        {
          id: 4,
          question: "Which is larger: 2/3 or 3/4?",
          options: ["2/3", "3/4", "They are equal", "Cannot determine"],
          correct: 1,
          explanation: "3/4 = 0.75 and 2/3 = 0.67, so 3/4 is larger"
        },
        {
          id: 5,
          question: "What is 1/3 × 3?",
          options: ["1/9", "1/3", "1", "3"],
          correct: 2,
          explanation: "1/3 × 3 = 3/3 = 1"
        }
      ]
    }
  };

  const quiz = quizData[courseId];

  useEffect(() => {
    if (!quiz) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = {
        questionId: quiz.questions[currentQuestion].id,
        selectedAnswer,
        isCorrect: selectedAnswer === quiz.questions[currentQuestion].correct
      };
      setAnswers(newAnswers);

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        setShowResults(true);
      }
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = {
        questionId: quiz.questions[currentQuestion].id,
        selectedAnswer,
        isCorrect: selectedAnswer === quiz.questions[currentQuestion].correct
      };
      setAnswers(newAnswers);
    }
    setQuizCompleted(true);
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(600);
    setQuizCompleted(false);
    setShowResults(false);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(answer => answer && answer.isCorrect).length;
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! You have a great understanding of fractions!";
    if (score >= 60) return "Good job! You understand most concepts.";
    if (score >= 40) return "Not bad! Review the concepts and try again.";
    return "Keep practicing! You'll get better with more study.";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  if (!quiz) {
    return (
      <div className="quiz">
        <div className="container">
          <div className="not-found">
            <h2>Quiz not found</h2>
            <Link to="/courses" className="btn btn-primary">
              <ArrowLeft className="btn-icon" />
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = answers.filter(answer => answer && answer.isCorrect).length;

    return (
      <div className="quiz">
        <div className="container">
          <div className="quiz-header">
            <Link to={`/course/${courseId}`} className="back-btn">
              <ArrowLeft className="btn-icon" />
              Back to Course
            </Link>
            <h1 className="quiz-title">Quiz Results</h1>
          </div>

          <div className="results-container">
            <div className="results-card">
              <div className="score-display">
                <Trophy className="trophy-icon" style={{ color: getScoreColor(score) }} />
                <div className="score-info">
                  <h2 className="score-title">Your Score</h2>
                  <div className="score-value" style={{ color: getScoreColor(score) }}>
                    {score}%
                  </div>
                  <p className="score-details">
                    {correctAnswers} out of {quiz.questions.length} correct
                  </p>
                </div>
              </div>

              <div className="score-message">
                <p style={{ color: getScoreColor(score) }}>
                  {getScoreMessage(score)}
                </p>
              </div>

              <div className="question-review">
                <h3>Question Review</h3>
                {quiz.questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer && userAnswer.isCorrect;
                  
                  return (
                    <div key={question.id} className="review-item">
                      <div className="review-header">
                        <span className="question-number">Q{index + 1}</span>
                        <div className="review-status">
                          {isCorrect ? (
                            <CheckCircle className="status-icon correct" />
                          ) : (
                            <XCircle className="status-icon incorrect" />
                          )}
                        </div>
                      </div>
                      <p className="review-question">{question.question}</p>
                      <div className="review-answers">
                        <div className="correct-answer">
                          <strong>Correct Answer:</strong> {question.options[question.correct]}
                        </div>
                        {userAnswer && (
                          <div className="user-answer">
                            <strong>Your Answer:</strong> {question.options[userAnswer.selectedAnswer]}
                          </div>
                        )}
                        <div className="explanation">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="results-actions">
                <button onClick={handleRestartQuiz} className="btn btn-primary">
                  <RotateCcw className="btn-icon" />
                  Retake Quiz
                </button>
                <Link to="/courses" className="btn btn-secondary">
                  <Home className="btn-icon" />
                  Back to Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="quiz">
      <div className="container">
        <div className="quiz-header">
          <Link to={`/course/${courseId}`} className="back-btn">
            <ArrowLeft className="btn-icon" />
            Back to Course
          </Link>
          <div className="quiz-info">
            <h1 className="quiz-title">{quiz.title}</h1>
            <div className="quiz-meta">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <div className="timer">
                <Clock className="timer-icon" />
                <span className={timeLeft < 60 ? 'time-warning' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="question-card">
            <div className="question-header">
              <h2 className="question-text">{currentQ.question}</h2>
            </div>

            <div className="options-container">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            <div className="question-actions">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="btn btn-primary next-btn"
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

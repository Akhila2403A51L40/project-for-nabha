// Quiz Analysis Service - tracks student performance and provides detailed analytics
const STORAGE_KEY = 'quiz_results';

export const quizAnalysis = {
  // Save quiz result
  saveQuizResult: (quizId, result) => {
    try {
      const existingResults = quizAnalysis.getQuizResults();
      const quizResult = {
        id: Date.now().toString(),
        quizId: quizId,
        studentId: 'student_' + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        score: result.score,
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        timeSpent: result.timeSpent,
        percentage: result.percentage,
        grade: result.grade,
        subject: result.subject,
        level: result.level,
        difficulty: result.difficulty,
        answers: result.answers,
        strengths: result.strengths || [],
        weaknesses: result.weaknesses || [],
        recommendations: result.recommendations || []
      };

      existingResults.push(quizResult);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingResults));
      
      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('quizResultSaved', { detail: quizResult }));
      
      return quizResult;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return null;
    }
  },

  // Get all quiz results
  getQuizResults: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving quiz results:', error);
      return [];
    }
  },

  // Get results by quiz ID
  getResultsByQuiz: (quizId) => {
    const allResults = quizAnalysis.getQuizResults();
    return allResults.filter(result => result.quizId === quizId);
  },

  // Get results by subject
  getResultsBySubject: (subject) => {
    const allResults = quizAnalysis.getQuizResults();
    return allResults.filter(result => result.subject === subject);
  },

  // Get results by level
  getResultsByLevel: (level) => {
    const allResults = quizAnalysis.getQuizResults();
    return allResults.filter(result => result.level === level);
  },

  // Get student's performance summary
  getStudentPerformance: (studentId) => {
    const allResults = quizAnalysis.getQuizResults();
    const studentResults = allResults.filter(result => result.studentId === studentId);
    
    if (studentResults.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        subjectPerformance: {},
        levelPerformance: {},
        recentPerformance: [],
        improvementTrend: 'stable'
      };
    }

    const totalQuizzes = studentResults.length;
    const averageScore = studentResults.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes;
    const totalTimeSpent = studentResults.reduce((sum, result) => sum + result.timeSpent, 0);

    // Subject-wise performance
    const subjectPerformance = {};
    studentResults.forEach(result => {
      if (!subjectPerformance[result.subject]) {
        subjectPerformance[result.subject] = {
          totalQuizzes: 0,
          averageScore: 0,
          totalScore: 0
        };
      }
      subjectPerformance[result.subject].totalQuizzes++;
      subjectPerformance[result.subject].totalScore += result.percentage;
      subjectPerformance[result.subject].averageScore = 
        subjectPerformance[result.subject].totalScore / subjectPerformance[result.subject].totalQuizzes;
    });

    // Level-wise performance
    const levelPerformance = {};
    studentResults.forEach(result => {
      if (!levelPerformance[result.level]) {
        levelPerformance[result.level] = {
          totalQuizzes: 0,
          averageScore: 0,
          totalScore: 0
        };
      }
      levelPerformance[result.level].totalQuizzes++;
      levelPerformance[result.level].totalScore += result.percentage;
      levelPerformance[result.level].averageScore = 
        levelPerformance[result.level].totalScore / levelPerformance[result.level].totalQuizzes;
    });

    // Recent performance (last 10 quizzes)
    const recentPerformance = studentResults
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
      .map(result => ({
        quizId: result.quizId,
        subject: result.subject,
        score: result.percentage,
        date: result.timestamp
      }));

    // Improvement trend
    let improvementTrend = 'stable';
    if (recentPerformance.length >= 3) {
      const recent = recentPerformance.slice(0, 3).reduce((sum, r) => sum + r.score, 0) / 3;
      const older = recentPerformance.slice(-3).reduce((sum, r) => sum + r.score, 0) / 3;
      if (recent > older + 5) improvementTrend = 'improving';
      else if (recent < older - 5) improvementTrend = 'declining';
    }

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore * 100) / 100,
      totalTimeSpent,
      subjectPerformance,
      levelPerformance,
      recentPerformance,
      improvementTrend
    };
  },

  // Get detailed analytics for a specific quiz
  getQuizAnalytics: (quizId) => {
    const results = quizAnalysis.getResultsByQuiz(quizId);
    
    if (results.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        averageTimeSpent: 0,
        difficultyAnalysis: {},
        commonMistakes: [],
        performanceDistribution: {}
      };
    }

    const totalAttempts = results.length;
    const scores = results.map(r => r.percentage);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / totalAttempts;
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const averageTimeSpent = results.reduce((sum, r) => sum + r.timeSpent, 0) / totalAttempts;

    // Performance distribution
    const performanceDistribution = {
      excellent: results.filter(r => r.percentage >= 90).length,
      good: results.filter(r => r.percentage >= 70 && r.percentage < 90).length,
      average: results.filter(r => r.percentage >= 50 && r.percentage < 70).length,
      poor: results.filter(r => r.percentage < 50).length
    };

    // Common mistakes analysis
    const allAnswers = results.flatMap(r => r.answers);
    const mistakeCount = {};
    allAnswers.forEach(answer => {
      if (!answer.isCorrect) {
        const key = `${answer.questionId}_${answer.selectedAnswer}`;
        mistakeCount[key] = (mistakeCount[key] || 0) + 1;
      }
    });

    const commonMistakes = Object.entries(mistakeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([key, count]) => ({
        questionId: key.split('_')[0],
        wrongAnswer: key.split('_')[1],
        frequency: count
      }));

    return {
      totalAttempts,
      averageScore: Math.round(averageScore * 100) / 100,
      highestScore,
      lowestScore,
      averageTimeSpent: Math.round(averageTimeSpent),
      performanceDistribution,
      commonMistakes
    };
  },

  // Generate performance insights
  generateInsights: (studentId) => {
    const performance = quizAnalysis.getStudentPerformance(studentId);
    const insights = [];

    // Overall performance insight
    if (performance.averageScore >= 80) {
      insights.push({
        type: 'success',
        title: 'Excellent Performance!',
        message: `You're maintaining an average score of ${performance.averageScore}%. Keep up the great work!`
      });
    } else if (performance.averageScore >= 60) {
      insights.push({
        type: 'info',
        title: 'Good Progress',
        message: `Your average score is ${performance.averageScore}%. There's room for improvement in some areas.`
      });
    } else {
      insights.push({
        type: 'warning',
        title: 'Needs Improvement',
        message: `Your average score is ${performance.averageScore}%. Focus on reviewing difficult topics.`
      });
    }

    // Subject-wise insights
    Object.entries(performance.subjectPerformance).forEach(([subject, data]) => {
      if (data.averageScore >= 85) {
        insights.push({
          type: 'success',
          title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Strength`,
          message: `You're excelling in ${subject} with ${data.averageScore}% average score.`
        });
      } else if (data.averageScore < 60) {
        insights.push({
          type: 'warning',
          title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Focus Area`,
          message: `${subject} needs more attention. Your average is ${data.averageScore}%.`
        });
      }
    });

    // Improvement trend insight
    if (performance.improvementTrend === 'improving') {
      insights.push({
        type: 'success',
        title: 'Improvement Trend',
        message: 'Your recent performance shows improvement! Keep up the momentum.'
      });
    } else if (performance.improvementTrend === 'declining') {
      insights.push({
        type: 'warning',
        title: 'Performance Alert',
        message: 'Your recent scores have declined. Consider reviewing previous topics.'
      });
    }

    return insights;
  },

  // Clear all results (for testing)
  clearAllResults: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('quizResultsCleared'));
      return true;
    } catch (error) {
      console.error('Error clearing quiz results:', error);
      return false;
    }
  }
};

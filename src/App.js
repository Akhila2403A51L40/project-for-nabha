import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import QuizList from './pages/QuizList';
import QuizResults from './pages/QuizResults';
import Progress from './pages/Progress';
import About from './pages/About';
import Downloads from './pages/Downloads';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quiz/:courseId" element={<Quiz />} />
                <Route path="/quiz-results/:quizId" element={<QuizResults />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<ProtectedRoute roles={["admin"]} element={<AdminDashboard />} />} />
                <Route path="/dashboard" element={<ProtectedRoute roles={["student","admin"]} element={<StudentDashboard />} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

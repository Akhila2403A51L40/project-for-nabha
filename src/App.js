import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
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
import './App.css';

function App() {
  return (
    <LanguageProvider>
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

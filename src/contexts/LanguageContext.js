import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    courses: 'Courses',
    progress: 'Progress',
    about: 'About',
    
    // Common
    startLearning: 'Start Learning',
    learnMore: 'Learn More',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    download: 'Download',
    offline: 'Offline',
    online: 'Online',
    
    // Home Page
    heroTitle: 'Empowering Rural Education in',
    heroDescription: 'A comprehensive digital learning platform designed specifically for rural school students. Access quality education, interactive content, and progress tracking - all in your local language.',
    students: 'Students',
    coursesCount: 'Courses',
    schools: 'Schools',
    
    // Features
    interactiveLearning: 'Interactive Learning',
    interactiveLearningDesc: 'Engaging multimedia content designed for rural students',
    offlineAccess: 'Offline Access',
    offlineAccessDesc: 'Download content for learning without internet connection',
    communitySupport: 'Community Support',
    communitySupportDesc: 'Connect with teachers and fellow students',
    progressTracking: 'Progress Tracking',
    progressTrackingDesc: 'Monitor your learning journey with detailed analytics',
    
    // Subjects
    mathematics: 'Mathematics',
    science: 'Science',
    english: 'English',
    hindi: 'Hindi',
    punjabi: 'Punjabi',
    socialStudies: 'Social Studies',
    
    // Course Page
    exploreCourses: 'Explore Courses',
    searchCourses: 'Search courses...',
    allSubjects: 'All Subjects',
    allLevels: 'All Levels',
    primary: 'Primary (1-5)',
    middle: 'Middle (6-8)',
    secondary: 'Secondary (9-10)',
    showingResults: 'Showing {count} of {total} courses',
    noCoursesFound: 'No courses found',
    tryAdjustingSearch: 'Try adjusting your search criteria or browse all courses.',
    clearFilters: 'Clear Filters',
    
    // Course Detail
    aboutThisCourse: 'About This Course',
    whatYoullLearn: 'What You\'ll Learn',
    courseCurriculum: 'Course Curriculum',
    instructor: 'Instructor',
    courseStatistics: 'Course Statistics',
    lessons: 'Lessons',
    duration: 'Duration',
    students: 'Students',
    offlineAccess: 'Offline Access',
    downloadCourse: 'Download Course',
    
    // Quiz
    quizResults: 'Quiz Results',
    yourScore: 'Your Score',
    questionReview: 'Question Review',
    correctAnswer: 'Correct Answer',
    yourAnswer: 'Your Answer',
    explanation: 'Explanation',
    retakeQuiz: 'Retake Quiz',
    backToCourses: 'Back to Courses',
    
    // Progress
    yourLearningProgress: 'Your Learning Progress',
    trackYourJourney: 'Track your educational journey and celebrate your achievements',
    coursesCompleted: 'Courses Completed',
    lessonsCompleted: 'Lessons Completed',
    studyTime: 'Study Time',
    dayStreak: 'Day Streak',
    averageScore: 'Average Score',
    certificates: 'Certificates',
    courseProgress: 'Course Progress',
    viewAllCourses: 'View All Courses',
    recentActivity: 'Recent Activity',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allTime: 'All Time',
    achievements: 'Achievements',
    earned: 'earned',
    
    // About
    ourMission: 'Our Mission',
    ourValues: 'Our Values',
    ourTeam: 'Our Team',
    ourJourney: 'Our Journey',
    whatPeopleSay: 'What People Say',
    getInTouch: 'Get in Touch',
    haveQuestions: 'Have questions or want to partner with us? We\'d love to hear from you.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    yourMessage: 'Your Message',
    sendMessage: 'Send Message'
  },
  
  hi: {
    // Navigation
    home: 'होम',
    courses: 'कोर्स',
    progress: 'प्रगति',
    about: 'हमारे बारे में',
    
    // Common
    startLearning: 'सीखना शुरू करें',
    learnMore: 'और जानें',
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'अगला',
    submit: 'जमा करें',
    download: 'डाउनलोड',
    offline: 'ऑफलाइन',
    online: 'ऑनलाइन',
    
    // Home Page
    heroTitle: 'नाभा में ग्रामीण शिक्षा को सशक्त बनाना',
    heroDescription: 'ग्रामीण स्कूली छात्रों के लिए विशेष रूप से डिज़ाइन किया गया एक व्यापक डिजिटल लर्निंग प्लेटफॉर्म। गुणवत्तापूर्ण शिक्षा, इंटरैक्टिव सामग्री और प्रगति ट्रैकिंग तक पहुंचें - सभी आपकी स्थानीय भाषा में।',
    students: 'छात्र',
    coursesCount: 'कोर्स',
    schools: 'स्कूल',
    
    // Features
    interactiveLearning: 'इंटरैक्टिव लर्निंग',
    interactiveLearningDesc: 'ग्रामीण छात्रों के लिए डिज़ाइन की गई आकर्षक मल्टीमीडिया सामग्री',
    offlineAccess: 'ऑफलाइन एक्सेस',
    offlineAccessDesc: 'इंटरनेट कनेक्शन के बिना सीखने के लिए सामग्री डाउनलोड करें',
    communitySupport: 'समुदाय सहायता',
    communitySupportDesc: 'शिक्षकों और साथी छात्रों के साथ जुड़ें',
    progressTracking: 'प्रगति ट्रैकिंग',
    progressTrackingDesc: 'विस्तृत एनालिटिक्स के साथ अपनी सीखने की यात्रा को ट्रैक करें',
    
    // Subjects
    mathematics: 'गणित',
    science: 'विज्ञान',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    punjabi: 'पंजाबी',
    socialStudies: 'सामाजिक अध्ययन',
    
    // Course Page
    exploreCourses: 'कोर्स एक्सप्लोर करें',
    searchCourses: 'कोर्स खोजें...',
    allSubjects: 'सभी विषय',
    allLevels: 'सभी स्तर',
    primary: 'प्राथमिक (1-5)',
    middle: 'मध्य (6-8)',
    secondary: 'माध्यमिक (9-10)',
    showingResults: '{total} में से {count} कोर्स दिखाए जा रहे हैं',
    noCoursesFound: 'कोई कोर्स नहीं मिला',
    tryAdjustingSearch: 'अपने खोज मानदंड को समायोजित करने का प्रयास करें या सभी कोर्स ब्राउज़ करें।',
    clearFilters: 'फिल्टर साफ़ करें'
  },
  
  pa: {
    // Navigation
    home: 'ਘਰ',
    courses: 'ਕੋਰਸ',
    progress: 'ਤਰੱਕੀ',
    about: 'ਸਾਡੇ ਬਾਰੇ',
    
    // Common
    startLearning: 'ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ',
    learnMore: 'ਹੋਰ ਜਾਣੋ',
    continue: 'ਜਾਰੀ ਰੱਖੋ',
    back: 'ਵਾਪਸ',
    next: 'ਅਗਲਾ',
    submit: 'ਜਮ੍ਹਾ ਕਰੋ',
    download: 'ਡਾਉਨਲੋਡ',
    offline: 'ਔਫਲਾਈਨ',
    online: 'ਔਨਲਾਈਨ',
    
    // Home Page
    heroTitle: 'ਨਾਭਾ ਵਿੱਚ ਪੇਂਡੂ ਸਿੱਖਿਆ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ',
    heroDescription: 'ਪੇਂਡੂ ਸਕੂਲੀ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ \'ਤੇ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਇੱਕ ਵਿਆਪਕ ਡਿਜੀਟਲ ਸਿੱਖਣ ਦਾ ਪਲੇਟਫਾਰਮ। ਗੁਣਵੱਤਾਪੂਰਨ ਸਿੱਖਿਆ, ਇੰਟਰਐਕਟਿਵ ਸਮਗਰੀ ਅਤੇ ਤਰੱਕੀ ਟ੍ਰੈਕਿੰਗ ਤੱਕ ਪਹੁੰਚ ਕਰੋ - ਸਭ ਤੁਹਾਡੀ ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ।',
    students: 'ਵਿਦਿਆਰਥੀ',
    coursesCount: 'ਕੋਰਸ',
    schools: 'ਸਕੂਲ',
    
    // Features
    interactiveLearning: 'ਇੰਟਰਐਕਟਿਵ ਸਿੱਖਣ',
    interactiveLearningDesc: 'ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀ ਗਈ ਦਿਲਚਸਪ ਮਲਟੀਮੀਡੀਆ ਸਮਗਰੀ',
    offlineAccess: 'ਔਫਲਾਈਨ ਪਹੁੰਚ',
    offlineAccessDesc: 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਤੋਂ ਬਿਨਾਂ ਸਿੱਖਣ ਲਈ ਸਮਗਰੀ ਡਾਉਨਲੋਡ ਕਰੋ',
    communitySupport: 'ਕਮਿਊਨਿਟੀ ਸਹਾਇਤਾ',
    communitySupportDesc: 'ਅਧਿਆਪਕਾਂ ਅਤੇ ਸਾਥੀ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਜੁੜੋ',
    progressTracking: 'ਤਰੱਕੀ ਟ੍ਰੈਕਿੰਗ',
    progressTrackingDesc: 'ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਾਲ ਆਪਣੀ ਸਿੱਖਣ ਦੀ ਯਾਤਰਾ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ',
    
    // Subjects
    mathematics: 'ਗਣਿਤ',
    science: 'ਵਿਗਿਆਨ',
    english: 'ਅੰਗਰੇਜ਼ੀ',
    hindi: 'ਹਿੰਦੀ',
    punjabi: 'ਪੰਜਾਬੀ',
    socialStudies: 'ਸਮਾਜਿਕ ਅਧਿਐਨ',
    
    // Course Page
    exploreCourses: 'ਕੋਰਸ ਖੋਜੋ',
    searchCourses: 'ਕੋਰਸ ਖੋਜੋ...',
    allSubjects: 'ਸਾਰੇ ਵਿਸ਼ੇ',
    allLevels: 'ਸਾਰੇ ਪੱਧਰ',
    primary: 'ਪ੍ਰਾਇਮਰੀ (1-5)',
    middle: 'ਮਿਡਲ (6-8)',
    secondary: 'ਸੈਕੰਡਰੀ (9-10)',
    showingResults: '{total} ਵਿੱਚੋਂ {count} ਕੋਰਸ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ',
    noCoursesFound: 'ਕੋਈ ਕੋਰਸ ਨਹੀਂ ਮਿਲਿਆ',
    tryAdjustingSearch: 'ਆਪਣੇ ਖੋਜ ਮਾਪਦੰਡਾਂ ਨੂੰ ਅਡਜਸਟ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ ਜਾਂ ਸਾਰੇ ਕੋਰਸ ਬ੍ਰਾਊਜ਼ ਕਰੋ।',
    clearFilters: 'ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key, params = {}) => {
    let translation = translations[language][key] || translations['en'][key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

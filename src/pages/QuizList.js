import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Star,
  Search,
  Filter,
  Play,
  BarChart3
} from 'lucide-react';
import './QuizList.css';

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

const quizzes = [
    // Mathematics Quizzes (10 quizzes)
    {
      id: 1,
      title: "Mathematics Quiz - Fractions",
      subject: "mathematics",
      level: "middle",
      description: "Test your understanding of fractions, decimals, and basic operations.",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "Basic Mathematics for Class 6",
      thumbnail: "🔢",
      rating: 4.8,
      attempts: 156
    },
    {
      id: 2,
      title: "Algebra Basics Quiz",
      subject: "mathematics",
      level: "middle",
      description: "Fundamental algebraic concepts including variables, equations, and expressions.",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "Basic Mathematics for Class 6",
      thumbnail: "📐",
      rating: 4.6,
      attempts: 98
    },
    {
      id: 3,
      title: "Geometry Quiz - Shapes & Angles",
      subject: "mathematics",
      level: "middle",
      description: "Test your knowledge of geometric shapes, angles, and basic properties.",
      duration: "15 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "Basic Mathematics for Class 6",
      thumbnail: "📏",
      rating: 4.7,
      attempts: 87
    },
    {
      id: 4,
      title: "Arithmetic Operations Quiz",
      subject: "mathematics",
      level: "primary",
      description: "Basic addition, subtraction, multiplication, and division problems.",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "Primary Mathematics",
      thumbnail: "➕",
      rating: 4.5,
      attempts: 234
    },
    {
      id: 5,
      title: "Percentage & Ratio Quiz",
      subject: "mathematics",
      level: "secondary",
      description: "Advanced problems involving percentages, ratios, and proportions.",
      duration: "18 minutes",
      questions: 10,
      difficulty: "Hard",
      courseTitle: "Advanced Mathematics",
      thumbnail: "📊",
      rating: 4.9,
      attempts: 67
    },
    {
      id: 6,
      title: "Number System Quiz",
      subject: "mathematics",
      level: "primary",
      description: "Understanding of natural numbers, whole numbers, and integers.",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Easy",
      courseTitle: "Primary Mathematics",
      thumbnail: "🔢",
      rating: 4.4,
      attempts: 189
    },
    {
      id: 7,
      title: "Measurement Quiz",
      subject: "mathematics",
      level: "middle",
      description: "Length, weight, capacity, and time measurement problems.",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "Practical Mathematics",
      thumbnail: "📏",
      rating: 4.3,
      attempts: 112
    },
    {
      id: 8,
      title: "Data Handling Quiz",
      subject: "mathematics",
      level: "middle",
      description: "Bar graphs, pie charts, and basic statistics interpretation.",
      duration: "14 minutes",
      questions: 7,
      difficulty: "Medium",
      courseTitle: "Statistics Basics",
      thumbnail: "📈",
      rating: 4.5,
      attempts: 78
    },
    {
      id: 9,
      title: "Trigonometry Quiz",
      subject: "mathematics",
      level: "secondary",
      description: "Basic trigonometric ratios and angle calculations.",
      duration: "20 minutes",
      questions: 12,
      difficulty: "Hard",
      courseTitle: "Advanced Mathematics",
      thumbnail: "📐",
      rating: 4.7,
      attempts: 45
    },
    {
      id: 10,
      title: "Probability Quiz",
      subject: "mathematics",
      level: "secondary",
      description: "Basic probability concepts and calculations.",
      duration: "16 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "Advanced Mathematics",
      thumbnail: "🎲",
      rating: 4.6,
      attempts: 52
    },

    // Science Quizzes (10 quizzes)
    {
      id: 11,
      title: "Physics Quiz - Motion & Force",
      subject: "science",
      level: "middle",
      description: "Questions about basic physics concepts including motion, force, and energy.",
      duration: "15 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "Science Experiments - Class 7",
      thumbnail: "🔬",
      rating: 4.6,
      attempts: 89
    },
    {
      id: 12,
      title: "Chemistry Quiz - Elements & Compounds",
      subject: "science",
      level: "middle",
      description: "Test your knowledge of chemical elements, compounds, and reactions.",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "Science Experiments - Class 7",
      thumbnail: "🧪",
      rating: 4.4,
      attempts: 76
    },
    {
      id: 13,
      title: "Biology Quiz - Human Body",
      subject: "science",
      level: "middle",
      description: "Questions about human body systems, organs, and basic biology.",
      duration: "14 minutes",
      questions: 7,
      difficulty: "Medium",
      courseTitle: "Science Experiments - Class 7",
      thumbnail: "🫀",
      rating: 4.5,
      attempts: 92
    },
    {
      id: 14,
      title: "Environmental Science Quiz",
      subject: "science",
      level: "primary",
      description: "Basic concepts about environment, pollution, and conservation.",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Easy",
      courseTitle: "Environmental Studies",
      thumbnail: "🌱",
      rating: 4.3,
      attempts: 145
    },
    {
      id: 15,
      title: "Astronomy Quiz - Solar System",
      subject: "science",
      level: "secondary",
      description: "Advanced questions about planets, stars, and the solar system.",
      duration: "20 minutes",
      questions: 12,
      difficulty: "Hard",
      courseTitle: "Advanced Science",
      thumbnail: "🌌",
      rating: 4.8,
      attempts: 54
    },
    {
      id: 16,
      title: "Light & Sound Quiz",
      subject: "science",
      level: "middle",
      description: "Properties of light and sound, reflection, refraction, and waves.",
      duration: "13 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "Physics Basics",
      thumbnail: "💡",
      rating: 4.4,
      attempts: 98
    },
    {
      id: 17,
      title: "Plant Life Quiz",
      subject: "science",
      level: "primary",
      description: "Basic concepts about plants, photosynthesis, and plant parts.",
      duration: "9 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "Nature Studies",
      thumbnail: "🌿",
      rating: 4.2,
      attempts: 167
    },
    {
      id: 18,
      title: "Animal Kingdom Quiz",
      subject: "science",
      level: "middle",
      description: "Classification of animals, habitats, and animal behavior.",
      duration: "11 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "Biology Basics",
      thumbnail: "🐾",
      rating: 4.5,
      attempts: 123
    },
    {
      id: 19,
      title: "Weather & Climate Quiz",
      subject: "science",
      level: "primary",
      description: "Weather patterns, seasons, and climate basics.",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "Environmental Studies",
      thumbnail: "🌤️",
      rating: 4.3,
      attempts: 134
    },
    {
      id: 20,
      title: "Electricity & Magnetism Quiz",
      subject: "science",
      level: "secondary",
      description: "Basic electrical concepts, circuits, and magnetic properties.",
      duration: "18 minutes",
      questions: 10,
      difficulty: "Hard",
      courseTitle: "Advanced Physics",
      thumbnail: "⚡",
      rating: 4.7,
      attempts: 67
    },

    // English Quizzes (10 quizzes)
    {
      id: 21,
      title: "English Grammar Quiz",
      subject: "english",
      level: "primary",
      description: "Test your knowledge of English grammar rules and sentence structure.",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Easy",
      courseTitle: "English Grammar Basics",
      thumbnail: "📚",
      rating: 4.7,
      attempts: 203
    },
    {
      id: 22,
      title: "Vocabulary & Spelling Quiz",
      subject: "english",
      level: "primary",
      description: "Test your English vocabulary and spelling skills with common words.",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Easy",
      courseTitle: "English Grammar Basics",
      thumbnail: "📝",
      rating: 4.6,
      attempts: 178
    },
    {
      id: 23,
      title: "Reading Comprehension Quiz",
      subject: "english",
      level: "middle",
      description: "Test your reading comprehension skills with passages and questions.",
      duration: "15 minutes",
      questions: 8,
      difficulty: "Medium",
      courseTitle: "English Literature",
      thumbnail: "📖",
      rating: 4.5,
      attempts: 134
    },
    {
      id: 24,
      title: "Creative Writing Quiz",
      subject: "english",
      level: "secondary",
      description: "Test your creative writing skills and literary techniques.",
      duration: "18 minutes",
      questions: 10,
      difficulty: "Hard",
      courseTitle: "Advanced English",
      thumbnail: "✍️",
      rating: 4.8,
      attempts: 89
    },
    {
      id: 25,
      title: "Parts of Speech Quiz",
      subject: "english",
      level: "primary",
      description: "Identify nouns, verbs, adjectives, and other parts of speech.",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "English Grammar Basics",
      thumbnail: "🔤",
      rating: 4.4,
      attempts: 156
    },
    {
      id: 26,
      title: "Tenses Quiz",
      subject: "english",
      level: "middle",
      description: "Present, past, and future tense usage and formation.",
      duration: "11 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "English Grammar",
      thumbnail: "⏰",
      rating: 4.5,
      attempts: 112
    },
    {
      id: 27,
      title: "Literature Quiz",
      subject: "english",
      level: "secondary",
      description: "Famous authors, books, and literary devices.",
      duration: "16 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "English Literature",
      thumbnail: "📚",
      rating: 4.7,
      attempts: 78
    },
    {
      id: 28,
      title: "Phonetics Quiz",
      subject: "english",
      level: "primary",
      description: "Pronunciation, sounds, and phonetic symbols.",
      duration: "9 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "English Pronunciation",
      thumbnail: "🔊",
      rating: 4.3,
      attempts: 98
    },
    {
      id: 29,
      title: "Idioms & Phrases Quiz",
      subject: "english",
      level: "middle",
      description: "Common English idioms, phrases, and their meanings.",
      duration: "13 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "English Expressions",
      thumbnail: "💬",
      rating: 4.6,
      attempts: 87
    },
    {
      id: 30,
      title: "Essay Writing Quiz",
      subject: "english",
      level: "secondary",
      description: "Essay structure, argumentation, and writing techniques.",
      duration: "20 minutes",
      questions: 12,
      difficulty: "Hard",
      courseTitle: "Advanced English",
      thumbnail: "📄",
      rating: 4.8,
      attempts: 65
    },

    // Hindi Quizzes (10 quizzes)
    {
      id: 31,
      title: "हिंदी व्याकरण क्विज़",
      subject: "hindi",
      level: "middle",
      description: "हिंदी व्याकरण के नियमों और अभ्यास पर आधारित प्रश्न।",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "हिंदी व्याकरण - कक्षा 8",
      thumbnail: "📖",
      rating: 4.5,
      attempts: 78
    },
    {
      id: 32,
      title: "हिंदी शब्दावली क्विज़",
      subject: "hindi",
      level: "primary",
      description: "हिंदी शब्दों के अर्थ और उपयोग पर आधारित प्रश्न।",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "हिंदी भाषा - कक्षा 5",
      thumbnail: "📝",
      rating: 4.4,
      attempts: 112
    },
    {
      id: 33,
      title: "हिंदी कविता क्विज़",
      subject: "hindi",
      level: "middle",
      description: "प्रसिद्ध हिंदी कवियों और उनकी कविताओं पर प्रश्न।",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "हिंदी साहित्य",
      thumbnail: "🎭",
      rating: 4.6,
      attempts: 67
    },
    {
      id: 34,
      title: "हिंदी निबंध क्विज़",
      subject: "hindi",
      level: "secondary",
      description: "हिंदी निबंध लेखन और साहित्यिक शैली पर प्रश्न।",
      duration: "16 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "उन्नत हिंदी",
      thumbnail: "📄",
      rating: 4.7,
      attempts: 45
    },
    {
      id: 35,
      title: "हिंदी वर्णमाला क्विज़",
      subject: "hindi",
      level: "primary",
      description: "हिंदी वर्णमाला, स्वर और व्यंजन की पहचान।",
      duration: "6 minutes",
      questions: 3,
      difficulty: "Easy",
      courseTitle: "हिंदी मूलभूत",
      thumbnail: "🔤",
      rating: 4.3,
      attempts: 145
    },
    {
      id: 36,
      title: "हिंदी मुहावरे क्विज़",
      subject: "hindi",
      level: "middle",
      description: "प्रसिद्ध हिंदी मुहावरों और उनके अर्थ।",
      duration: "11 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "हिंदी भाषा",
      thumbnail: "💬",
      rating: 4.5,
      attempts: 89
    },
    {
      id: 37,
      title: "हिंदी कहानी क्विज़",
      subject: "hindi",
      level: "middle",
      description: "प्रसिद्ध हिंदी कहानियों और लेखकों पर प्रश्न।",
      duration: "13 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "हिंदी साहित्य",
      thumbnail: "📚",
      rating: 4.6,
      attempts: 76
    },
    {
      id: 38,
      title: "हिंदी नाटक क्विज़",
      subject: "hindi",
      level: "secondary",
      description: "हिंदी नाटक और रंगमंच पर आधारित प्रश्न।",
      duration: "15 minutes",
      questions: 7,
      difficulty: "Hard",
      courseTitle: "हिंदी नाट्य साहित्य",
      thumbnail: "🎭",
      rating: 4.7,
      attempts: 34
    },
    {
      id: 39,
      title: "हिंदी भाषा का इतिहास क्विज़",
      subject: "hindi",
      level: "secondary",
      description: "हिंदी भाषा के विकास और इतिहास पर प्रश्न।",
      duration: "18 minutes",
      questions: 9,
      difficulty: "Hard",
      courseTitle: "हिंदी भाषा का इतिहास",
      thumbnail: "🏛️",
      rating: 4.8,
      attempts: 28
    },
    {
      id: 40,
      title: "हिंदी संस्कृति क्विज़",
      subject: "hindi",
      level: "primary",
      description: "हिंदी संस्कृति, त्योहार और परंपराओं पर प्रश्न।",
      duration: "9 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "हिंदी संस्कृति",
      thumbnail: "🎊",
      rating: 4.4,
      attempts: 98
    },

    // Punjabi Quizzes (10 quizzes)
    {
      id: 41,
      title: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "primary",
      description: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਦੇ ਮੂਲ ਸਿਧਾਂਤਾਂ ਅਤੇ ਵਿਆਕਰਣ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ - ਕਲਾਸ 5",
      thumbnail: "✍️",
      rating: 4.4,
      attempts: 45
    },
    {
      id: 42,
      title: "ਪੰਜਾਬੀ ਸ਼ਬਦਾਵਲੀ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "primary",
      description: "ਪੰਜਾਬੀ ਸ਼ਬਦਾਂ ਦੇ ਅਰਥ ਅਤੇ ਵਰਤੋਂ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Easy",
      courseTitle: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ - ਕਲਾਸ 5",
      thumbnail: "📚",
      rating: 4.3,
      attempts: 67
    },
    {
      id: 43,
      title: "ਪੰਜਾਬੀ ਕਵਿਤਾ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "middle",
      description: "ਪ੍ਰਸਿੱਧ ਪੰਜਾਬੀ ਕਵੀਆਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀਆਂ ਕਵਿਤਾਵਾਂ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "ਪੰਜਾਬੀ ਸਾਹਿਤ",
      thumbnail: "🎵",
      rating: 4.5,
      attempts: 34
    },
    {
      id: 44,
      title: "ਪੰਜਾਬੀ ਇਤਿਹਾਸ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "secondary",
      description: "ਪੰਜਾਬ ਦੇ ਇਤਿਹਾਸ ਅਤੇ ਸੱਭਿਆਚਾਰ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "15 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "ਪੰਜਾਬੀ ਇਤਿਹਾਸ",
      thumbnail: "🏛️",
      rating: 4.6,
      attempts: 28
    },
    {
      id: 45,
      title: "ਪੰਜਾਬੀ ਵਰਣਮਾਲਾ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "primary",
      description: "ਪੰਜਾਬੀ ਵਰਣਮਾਲਾ, ਸਵਰ ਅਤੇ ਵਿਅੰਜਨ ਦੀ ਪਛਾਣ।",
      duration: "6 minutes",
      questions: 3,
      difficulty: "Easy",
      courseTitle: "ਪੰਜਾਬੀ ਮੂਲਭੂਤ",
      thumbnail: "🔤",
      rating: 4.2,
      attempts: 89
    },
    {
      id: 46,
      title: "ਪੰਜਾਬੀ ਮੁਹਾਵਰੇ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "middle",
      description: "ਪ੍ਰਸਿੱਧ ਪੰਜਾਬੀ ਮੁਹਾਵਰੇ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਅਰਥ।",
      duration: "11 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "ਪੰਜਾਬੀ ਭਾਸ਼ਾ",
      thumbnail: "💬",
      rating: 4.4,
      attempts: 56
    },
    {
      id: 47,
      title: "ਪੰਜਾਬੀ ਕਹਾਣੀ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "middle",
      description: "ਪ੍ਰਸਿੱਧ ਪੰਜਾਬੀ ਕਹਾਣੀਆਂ ਅਤੇ ਲੇਖਕਾਂ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "13 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "ਪੰਜਾਬੀ ਸਾਹਿਤ",
      thumbnail: "📚",
      rating: 4.5,
      attempts: 43
    },
    {
      id: 48,
      title: "ਪੰਜਾਬੀ ਲੋਕ-ਕਲਾ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "primary",
      description: "ਪੰਜਾਬੀ ਲੋਕ-ਕਲਾ, ਗੀਤ ਅਤੇ ਨਾਚ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "9 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ",
      thumbnail: "🎭",
      rating: 4.3,
      attempts: 72
    },
    {
      id: 49,
      title: "ਪੰਜਾਬੀ ਧਰਮ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "secondary",
      description: "ਪੰਜਾਬੀ ਧਰਮ ਅਤੇ ਦਰਸ਼ਨ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "17 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "ਪੰਜਾਬੀ ਦਰਸ਼ਨ",
      thumbnail: "🕉️",
      rating: 4.7,
      attempts: 23
    },
    {
      id: 50,
      title: "ਪੰਜਾਬੀ ਭੂਗੋਲ ਕੁਇਜ਼",
      subject: "punjabi",
      level: "middle",
      description: "ਪੰਜਾਬ ਦੇ ਭੂਗੋਲ ਅਤੇ ਪ੍ਰਾਕ੍ਰਿਤਕ ਸਰੋਤਾਂ 'ਤੇ ਪ੍ਰਸ਼ਨ।",
      duration: "14 minutes",
      questions: 7,
      difficulty: "Medium",
      courseTitle: "ਪੰਜਾਬੀ ਭੂਗੋਲ",
      thumbnail: "🗺️",
      rating: 4.6,
      attempts: 38
    },

    // Social Studies Quizzes (10 quizzes)
    {
      id: 51,
      title: "Indian History Quiz",
      subject: "social-studies",
      level: "secondary",
      description: "Comprehensive quiz covering Indian history from ancient to modern times.",
      duration: "20 minutes",
      questions: 10,
      difficulty: "Hard",
      courseTitle: "Social Studies - Indian History",
      thumbnail: "🌍",
      rating: 4.9,
      attempts: 134
    },
    {
      id: 52,
      title: "World Geography Quiz",
      subject: "social-studies",
      level: "middle",
      description: "Test your knowledge of world geography, countries, and capitals.",
      duration: "15 minutes",
      questions: 8,
      difficulty: "Medium",
      courseTitle: "World Geography",
      thumbnail: "🗺️",
      rating: 4.7,
      attempts: 98
    },
    {
      id: 53,
      title: "Indian Constitution Quiz",
      subject: "social-studies",
      level: "secondary",
      description: "Questions about the Indian Constitution, fundamental rights, and duties.",
      duration: "18 minutes",
      questions: 9,
      difficulty: "Hard",
      courseTitle: "Civics & Constitution",
      thumbnail: "⚖️",
      rating: 4.8,
      attempts: 76
    },
    {
      id: 54,
      title: "Economics Basics Quiz",
      subject: "social-studies",
      level: "middle",
      description: "Basic economic concepts including money, trade, and resources.",
      duration: "12 minutes",
      questions: 6,
      difficulty: "Medium",
      courseTitle: "Basic Economics",
      thumbnail: "💰",
      rating: 4.4,
      attempts: 89
    },
    {
      id: 55,
      title: "Culture & Heritage Quiz",
      subject: "social-studies",
      level: "primary",
      description: "Questions about Indian culture, festivals, and traditions.",
      duration: "10 minutes",
      questions: 5,
      difficulty: "Easy",
      courseTitle: "Indian Culture",
      thumbnail: "🎭",
      rating: 4.6,
      attempts: 156
    },
    {
      id: 56,
      title: "Current Affairs Quiz",
      subject: "social-studies",
      level: "secondary",
      description: "Recent events, government schemes, and current issues in India.",
      duration: "16 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "Current Affairs",
      thumbnail: "📰",
      rating: 4.7,
      attempts: 112
    },
    {
      id: 57,
      title: "Indian States & Capitals Quiz",
      subject: "social-studies",
      level: "primary",
      description: "Learn about Indian states, union territories, and their capitals.",
      duration: "8 minutes",
      questions: 4,
      difficulty: "Easy",
      courseTitle: "Indian Geography",
      thumbnail: "🏛️",
      rating: 4.5,
      attempts: 178
    },
    {
      id: 58,
      title: "Freedom Struggle Quiz",
      subject: "social-studies",
      level: "middle",
      description: "Questions about India's freedom struggle and independence movement.",
      duration: "14 minutes",
      questions: 7,
      difficulty: "Medium",
      courseTitle: "Indian History",
      thumbnail: "🇮🇳",
      rating: 4.8,
      attempts: 95
    },
    {
      id: 59,
      title: "Government & Politics Quiz",
      subject: "social-studies",
      level: "secondary",
      description: "Understanding of Indian government structure and political system.",
      duration: "17 minutes",
      questions: 8,
      difficulty: "Hard",
      courseTitle: "Political Science",
      thumbnail: "🏛️",
      rating: 4.6,
      attempts: 67
    },
    {
      id: 60,
      title: "Natural Resources Quiz",
      subject: "social-studies",
      level: "middle",
      description: "Questions about natural resources, conservation, and environment.",
      duration: "11 minutes",
      questions: 5,
      difficulty: "Medium",
      courseTitle: "Environmental Studies",
      thumbnail: "🌿",
      rating: 4.4,
      attempts: 82
    }
  ];

const QuizList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    let filtered = quizzes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(quiz => quiz.subject === selectedSubject);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(quiz => quiz.level === selectedLevel);
    }

    setFilteredQuizzes(filtered);
  }, [searchTerm, selectedSubject, selectedLevel]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="quiz-list">
      <div className="container">
        {/* Header */}
        <div className="quiz-list-header">
          <h1 className="quiz-list-title">Available Quizzes</h1>
          <p className="quiz-list-description">
            Test your knowledge with interactive quizzes covering all course topics
          </p>
        </div>

        {/* Filters */}
        <div className="quiz-filters">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search quizzes..."
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
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="quizzes-grid">
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-thumbnail">
                <div className="thumbnail-icon">{quiz.thumbnail}</div>
                <div className="quiz-badges">
                  <span 
                    className="badge difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}
                  >
                    {quiz.difficulty}
                  </span>
                  <span className="badge level-badge">
                    {quiz.level.charAt(0).toUpperCase() + quiz.level.slice(1)}
                  </span>
                </div>
              </div>

              <div className="quiz-content">
                <div className="quiz-header">
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <div className="quiz-rating">
                    {renderStars(quiz.rating)}
                    <span className="rating-value">{quiz.rating}</span>
                  </div>
                </div>

                <p className="quiz-description">{quiz.description}</p>
                <p className="course-title">From: {quiz.courseTitle}</p>

                <div className="quiz-meta">
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>{quiz.duration}</span>
                  </div>
                  <div className="meta-item">
                    <HelpCircle className="meta-icon" />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="meta-item">
                    <BookOpen className="meta-icon" />
                    <span>{quiz.attempts} attempts</span>
                  </div>
                </div>

                <div className="quiz-actions">
                  <Link 
                    to={`/quiz/${quiz.id}`} 
                    className="btn btn-primary quiz-btn"
                  >
                    <Play className="btn-icon" />
                    Start Quiz
                  </Link>
                  <Link 
                    to={`/quiz-results/${quiz.id}`} 
                    className="btn btn-secondary quiz-btn"
                  >
                    <BarChart3 className="btn-icon" />
                    View Results
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuizzes.length === 0 && (
          <div className="no-results">
            <HelpCircle className="no-results-icon" />
            <h3>No quizzes found</h3>
            <p>Try adjusting your search criteria or browse all quizzes.</p>
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

export default QuizList;

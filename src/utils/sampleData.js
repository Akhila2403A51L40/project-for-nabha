// Sample data utility for demonstration purposes
import { downloadManager } from './downloadManager';

export const addSampleDownloads = () => {
  // Sample course download
  const sampleCourse = {
    id: 1,
    title: "Basic Mathematics for Class 6",
    subject: "mathematics",
    level: "middle",
    instructor: "Mrs. Priya Sharma",
    thumbnail: "🔢",
    duration: "4 weeks",
    lessons: 24,
    materials: [
      { name: 'Course Overview.pdf', type: 'pdf', size: '2.3 MB' },
      { name: 'Lesson 1 - Introduction.mp4', type: 'video', size: '45.2 MB' },
      { name: 'Lesson 2 - Basic Concepts.mp4', type: 'video', size: '38.7 MB' },
      { name: 'Practice Exercises.pdf', type: 'pdf', size: '1.8 MB' },
      { name: 'Additional Resources.pdf', type: 'pdf', size: '3.1 MB' }
    ]
  };

  // Sample lesson download
  const sampleLesson = {
    id: '1-1',
    title: 'Introduction to Numbers',
    type: 'lesson',
    downloadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    materials: [{ name: 'Introduction to Numbers.mp4', type: 'video', size: '15.2 MB' }],
    courseInfo: {
      courseId: 1,
      courseTitle: 'Basic Mathematics for Class 6',
      subject: 'mathematics',
      level: 'middle',
      instructor: 'Mrs. Priya Sharma',
      thumbnail: '🔢'
    },
    lessonInfo: {
      lessonId: 1,
      lessonType: 'video',
      duration: '15 min',
      description: 'Understanding whole numbers and their properties'
    }
  };

  // Add sample downloads
  downloadManager.saveDownloadedCourse(sampleCourse);
  downloadManager.saveDownloadedLesson(
    { id: 1, title: 'Introduction to Numbers', type: 'video' },
    sampleCourse
  );

  console.log('Sample downloads added successfully!');
};

// Function to clear all downloads (useful for testing)
export const clearAllDownloads = () => {
  downloadManager.clearAllDownloads();
  console.log('All downloads cleared!');
};

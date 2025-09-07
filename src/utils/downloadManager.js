// Download Manager - handles storage and retrieval of downloaded items
const STORAGE_KEY = 'downloaded_courses';

export const downloadManager = {
  // Save downloaded course to local storage
  saveDownloadedCourse: (courseData) => {
    try {
      const existingDownloads = downloadManager.getDownloadedCourses();
      const downloadItem = {
        id: courseData.id,
        title: courseData.title,
        type: 'course',
        downloadDate: new Date().toISOString(),
        materials: courseData.materials || [],
        courseInfo: {
          subject: courseData.subject,
          level: courseData.level,
          instructor: courseData.instructor,
          thumbnail: courseData.thumbnail,
          duration: courseData.duration,
          lessons: courseData.lessons
        }
      };

      // Check if course already exists
      const existingIndex = existingDownloads.findIndex(item => 
        item.id === downloadItem.id && item.type === 'course'
      );

      if (existingIndex >= 0) {
        // Update existing download
        existingDownloads[existingIndex] = downloadItem;
      } else {
        // Add new download
        existingDownloads.push(downloadItem);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingDownloads));
      window.dispatchEvent(new CustomEvent('downloadsUpdated'));
      return true;
    } catch (error) {
      console.error('Error saving downloaded course:', error);
      return false;
    }
  },

  // Save downloaded lesson to local storage
  saveDownloadedLesson: (lessonData, courseData) => {
    try {
      const existingDownloads = downloadManager.getDownloadedCourses();
      const downloadItem = {
        id: `${courseData.id}-${lessonData.id}`,
        title: lessonData.title,
        type: 'lesson',
        downloadDate: new Date().toISOString(),
        materials: [{
          name: `${lessonData.title}.${getFileExtension(lessonData.type)}`,
          type: lessonData.type,
          size: '5.2 MB'
        }],
        courseInfo: {
          courseId: courseData.id,
          courseTitle: courseData.title,
          subject: courseData.subject,
          level: courseData.level,
          instructor: courseData.instructor,
          thumbnail: courseData.thumbnail
        },
        lessonInfo: {
          lessonId: lessonData.id,
          lessonType: lessonData.type,
          duration: lessonData.duration,
          description: lessonData.description
        }
      };

      // Check if lesson already exists
      const existingIndex = existingDownloads.findIndex(item => 
        item.id === downloadItem.id && item.type === 'lesson'
      );

      if (existingIndex >= 0) {
        // Update existing download
        existingDownloads[existingIndex] = downloadItem;
      } else {
        // Add new download
        existingDownloads.push(downloadItem);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingDownloads));
      window.dispatchEvent(new CustomEvent('downloadsUpdated'));
      return true;
    } catch (error) {
      console.error('Error saving downloaded lesson:', error);
      return false;
    }
  },

  // Get all downloaded courses and lessons
  getDownloadedCourses: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving downloaded courses:', error);
      return [];
    }
  },

  // Get downloaded courses only
  getDownloadedCoursesOnly: () => {
    return downloadManager.getDownloadedCourses().filter(item => item.type === 'course');
  },

  // Get downloaded lessons only
  getDownloadedLessons: () => {
    return downloadManager.getDownloadedCourses().filter(item => item.type === 'lesson');
  },

  // Get downloads by course ID
  getDownloadsByCourse: (courseId) => {
    return downloadManager.getDownloadedCourses().filter(item => 
      item.courseInfo.courseId === courseId || item.id === courseId
    );
  },

  // Remove downloaded item
  removeDownloadedItem: (itemId) => {
    try {
      const existingDownloads = downloadManager.getDownloadedCourses();
      const filteredDownloads = existingDownloads.filter(item => item.id !== itemId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDownloads));
      window.dispatchEvent(new CustomEvent('downloadsUpdated'));
      return true;
    } catch (error) {
      console.error('Error removing downloaded item:', error);
      return false;
    }
  },

  // Clear all downloads
  clearAllDownloads: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('downloadsUpdated'));
      return true;
    } catch (error) {
      console.error('Error clearing downloads:', error);
      return false;
    }
  },

  // Get download statistics
  getDownloadStats: () => {
    const downloads = downloadManager.getDownloadedCourses();
    const courses = downloads.filter(item => item.type === 'course');
    const lessons = downloads.filter(item => item.type === 'lesson');
    
    const totalSize = downloads.reduce((total, item) => {
      return total + item.materials.reduce((itemTotal, material) => {
        const sizeInMB = parseFloat(material.size);
        return itemTotal + (isNaN(sizeInMB) ? 0 : sizeInMB);
      }, 0);
    }, 0);

    return {
      totalDownloads: downloads.length,
      totalCourses: courses.length,
      totalLessons: lessons.length,
      totalSize: totalSize.toFixed(1) + ' MB',
      lastDownload: downloads.length > 0 ? 
        new Date(Math.max(...downloads.map(item => new Date(item.downloadDate)))) : null
    };
  }
};

// Helper function to get file extension
const getFileExtension = (type) => {
  switch (type) {
    case 'video':
      return 'mp4';
    case 'interactive':
      return 'pdf';
    case 'quiz':
      return 'pdf';
    default:
      return 'pdf';
  }
};

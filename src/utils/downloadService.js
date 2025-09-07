// Download service for handling course material downloads
import { downloadManager } from './downloadManager';

export const downloadService = {
  // Download course materials as a ZIP file
  downloadCourse: async (courseId, courseTitle) => {
    try {
      // Create a mock download for demonstration
      // In a real application, this would make an API call to get the course materials
      const mockCourseData = {
        id: courseId,
        title: courseTitle,
        materials: [
          { name: 'Course Overview.pdf', type: 'pdf', size: '2.3 MB' },
          { name: 'Lesson 1 - Introduction.mp4', type: 'video', size: '45.2 MB' },
          { name: 'Lesson 2 - Basic Concepts.mp4', type: 'video', size: '38.7 MB' },
          { name: 'Practice Exercises.pdf', type: 'pdf', size: '1.8 MB' },
          { name: 'Additional Resources.pdf', type: 'pdf', size: '3.1 MB' }
        ]
      };

      // Show download progress
      showDownloadProgress(courseTitle);
      
      // Simulate download process
      await simulateDownload(courseTitle);
      
      // Save to download manager
      downloadManager.saveDownloadedCourse(mockCourseData);
      
      // Show success message
      showDownloadSuccess(courseTitle, mockCourseData.materials);
      
    } catch (error) {
      console.error('Download failed:', error);
      showDownloadError(courseTitle);
    }
  },

  // Download individual lesson materials
  downloadLesson: async (lessonId, lessonTitle, lessonType, courseData) => {
    try {
      const fileExtension = getFileExtension(lessonType);
      const fileName = `${lessonTitle}.${fileExtension}`;
      
      showDownloadProgress(lessonTitle);
      await simulateDownload(lessonTitle);
      
      // Save to download manager
      downloadManager.saveDownloadedLesson(
        { id: lessonId, title: lessonTitle, type: lessonType },
        courseData
      );
      
      showDownloadSuccess(lessonTitle, [{ name: fileName, type: lessonType, size: '5.2 MB' }]);
      
    } catch (error) {
      console.error('Lesson download failed:', error);
      showDownloadError(lessonTitle);
    }
  }
};

// Helper function to get file extension based on lesson type
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

// Simulate download process with progress
const simulateDownload = async (title) => {
  return new Promise((resolve) => {
    // Simulate download time based on content size
    const downloadTime = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(resolve, downloadTime);
  });
};

// Show download progress notification
const showDownloadProgress = (title) => {
  // Create a simple notification system
  const notification = document.createElement('div');
  notification.className = 'download-notification progress';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">📥</div>
      <div class="notification-text">
        <div class="notification-title">Downloading...</div>
        <div class="notification-subtitle">${title}</div>
      </div>
      <div class="notification-progress">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Animate progress bar
  const progressFill = notification.querySelector('.progress-fill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressFill.style.width = progress + '%';
  }, 200);
};

// Show download success notification
const showDownloadSuccess = (title, materials) => {
  // Remove progress notification
  const progressNotification = document.querySelector('.download-notification.progress');
  if (progressNotification) {
    progressNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'download-notification success';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✅</div>
      <div class="notification-text">
        <div class="notification-title">Download Complete!</div>
        <div class="notification-subtitle">${title}</div>
        <div class="notification-files">
          ${materials.map(material => 
            `<div class="file-item">📄 ${material.name} (${material.size})</div>`
          ).join('')}
        </div>
      </div>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
};

// Show download error notification
const showDownloadError = (title) => {
  const notification = document.createElement('div');
  notification.className = 'download-notification error';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">❌</div>
      <div class="notification-text">
        <div class="notification-title">Download Failed</div>
        <div class="notification-subtitle">${title}</div>
        <div class="notification-message">Please try again later</div>
      </div>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f44336;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification-files {
    margin-top: 8px;
    font-size: 12px;
    opacity: 0.9;
  }
  
  .file-item {
    margin: 2px 0;
  }
  
  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.3);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 8px;
  }
  
  .progress-fill {
    height: 100%;
    background: white;
    border-radius: 2px;
    transition: width 0.3s ease;
    width: 0%;
  }
`;
document.head.appendChild(style);

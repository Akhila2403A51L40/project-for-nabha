import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Trash2, 
  Eye, 
  FileText, 
  Video, 
  BookOpen, 
  Clock, 
  HardDrive,
  Filter,
  Search,
  FolderOpen,
  Play,
  MoreVertical
} from 'lucide-react';
import { downloadManager } from '../utils/downloadManager';
import './Downloads.css';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stats, setStats] = useState({});

  const filters = [
    { value: 'all', label: 'All Downloads' },
    { value: 'course', label: 'Courses' },
    { value: 'lesson', label: 'Lessons' }
  ];

  useEffect(() => {
    loadDownloads();
  }, []);

  useEffect(() => {
    filterDownloads();
  }, [downloads, searchTerm, selectedFilter]);

  const loadDownloads = () => {
    const downloadedItems = downloadManager.getDownloadedCourses();
    const downloadStats = downloadManager.getDownloadStats();
    setDownloads(downloadedItems);
    setStats(downloadStats);
  };

  const filterDownloads = () => {
    let filtered = downloads;

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(item => item.type === selectedFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.courseInfo && item.courseInfo.courseTitle && 
         item.courseInfo.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredDownloads(filtered);
  };

  const handleRemoveDownload = (itemId) => {
    if (window.confirm('Are you sure you want to remove this download?')) {
      downloadManager.removeDownloadedItem(itemId);
      loadDownloads();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
      downloadManager.clearAllDownloads();
      loadDownloads();
    }
  };

  const handleOpenItem = (item) => {
    // In a real application, this would open the downloaded content
    alert(`Opening ${item.title}...\n\nThis would open the downloaded content in the appropriate viewer.`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getItemIcon = (item) => {
    if (item.type === 'course') {
      return <BookOpen className="item-icon course-icon" />;
    } else {
      switch (item.lessonInfo?.lessonType) {
        case 'video':
          return <Video className="item-icon video-icon" />;
        case 'interactive':
          return <FileText className="item-icon interactive-icon" />;
        case 'quiz':
          return <FileText className="item-icon quiz-icon" />;
        default:
          return <FileText className="item-icon default-icon" />;
      }
    }
  };

  const getTotalSize = (materials) => {
    return materials.reduce((total, material) => {
      const sizeInMB = parseFloat(material.size);
      return total + (isNaN(sizeInMB) ? 0 : sizeInMB);
    }, 0).toFixed(1) + ' MB';
  };

  return (
    <div className="downloads">
      <div className="container">
        {/* Header */}
        <div className="downloads-header">
          <div className="header-content">
            <h1 className="downloads-title">My Downloads</h1>
            <p className="downloads-description">
              Access all your downloaded course materials and lessons
            </p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={handleClearAll}
              disabled={downloads.length === 0}
            >
              <Trash2 className="btn-icon" />
              Clear All
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="downloads-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Download className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalDownloads || 0}</span>
              <span className="stat-label">Total Downloads</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalCourses || 0}</span>
              <span className="stat-label">Courses</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FileText className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalLessons || 0}</span>
              <span className="stat-label">Lessons</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <HardDrive className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalSize || '0 MB'}</span>
              <span className="stat-label">Storage Used</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="downloads-controls">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              {filters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredDownloads.length} of {downloads.length} downloads
          </p>
        </div>

        {/* Downloads List */}
        {filteredDownloads.length > 0 ? (
          <div className="downloads-list">
            {filteredDownloads.map(item => (
              <div key={item.id} className="download-item">
                <div className="item-main">
                  <div className="item-icon-wrapper">
                    {getItemIcon(item)}
                  </div>
                  
                  <div className="item-content">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      <span className="item-type-badge">
                        {item.type === 'course' ? 'Course' : 'Lesson'}
                      </span>
                    </div>
                    
                    <div className="item-meta">
                      <div className="meta-item">
                        <Clock className="meta-icon" />
                        <span>Downloaded {formatDate(item.downloadDate)}</span>
                      </div>
                      <div className="meta-item">
                        <HardDrive className="meta-icon" />
                        <span>{getTotalSize(item.materials)}</span>
                      </div>
                      {item.courseInfo && (
                        <div className="meta-item">
                          <BookOpen className="meta-icon" />
                          <span>{item.courseInfo.courseTitle || item.courseInfo.subject}</span>
                        </div>
                      )}
                    </div>

                    <div className="item-materials">
                      <span className="materials-label">Files:</span>
                      <div className="materials-list">
                        {item.materials.map((material, index) => (
                          <span key={index} className="material-item">
                            📄 {material.name} ({material.size})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item-actions">
                  <button 
                    className="btn btn-primary action-btn"
                    onClick={() => handleOpenItem(item)}
                    title="Open/View"
                  >
                    <Eye className="btn-icon" />
                    Open
                  </button>
                  <button 
                    className="btn btn-secondary action-btn"
                    onClick={() => handleRemoveDownload(item.id)}
                    title="Remove Download"
                  >
                    <Trash2 className="btn-icon" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-downloads">
            <FolderOpen className="no-downloads-icon" />
            <h3>No Downloads Found</h3>
            <p>
              {downloads.length === 0 
                ? "You haven't downloaded any courses or lessons yet. Start downloading content from the courses page!"
                : "No downloads match your current search criteria. Try adjusting your filters."
              }
            </p>
            {downloads.length === 0 && (
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/courses'}
              >
                <BookOpen className="btn-icon" />
                Browse Courses
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;

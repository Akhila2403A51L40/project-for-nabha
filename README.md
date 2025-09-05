# Nabha Digital Learning Platform

A comprehensive digital learning platform designed specifically for rural school students in Nabha, Punjab. This React.js application provides accessible, high-quality educational content with offline capabilities and multilingual support.

## 🌟 Features

### Core Features
- **Interactive Learning**: Engaging multimedia content designed for rural students
- **Offline Access**: Download content for learning without internet connection
- **Multilingual Support**: Available in English, Hindi, and Punjabi
- **Progress Tracking**: Monitor learning journey with detailed analytics
- **Quiz System**: Interactive quizzes with immediate feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Educational Content
- **Mathematics**: Basic to advanced concepts with interactive examples
- **Science**: Physics, Chemistry, and Biology with practical applications
- **Languages**: English, Hindi, and Punjabi grammar and literature
- **Social Studies**: Indian history, geography, and civics
- **Grade-wise Content**: Primary (1-5), Middle (6-8), and Secondary (9-10)

### Technical Features
- **Progressive Web App**: Works offline and can be installed on devices
- **Modern UI/UX**: Clean, intuitive interface optimized for rural users
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance Optimized**: Fast loading even on slow connections

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nabha-digital-learning.git
   cd nabha-digital-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Footer component
│   └── ...
├── pages/              # Main application pages
│   ├── Home.js         # Landing page
│   ├── Courses.js      # Course listing
│   ├── CourseDetail.js # Individual course view
│   ├── Quiz.js         # Quiz interface
│   ├── Progress.js     # Student progress tracking
│   └── About.js        # About page
├── contexts/           # React contexts
│   └── LanguageContext.js # Language switching
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Components

### Home Page
- Hero section with platform overview
- Feature highlights
- Subject categories
- Student testimonials
- Call-to-action sections

### Courses Page
- Course filtering and search
- Subject and level-based categorization
- Course cards with progress indicators
- Offline download options

### Course Detail Page
- Comprehensive course information
- Lesson-by-lesson breakdown
- Progress tracking
- Instructor information
- Offline access details

### Quiz System
- Interactive multiple-choice questions
- Real-time feedback
- Score calculation and analytics
- Question review and explanations

### Progress Tracking
- Course completion statistics
- Learning streak tracking
- Achievement system
- Recent activity feed
- Performance analytics

## 🌐 Language Support

The platform supports three languages:
- **English**: Primary language for technical content
- **Hindi**: For Hindi-speaking students
- **Punjabi**: For Punjabi-speaking students in Nabha

Language switching is available in the header and persists across sessions.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Streamlined interface optimized for small screens

## 🔧 Customization

### Adding New Courses
1. Update the courses array in the respective page components
2. Add course content and media files
3. Update the routing if needed

### Adding New Languages
1. Add translations to `src/contexts/LanguageContext.js`
2. Update the language switching logic
3. Test with right-to-left languages if applicable

### Styling Customization
- Global styles: `src/index.css`
- Component-specific styles: Individual `.css` files
- Color scheme: CSS custom properties in `index.css`

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure redirects for client-side routing

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings (build command: `npm run build`)
3. Deploy automatically on push to main branch

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload the `build` folder contents to your web server
3. Configure server to serve `index.html` for all routes

## 🤝 Contributing

We welcome contributions to improve the platform for rural students:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Write meaningful commit messages
- Test on multiple devices and browsers
- Ensure accessibility compliance
- Consider offline functionality

## 📊 Analytics and Monitoring

The platform includes built-in analytics for:
- Course completion rates
- Student engagement metrics
- Popular content identification
- Performance monitoring
- Error tracking

## 🔒 Privacy and Security

- No personal data collection without consent
- Secure data transmission
- Local storage for offline content
- GDPR compliance considerations
- Child-safe content policies

## 📞 Support

For technical support or questions:
- Email: info@nabhalearning.org
- Phone: +91 98765 43210
- Address: Nabha, Punjab, India

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Rural education experts in Punjab
- Local teachers and students in Nabha
- Open source community for tools and libraries
- Government of Punjab for educational initiatives

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic platform functionality
- ✅ Course content delivery
- ✅ Progress tracking
- ✅ Multilingual support

### Phase 2 (Upcoming)
- 🔄 Teacher dashboard
- 🔄 Parent monitoring portal
- 🔄 Advanced analytics
- 🔄 Gamification features

### Phase 3 (Future)
- 📋 AI-powered recommendations
- 📋 Voice-based learning
- 📋 AR/VR content
- 📋 Community features

---

**Made with ❤️ for rural students in Nabha, Punjab**

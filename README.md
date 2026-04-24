# Ali Alhashem - Professional Portfolio (Assignment 4)

## 🎯 Project Overview

This is a comprehensive, production-ready personal portfolio web application developed as the final assignment (Assignment 4). It showcases a complete range of skills in web development, demonstrating mastery of modern frameworks, responsive design, performance optimization, and creative implementation.

### ✨ Key Features

**Advanced Interactivity:**
- 🎮 Interactive skill showcase with 3D card flip animations
- 🎲 Skill randomizer game to discover featured skills
- ✨ Smooth page transitions with Framer Motion
- 🌙 Dark/Light theme with persistent state

**Smart Functionality:**
- 🔗 Real-time GitHub repository integration (6 latest projects)
- 👤 Visitor personalization with localStorage persistence
- ⏱️ Live session timer tracking visitor engagement
- 🔍 Advanced project search and multi-criteria sorting
- 📧 Robust form validation with real-time feedback

**Professional Quality:**
- 📱 Fully responsive design (mobile-first approach)
- ⚡ Performance optimized with code splitting and lazy loading
- ♿ Accessible UI components and ARIA labels
- 🎨 Custom Tailwind CSS styling with animations
- 🔄 Error handling and graceful fallbacks

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 with TypeScript |
| **Build Tool** | Vite 6.2 |
| **Styling** | Tailwind CSS 4.1 with dark mode support |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **API** | GitHub REST API v3 |
| **Deployment** | GitHub Pages |

## 📂 Folder Structure

```
202261120-AliAlhashem-assignment4/
├── README.md                          # Project overview and setup
├── index.html                         # Entry HTML file
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite build configuration
├── src/
│   ├── App.tsx                        # Main application component
│   ├── main.tsx                       # React entry point
│   └── index.css                      # Global styles and Tailwind config
├── docs/
│   ├── ai-usage-report.md            # AI assistance documentation
│   ├── technical-documentation.md    # API and architecture docs
│   └── deployment-guide.md            # GitHub Pages setup
├── public/                            # Static assets (if needed)
└── dist/                              # Build output (auto-generated)
```

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/Ali-Alhashim13/202261120-AliAlhashem-assignment4.git
cd 202261120-AliAlhashem-assignment4

# Install dependencies
npm install
```

### Development
```bash
# Start development server (runs on http://localhost:3000)
npm run dev
```

### Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
```bash
# Build and deploy to GitHub Pages
npm run build
# Then push the dist/ folder to GitHub Pages
```

## 🎮 Interactive Features

### Skill Randomizer Game
Discover skills in a fun, interactive way! Click the randomize button to see featured skills with animated transitions and detailed descriptions.

### 3D Card Interactions
Project cards feature smooth flip animations and hover effects that create depth and visual interest.

### Real-time GitHub Integration
Automatically fetches and displays your 6 most recent GitHub repositories with:
- Repository name and description
- Star count and programming language
- Direct links to repository

### Visitor Personalization
- First-time visitors get an onboarding flow to set their name and experience level
- Experience level badges (Beginner, Intermediate, Advanced, Expert)
- Personalized greetings based on time of day
- Session time tracking

## 📊 Performance Optimizations

- **Code Splitting**: Vendor code separated from app code
- **Lazy Loading**: Images load on demand
- **Memoization**: useMemo for expensive filtering operations
- **Minification**: Production builds use terser for smaller bundles
- **No Unused CSS**: Tailwind purges unused styles in production

## ✅ Quality Assurance

- ✓ Responsive across all device sizes (mobile, tablet, desktop)
- ✓ Cross-browser compatibility tested (Chrome, Firefox, Safari, Edge)
- ✓ Accessible design with ARIA labels and semantic HTML
- ✓ Error handling with user-friendly messages
- ✓ Performance score optimized for fast loading

## 📖 Documentation

- **[Technical Documentation](docs/technical-documentation.md)** - API integration, state management, and architecture patterns
- **[AI Usage Report](docs/ai-usage-report.md)** - Documentation of AI assistance in development
- **[Deployment Guide](docs/deployment-guide.md)** - Step-by-step GitHub Pages deployment

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### GitHub Username
Edit the `GITHUB_USERNAME` constant in `src/App.tsx` to display your repositories:
```typescript
const GITHUB_USERNAME = 'Your-GitHub-Username';
```

## 🌐 Live Demo

**Deployed at:** [https://ali-alhashim13.github.io/202261120-AliAlhashem-assignment4/](https://ali-alhashim13.github.io/202261120-AliAlhashem-assignment4/)

## 📝 Development Notes

### State Management
The application uses React hooks for state management:
- Theme state (dark/light mode)
- Tab navigation state
- Form validation state
- GitHub repository fetching state
- Visitor personalization state

### Performance Patterns
- useMemo for expensive computations (project filtering and sorting)
- useCallback for stable function references
- AnimatePresence from Framer Motion for cleanup

### Error Handling
- Try-catch blocks for API calls with user-friendly error messages
- Form validation with regex and multi-stage error handling
- Fallback UI components for loading states

## 🤝 Contributing

This is a personal portfolio project. However, suggestions and improvements are welcome!

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated:** April 2026  
**Built by:** Ali Alhashem  
**Student ID:** 202261120

# 🚀 Quick Start Guide

Get your portfolio running locally in under 5 minutes.

## Prerequisites

- **Node.js** 18+ (download from https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

## Installation (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/Ali-Alhashim13/202261120-AliAlhashem-assignment4.git
cd 202261120-AliAlhashem-assignment4
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

### 3. Start Development Server

```bash
npm run dev
```

**Output:**
```
VITE v6.2.0  ready in XXX ms

➜  Local:   http://localhost:3000/202261120-AliAlhashem-assignment4/
➜  Press h + enter to show help
```

### 4. Open in Browser

Click the link or navigate to:
```
http://localhost:3000/202261120-AliAlhashem-assignment4/
```

✅ **Portfolio is now running locally!**

---

## Available Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (TypeScript)
npm run lint

# Clean build artifacts
npm run clean

# Full build with type check
npm run build
```

---

## Project Structure

```
📁 202261120-AliAlhashem-assignment4/
├── 📄 README.md                    # Project overview
├── 📄 package.json                 # Dependencies & scripts
├── 📄 vite.config.ts              # Build configuration
├── 📄 tsconfig.json               # TypeScript settings
├── 📄 index.html                  # HTML entry point
│
├── 📁 src/
│   ├── 📄 App.tsx                 # Main React component
│   ├── 📄 main.tsx                # React entry point
│   └── 📄 index.css               # Global styles
│
├── 📁 docs/
│   ├── 📄 technical-documentation.md
│   ├── 📄 deployment-guide.md
│   └── 📄 ai-usage-report.md
│
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 deploy.yml          # Auto-deployment CI/CD
│       └── 📄 quality.yml         # Code quality checks
│
└── 📁 dist/                       # Build output (generated)
```

---

## Key Features

### 🎮 Interactive Features
- **Skill Randomizer**: Click the dice icon to discover random skills
- **Theme Toggle**: Switch between dark and light mode
- **Visitor Personalization**: Enter your name for a personalized greeting
- **Project Search**: Filter and sort projects in real-time

### 🔗 External Integrations
- **GitHub API**: Displays your 6 latest repositories
- **Real-time Session Timer**: Tracks how long you've been on the site

### 📱 Responsive Design
- Mobile-friendly (tested on 320px - 1920px)
- Touch-optimized interface
- Smooth animations throughout

---

## Configuration

### Change GitHub Username

Edit `src/App.tsx` (line ~107):

```typescript
const GITHUB_USERNAME = 'Your-GitHub-Username'; // Change this
```

Then restart the dev server for changes to take effect.

### Customize Skills

Edit the `SKILLS` array in `src/App.tsx` to add your own skills:

```typescript
const SKILLS: Skill[] = [
  { 
    id: 1, 
    name: 'Your Skill', 
    category: 'Frontend',
    icon: '🎨',
    proficiency: 'Advanced',
    description: 'Your skill description'
  },
  // Add more skills...
];
```

### Change Colors

Edit `src/index.css` to modify the theme:

```css
/* Change emerald to your color */
/* emerald-500 → emerald-600 → emerald-700 */
```

---

## Development Workflow

### Making Changes

1. **Edit files** in `src/` folder
2. **Save file** - hot reload automatically refreshes browser
3. **Check for errors** - TypeScript will show errors in terminal

### Testing Changes

```bash
# Type check for errors
npm run lint

# Build to verify production build works
npm run build

# Preview production build
npm run preview
```

---

## Building for Production

### Build Command

```bash
npm run build
```

**Output:**
- Compresses and optimizes code
- Creates `dist/` folder with production files
- Size: ~150KB gzipped

### What Gets Built

- ✅ Minified JavaScript
- ✅ Optimized CSS
- ✅ Compressed images (if any)
- ✅ Source maps (for debugging)

---

## Deploying to GitHub Pages

### 1. Push to GitHub

```bash
npm run build
git add .
git commit -m "Build: production ready"
git push origin main
```

### 2. GitHub Actions Deploys Automatically

- Check the **Actions** tab in your repository
- Wait for green ✅ checkmark
- Site is live in 1-2 minutes

### 3. Your Site is Live!

**URL**: https://ali-alhashim13.github.io/202261120-AliAlhashem-assignment4/

---

## Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- --port 3001
```

### Module Not Found Error

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for type errors
npm run lint

# Fix errors shown in editor (F1 → Quick Fix)
```

### Git Issues

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

---

## Useful Resources

- 📖 [React Documentation](https://react.dev)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com)
- ⚡ [Vite Guide](https://vitejs.dev)
- 🎬 [Framer Motion Docs](https://www.framer.com/motion)
- 📦 [Lucide Icons](https://lucide.dev)

---

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Open browser to http://localhost:3000/202261120-AliAlhashem-assignment4/
3. ✅ Make changes to `src/App.tsx`
4. ✅ See changes instantly with hot reload
5. ✅ Build with `npm run build`
6. ✅ Deploy to GitHub Pages

---

## Support

- **Documentation**: Check [docs/](./docs/) folder
- **Deployment**: Read [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- **Issues**: Check GitHub Issues or GitHub Discussions

---

**Happy coding!** 🎉

For more details, see [README.md](./README.md) and [docs/technical-documentation.md](./docs/technical-documentation.md)

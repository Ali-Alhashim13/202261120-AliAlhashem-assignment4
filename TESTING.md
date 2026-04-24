# 🧪 Testing & Quality Assurance Guide

Comprehensive testing checklist to ensure your portfolio is production-ready.

---

## 📋 Pre-Deployment Testing

### ✅ Code Quality

#### TypeScript Checking
```bash
npm run lint
```

**Expected**: No errors or warnings

- [ ] TypeScript compiler reports no issues
- [ ] No unused variables
- [ ] All types properly defined

#### Build Verification
```bash
npm run build
```

**Expected**: Successful build with no errors

- [ ] Build completes without errors
- [ ] `dist/` folder created
- [ ] All assets present in dist

#### Build Size Check

After building, check size:

```bash
ls -lh dist/
```

**Expected**: 
- Total: ~150KB gzipped
- JS bundle: ~100KB
- CSS: ~30KB

---

### 🌐 Browser Testing

#### Desktop Browsers

Test on all major browsers (use BrowserStack or local installations):

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | [ ] ✅ |
| Firefox | Latest | [ ] ✅ |
| Safari | Latest | [ ] ✅ |
| Edge | Latest | [ ] ✅ |

**Test Cases**:
- [ ] Page loads correctly
- [ ] All images display
- [ ] Animations smooth
- [ ] No console errors (F12)
- [ ] Navigation works
- [ ] Forms submit
- [ ] Theme toggle works

#### Mobile Browsers

Test on various mobile devices:

| Device | Browser | Status |
|--------|---------|--------|
| iPhone 12 | Safari | [ ] ✅ |
| iPhone SE | Safari | [ ] ✅ |
| Android 10+ | Chrome | [ ] ✅ |
| iPad | Safari | [ ] ✅ |

**Mobile Test Cases**:
- [ ] Layout responsive (no horizontal scroll)
- [ ] Touch targets adequate (44x44px minimum)
- [ ] Keyboard doesn't zoom input fields
- [ ] Animations don't cause jank
- [ ] Performance acceptable (<3s load)

---

### 📱 Responsive Design Testing

Test these viewport sizes:

#### Mobile (320px - 480px)
```
Width: 320px (iPhone SE)
- [ ] All content visible
- [ ] Text readable
- [ ] Buttons clickable
- [ ] No overflow

Width: 480px (Large phone)
- [ ] Proper spacing
- [ ] Navigation works
- [ ] Images scale correctly
```

#### Tablet (768px - 1024px)
```
Width: 768px
- [ ] 2-column layouts display
- [ ] Content well-organized
- [ ] Touch-friendly spacing

Width: 1024px
- [ ] Layout transitions smooth
- [ ] Multiple columns work
```

#### Desktop (1200px+)
```
Width: 1280px
- [ ] 3-column grids work
- [ ] Full experience visible
- [ ] No excessive whitespace

Width: 1920px
- [ ] Ultra-wide layout good
- [ ] Content well-distributed
```

---

### 🎨 Visual Testing

#### Dark Mode
- [ ] Toggle button works
- [ ] All text readable
- [ ] Contrast meets WCAG AA (4.5:1)
- [ ] Colors applied correctly
- [ ] Persists on reload

#### Light Mode
- [ ] Colors clear and vibrant
- [ ] No harsh white backgrounds
- [ ] Sufficient contrast
- [ ] Professional appearance

#### Theme Transition
- [ ] Smooth transition between themes
- [ ] No flash of wrong theme
- [ ] All elements update

---

### ⚡ Performance Testing

#### Google Lighthouse

1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Click **Analyze page load**
4. Test with:
   - Desktop mode
   - Mobile (throttled)
   - Network: "Fast 3G"

**Target Scores**:
- [ ] Performance: **90+**
- [ ] Accessibility: **95+**
- [ ] Best Practices: **90+**
- [ ] SEO: **90+**

#### Load Time
```bash
npm run preview
```

**Expected**:
- [ ] Initial load: <2 seconds
- [ ] Time to Interactive: <3 seconds
- [ ] No layout shifts (CLS < 0.1)

#### Lighthouse Report Checklist

- [ ] **Performance**
  - [ ] Largest Contentful Paint < 2.5s
  - [ ] Cumulative Layout Shift < 0.1
  - [ ] First Input Delay < 100ms

- [ ] **Accessibility**
  - [ ] All images have alt text
  - [ ] Color contrast sufficient
  - [ ] Keyboard navigation works
  - [ ] Focus indicators visible

- [ ] **Best Practices**
  - [ ] HTTPS enabled
  - [ ] No deprecated APIs
  - [ ] No mixed content
  - [ ] Security headers present

- [ ] **SEO**
  - [ ] Meta description present
  - [ ] Title tag descriptive
  - [ ] Robots.txt configured
  - [ ] Sitemap.xml present

---

### ♿ Accessibility Testing

#### Keyboard Navigation
```
Test with Tab key only (no mouse):
- [ ] Can reach all interactive elements
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] Can access all features
```

#### Screen Reader Testing

Use built-in screen reader:

**Windows**: NVDA (free) or JAWS  
**Mac**: VoiceOver (built-in, press Cmd+F5)

- [ ] Page title announced
- [ ] Navigation announced clearly
- [ ] Buttons have accessible names
- [ ] Form labels associated
- [ ] Alt text on images

#### Color Contrast

Use WebAIM Contrast Checker:
- [ ] Text on background: 4.5:1 (normal)
- [ ] Large text: 3:1 minimum
- [ ] Icons/graphics: 3:1 minimum

---

### 🎮 Feature Testing

#### Skill Randomizer Game
- [ ] Dice icon clickable
- [ ] Rotation animation smooth
- [ ] Random skill displays
- [ ] Card info updates
- [ ] Click any skill to feature
- [ ] Proficiency badges correct colors

#### Theme Toggle
- [ ] Toggle button visible
- [ ] Changes theme instantly
- [ ] Persists on page reload
- [ ] No performance issues

#### Visitor Personalization
- [ ] Onboarding modal appears (first visit)
- [ ] Can enter visitor name
- [ ] Experience level selection works
- [ ] Data saved in localStorage
- [ ] Greeting displays correctly
- [ ] Reset button clears data

#### Project Search & Filter
- [ ] Search box responsive
- [ ] Real-time filtering works
- [ ] Sort by Date/Title works
- [ ] Sort order toggles (↑↓)
- [ ] No results message shows
- [ ] Reset filters works

#### GitHub Integration
- [ ] GitHub tab loads repos
- [ ] Shows 6 recent repos
- [ ] Correct repository info
- [ ] Stars display correctly
- [ ] Language tags show
- [ ] Links work (open in new tab)
- [ ] Error handling if API fails

#### Contact Form
- [ ] All fields visible
- [ ] Placeholder text clear
- [ ] Input validation works:
  - [ ] Name min 2 chars
  - [ ] Valid email format
  - [ ] Message min 10 chars
- [ ] Error messages display
- [ ] Submit button works
- [ ] Success message appears
- [ ] Form clears after submit

#### Navigation
- [ ] Tab switching smooth
- [ ] Animations on page change
- [ ] URL/hash updates (if applicable)
- [ ] Logo clickable to home
- [ ] All tabs accessible on mobile

#### Session Timer
- [ ] Timer visible in footer
- [ ] Counts up correctly
- [ ] Format is MM:SS
- [ ] Persists during navigation

---

### 🔗 Link Testing

#### Internal Links
- [ ] Navigation tabs work
- [ ] Logo returns to home
- [ ] No broken links
- [ ] Smooth scrolling

#### External Links
- [ ] GitHub links open correctly
- [ ] LinkedIn links work
- [ ] Email link works
- [ ] All open in new tab

#### API Endpoints
- [ ] GitHub API requests succeed
- [ ] API rate limits respected
- [ ] Error handling works
- [ ] Retry logic functional

---

### 📝 Content Testing

#### Typography
- [ ] All text readable
- [ ] Font sizes appropriate
- [ ] Line height comfortable (1.5+)
- [ ] Letter spacing okay

#### Images
- [ ] All images load
- [ ] Correct dimensions
- [ ] Good quality
- [ ] Alt text present

#### Copy
- [ ] No typos
- [ ] Grammar correct
- [ ] Content accurate
- [ ] Call-to-action clear

---

## 🚀 Deployment Testing

### GitHub Pages Deployment

#### Pre-Deployment
- [ ] Repository is PUBLIC
- [ ] GitHub Pages enabled
- [ ] Base path set correctly (`vite.config.ts`)
- [ ] Latest code pushed to `main`

#### During Deployment
- [ ] Check **Actions** tab
- [ ] Workflow runs automatically
- [ ] Build succeeds (green ✅)
- [ ] Deployment completes

#### Post-Deployment
- [ ] Site accessible at live URL
- [ ] No 404 errors
- [ ] All assets load:
  - [ ] CSS applied correctly
  - [ ] Images display
  - [ ] JavaScript works
  - [ ] Animations smooth

#### Live Site Testing
- [ ] Load from live URL
- [ ] All features work
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Responsive design works
- [ ] Dark mode works
- [ ] GitHub integration works

---

## 🔐 Security Testing

- [ ] HTTPS enforced (automatic on GitHub Pages)
- [ ] No sensitive data in code
- [ ] Environment variables used for secrets
- [ ] XSS protection (React escapes by default)
- [ ] CSRF tokens used (if form submission)
- [ ] Content Security Policy headers

---

## 📊 Performance Optimization Checklist

### Code Optimization
- [ ] No console.log() statements left
- [ ] Unused imports removed
- [ ] Dead code eliminated
- [ ] Comments meaningful (not excessive)

### Bundle Optimization
- [ ] Code splitting enabled
- [ ] Vendor code separated
- [ ] Tree-shaking enabled
- [ ] Minification working

### Asset Optimization
- [ ] Images compressed
- [ ] SVGs optimized
- [ ] Fonts subsetted
- [ ] Lazy loading implemented

### Caching
- [ ] Static assets cached
- [ ] Service worker (if applicable)
- [ ] Browser cache headers set

---

## 🧩 Integration Testing

### Test Full User Journey

#### First-time Visitor
```
1. [ ] Page loads
2. [ ] Onboarding modal appears
3. [ ] Enter name and level
4. [ ] Personalized greeting displays
5. [ ] Can navigate all tabs
6. [ ] Can toggle theme
7. [ ] Can use all features
8. [ ] Data persists on reload
```

#### Returning Visitor
```
1. [ ] Page loads with saved name
2. [ ] No onboarding modal
3. [ ] Theme preference restored
4. [ ] Session timer at 0
5. [ ] All features work
```

#### New Feature Testing
```
1. [ ] Skill Randomizer game works
2. [ ] GitHub repos load
3. [ ] Project search works
4. [ ] Form validation works
5. [ ] Theme switching works
```

---

## 📋 Pre-Launch Checklist

Before sharing publicly:

- [ ] All tests pass
- [ ] No console errors
- [ ] Lighthouse scores 90+
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] All links functional
- [ ] GitHub integration works
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Content proofread
- [ ] Contact form working
- [ ] Social links updated

---

## 🎉 Launch Checklist

Once deployed:

- [ ] Site is live and accessible
- [ ] All features work on live version
- [ ] Performance is good
- [ ] No console errors
- [ ] Share with portfolio platforms
- [ ] Update resume/LinkedIn
- [ ] Share with network

---

## 🐛 Debugging Tips

### Browser DevTools (F12)

#### Console Tab
- Check for errors (red)
- Check for warnings (yellow)
- Log important data points

#### Network Tab
- Verify API calls succeed
- Check asset loading times
- Identify slow requests

#### Performance Tab
- Record page load
- Identify bottlenecks
- Check for jank/frame drops

#### Lighthouse Tab
- Run performance audit
- Get optimization suggestions
- Track score improvements

### Local Debugging

```bash
# Development mode (shows errors)
npm run dev

# Type checking
npm run lint

# Build test
npm run build

# Production preview
npm run preview
```

---

## 📞 Support & Resources

- **React DevTools**: Chrome extension for React debugging
- **Tailwind IntelliSense**: VS Code extension
- **Lighthouse**: Built into Chrome DevTools
- **WebAIM**: Accessibility testing tools
- **BrowserStack**: Cross-browser testing

---

**Last Updated**: April 2026  
**For**: Assignment 4 - Professional Portfolio

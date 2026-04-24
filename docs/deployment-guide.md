# GitHub Pages Deployment Guide

## Overview

This guide walks you through deploying your Ali Alhashem portfolio to GitHub Pages for free public hosting.

## Prerequisites

- GitHub account (free)
- Git installed on your machine
- Node.js and npm installed
- Repository: `202261120-AliAlhashem-assignment4`

## Step 1: Ensure Repository is Public

1. Go to your GitHub repository
2. Navigate to **Settings** → **General**
3. Verify the repository is set to **Public**
4. Save if needed

## Step 2: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` (or your default branch)
   - **Folder**: Select `/ (root)` or `/docs` depending on your preference
3. Click **Save**

## Step 3: Build Your Project

Run this command in your project root:

```bash
npm install
npm run build
```

This creates a `dist/` folder with your optimized production build.

## Step 4: Deploy to GitHub Pages

### Option A: Manual Deployment (Using Git)

1. **Copy dist contents to root** (if deploying to root):
   ```bash
   # After running npm run build
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Or deploy to docs folder**:
   ```bash
   npm run build
   cp -r dist/* docs/
   git add .
   git commit -m "Deploy portfolio to GitHub Pages"
   git push origin main
   ```

### Option B: Automatic Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        publish_branch: gh-pages
```

Then update GitHub Pages settings to deploy from `gh-pages` branch.

## Step 5: Verify Deployment

After pushing:

1. Go to your repository
2. Click **Actions** tab to see build status
3. Once complete, your site is live at:
   ```
   https://ali-alhashim13.github.io/202261120-AliAlhashem-assignment4/
   ```

## Step 6: Custom Domain (Optional)

If you have a custom domain:

1. In **Settings** → **Pages** → **Custom domain**
2. Enter your domain (e.g., `myportfolio.com`)
3. Update your domain's DNS records as instructed by GitHub

## Troubleshooting

### 404 Errors After Deployment

**Problem**: Assets load with 404 errors

**Solution**: The `vite.config.ts` already includes:
```typescript
base: '/202261120-AliAlhashem-assignment4/'
```

This ensures all assets load correctly from the subdirectory.

### Site Not Updating

**Problem**: Changes don't appear on the live site

**Solutions**:
- Hard refresh: `Ctrl+Shift+Delete` (Chrome) or `Cmd+Shift+Delete` (Mac)
- Clear browser cache
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check GitHub Actions tab for build errors

### Blank Page on Deploy

**Problem**: Page loads but shows nothing

**Solutions**:
1. Check browser console for errors (F12)
2. Verify `base` path in `vite.config.ts`
3. Ensure `npm run build` completed without errors
4. Check that `dist/index.html` exists

## Performance Tips

1. **Minification**: Already enabled in production build
2. **Image Optimization**: Use compressed images in `public/` folder
3. **Lazy Loading**: Already implemented with React
4. **Caching**: GitHub Pages serves with proper cache headers

## Updating Your Site

Every time you push changes:

```bash
# Make changes to your code
npm run build        # Build production version
git add .
git commit -m "Update portfolio"
git push origin main # Deploy
```

If using GitHub Actions, it deploys automatically!

## Environment Variables

For sensitive data (API keys):

1. **Never commit** `.env` files
2. Use GitHub Secrets (Settings → Secrets and variables)
3. Access in workflows with `${{ secrets.VARIABLE_NAME }}`

Example in GitHub Actions:

```yaml
env:
  VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

## SSL/HTTPS

✅ **Automatic**: GitHub Pages provides free HTTPS for `*.github.io` domains

## Support & Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Deployment Checklist

- [ ] Repository is public
- [ ] GitHub Pages enabled in settings
- [ ] `vite.config.ts` has correct `base` path
- [ ] `npm run build` succeeds locally
- [ ] Pushed to main branch
- [ ] Site appears at correct GitHub Pages URL
- [ ] All assets load correctly
- [ ] No console errors in browser DevTools
- [ ] Responsive design works on mobile
- [ ] Links and navigation work properly

---

**Last Updated**: April 2026
**For**: Ali Alhashem Portfolio - Assignment 4

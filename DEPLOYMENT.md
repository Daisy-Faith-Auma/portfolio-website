# Deployment Guide

This guide covers deploying the portfolio website to Netlify and other production environments.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository set up
- Netlify account (for Netlify deployment)

## Netlify Deployment

### Option 1: Git-based Deployment (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify:**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider and repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Node version:** `18`

3. **Environment Variables:**
   - Go to Site settings > Environment variables
   - Add any required environment variables from `.env.example`

4. **Deploy:**
   - Netlify will automatically build and deploy your site
   - Future pushes to the main branch will trigger automatic deployments

### Option 2: Manual Deployment

1. **Build the project locally:**
   ```bash
   npm run build:prod
   ```

2. **Deploy to Netlify:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

## Build Optimization

The project includes several optimizations for production:

### Code Splitting
- Vendor libraries are split into separate chunks
- Animations (Framer Motion) are in a separate chunk
- Icons (Lucide React) are in a separate chunk

### Asset Optimization
- CSS is extracted and minified
- JavaScript is minified using esbuild
- Images are optimized and cached
- Source maps are generated for debugging

### Caching Strategy
- Static assets are cached for 1 year
- HTML files are not cached to ensure updates are served immediately
- Proper cache headers are set via `netlify.toml`

## Performance Monitoring

### Core Web Vitals
Monitor these metrics in production:
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Tools for Monitoring
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals Chrome extension
- Netlify Analytics (if enabled)

## Security Headers

The following security headers are configured in `netlify.toml`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Environment Variables

### Required Variables
None currently required for basic functionality.

### Optional Variables
- `VITE_GOOGLE_ANALYTICS_ID`: Google Analytics tracking ID
- `VITE_PLAUSIBLE_DOMAIN`: Plausible Analytics domain
- `VITE_ENABLE_ANIMATIONS`: Enable/disable animations (default: true)
- `VITE_ENABLE_ANALYTICS`: Enable/disable analytics (default: false)

### Setting Environment Variables

**In Netlify:**
1. Go to Site settings > Environment variables
2. Add variables with `VITE_` prefix
3. Redeploy the site

**Locally:**
1. Copy `.env.example` to `.env.local`
2. Fill in your values
3. Restart the development server

## Troubleshooting

### Build Failures
1. **Check Node.js version:** Ensure you're using Node.js 18+
2. **Clear cache:** Delete `node_modules` and `package-lock.json`, then run `npm install`
3. **Check environment variables:** Ensure all required variables are set
4. **Review build logs:** Check Netlify deploy logs for specific errors

### Performance Issues
1. **Run Lighthouse audit:** Check for performance bottlenecks
2. **Analyze bundle size:** Use `npm run analyze` to check bundle composition
3. **Check image optimization:** Ensure images are properly optimized
4. **Review network requests:** Check for unnecessary API calls or large assets

### Deployment Issues
1. **Check build command:** Ensure `npm run build` works locally
2. **Verify publish directory:** Confirm `dist` folder is generated
3. **Review redirects:** Check `netlify.toml` redirect rules
4. **Test locally:** Use `npm run preview` to test production build

## Alternative Deployment Options

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add script: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

### Custom Server
1. Build the project: `npm run build`
2. Serve the `dist` folder with any static file server
3. Ensure proper redirects for SPA routing

## Maintenance

### Regular Tasks
- Monitor performance metrics monthly
- Update dependencies quarterly
- Review and update content as needed
- Check for broken links periodically

### Security Updates
- Keep dependencies updated
- Monitor security advisories
- Review and update security headers as needed
- Regularly audit third-party integrations
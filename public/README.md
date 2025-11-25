# Public Assets Directory

This directory contains static assets served by the application.

## Current Assets

- `cybersoluce.png` - Current logo/favicon (PNG format)
- `manifest.json` - PWA manifest configuration
- `robots.txt` - Search engine crawler instructions
- `sw.js` - Service worker for offline support
- `_headers` - Netlify security headers configuration
- `images/` - Image assets directory

## Recommended Assets to Add

### Favicon
- **File**: `favicon.ico`
- **Purpose**: Browser tab icon
- **Format**: ICO format with multiple sizes (16x16, 32x32, 48x48)
- **Current**: Using `cybersoluce.png` as fallback

### Logo
- **File**: `logo-cybersoluce.svg`
- **Purpose**: Scalable vector logo for use in headers, emails, documentation
- **Format**: SVG format for scalability
- **Current**: Using `cybersoluce.png` as fallback

### Image Assets
Place additional image assets in the `images/` directory:
- Screenshots
- Feature illustrations
- Marketing images
- Icons (if not using an icon library)

## Usage in Code

### HTML (index.html)
```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

<!-- Logo -->
<img src="/logo-cybersoluce.svg" alt="CyberSoluce Logo" />
```

### React Components
```tsx
// Favicon (automatically loaded from public/)
<img src="/favicon.ico" alt="Favicon" />

// Logo
<img src="/logo-cybersoluce.svg" alt="CyberSoluce Logo" />

// Images from images directory
<img src="/images/screenshot.png" alt="Screenshot" />
```

## Asset Optimization

### Images
- Use WebP format for better compression (with PNG fallback)
- Optimize images before adding to repository
- Use appropriate sizes (don't use 2000px images for thumbnails)

### SVG
- Optimize SVG files (remove unnecessary metadata)
- Ensure SVG is accessible (proper viewBox, title, etc.)

### Icons
- Consider using an icon library (Lucide React, Heroicons) instead of individual icon files
- If using custom icons, provide multiple sizes

## File Size Guidelines

- **Favicon**: < 50KB
- **Logo SVG**: < 100KB
- **Screenshots**: < 500KB (optimized)
- **Marketing images**: < 1MB (optimized)

## Notes

- All files in this directory are publicly accessible
- Never place sensitive files or API keys here
- Use relative paths starting with `/` when referencing assets
- Assets are served from the root URL (e.g., `/favicon.ico`)


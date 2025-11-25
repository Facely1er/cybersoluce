# Images Directory

This directory is for image assets used throughout the application.

## Directory Structure

```
images/
├── logos/          # Logo variations and formats
├── icons/          # Custom icons (if not using icon library)
├── screenshots/    # Application screenshots
├── marketing/      # Marketing and promotional images
└── illustrations/  # Feature illustrations and graphics
```

## Usage

Reference images from this directory using absolute paths:

```tsx
// In React components
<img src="/images/logos/logo-dark.svg" alt="CyberSoluce Logo" />
<img src="/images/screenshots/dashboard.png" alt="Dashboard Screenshot" />
```

## Best Practices

1. **Naming Convention**: Use kebab-case for file names
   - ✅ `dashboard-overview.png`
   - ❌ `Dashboard_Overview.png`

2. **Organization**: Group related images in subdirectories
   - `images/logos/` - All logo variations
   - `images/screenshots/` - Application screenshots
   - `images/marketing/` - Marketing materials

3. **Optimization**: 
   - Compress images before committing
   - Use appropriate formats (WebP for photos, SVG for graphics)
   - Provide multiple sizes for responsive images

4. **Accessibility**:
   - Always include descriptive `alt` text
   - Use semantic HTML (`<img>` vs CSS background images)

## File Formats

- **SVG**: For logos, icons, and scalable graphics
- **WebP**: For photos and complex images (with PNG fallback)
- **PNG**: For images with transparency
- **JPG**: For photos without transparency needs

## Size Guidelines

- **Icons**: 16x16 to 64x64px
- **Logos**: 200x200px to 512x512px
- **Screenshots**: Max 1920x1080px
- **Marketing images**: As needed, but optimize


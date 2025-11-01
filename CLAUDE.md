# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static website for the Gingerbread Village event at St. George's Episcopal Church in Middlebury, CT. The site has been fully simplified with zero build dependencies - just pure HTML and CSS.

**Key Features:**
- Pure static site (no build process, no npm, no dependencies)
- Optimized images (header.jpg 1.0MB, og-image.jpg 243KB)
- Responsive design with CSS custom properties
- Google Fonts (Kranky, Truculenta) with preloading
- Google Analytics 4 integration
- Deployed to AWS S3 + CloudFront CDN

## File Structure

```
/
├── index.html          # Main HTML file
├── index.css           # Styles with CSS variables and responsive design
├── img/
│   ├── header.jpg      # Hero image (1920x1280, 1.0MB)
│   └── og-image.jpg    # Social sharing image (1200x630, 243KB)
├── favicons/           # Various favicon formats
├── manifest.json       # PWA manifest
├── browserconfig.xml   # Windows tile config
└── scripts/deploy/
    └── to_prod.sh      # Simple deployment script
```

## Development

**Local Development:**
```bash
# Simply open index.html in a browser
open index.html

# Or use Python's built-in server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**No build process needed** - edit HTML/CSS directly and refresh your browser.

## Deployment

**Deploy to Production:**
```bash
./scripts/deploy/to_prod.sh
```

The deployment script:
1. Syncs all files directly to S3 (excluding git, scripts, docs)
2. Invalidates CloudFront cache for immediate updates
3. Uses AWS profile `gb-deploy` (configured in AWS CLI)

**AWS Infrastructure:**
- S3 bucket: `www.gingerbreadvillagect.com`
- CloudFront distribution ID: `E2T4L0EV8WQEB2`
- Files served with public-read ACL and SSE encryption

## CSS Architecture

The `index.css` file uses:
- **CSS Custom Properties** for theme colors (--primary-green, --secondary-green, etc.)
- **Flexbox layouts** for responsive card groups and address sections
- **CSS Grid** via SVG background pattern (candy cane design)
- **Responsive media queries** at 768px and 480px breakpoints
- **Modern CSS features**: mask-image, aspect-ratio, custom properties

**Color Scheme:**
- Primary Green: `#0F8A5F`
- Secondary Green: `#34A65F`
- Text Dark: `rgb(33, 37, 41)`
- Red accent for headers (Kranky font)

## HTML Structure

The page has three main sections:
1. **Header** - Hero section with event title and header.jpg background
2. **Hours Section** - Card-based layout showing event schedule (Dec 7-14, 2024)
3. **Directions Section** - Address block + embedded Google Maps iframe
4. **Footer** - Copyright with dynamic year via JavaScript

## Fonts

- **Kranky** (serif) - Used for headers and decorative text
- **Truculenta** (sans-serif) - Used for body text
- Loaded from Google Fonts with preconnect/preload optimization

## Images

**Optimization Strategy:**
- Original header.png was 4.3MB (too large)
- Optimized to header.jpg at 1.0MB (76% reduction)
- og-image.jpg created at 1200x630px (243KB) for social sharing
- No minification needed - files are already small enough

**To update images:**
```bash
# Optimize a new header image
sips -s format jpeg -s formatOptions 90 new-header.png --out img/header.jpg

# Create new social sharing image
sips -z 630 1200 img/header.jpg --out img/og-image.jpg
```

## Analytics & Metadata

- **Google Analytics 4**: Tracking ID `G-MR1R465MBZ`
- **Facebook App ID**: `263196547519622`
- **Open Graph**: Properly configured for social sharing
- **Favicons**: Multiple formats for all platforms (Apple, Android, Windows, etc.)

## Important Notes

- **No npm/Node.js required** - this is a pure static site
- **No build process** - edit files directly
- **No SCSS** - index.css is hand-written CSS (not compiled)
- **Images are already optimized** - no need for further compression
- **Deployment is direct** - files sync as-is to S3
- **CloudFront caching** - invalidation ensures immediate updates

## Making Changes

**To update event dates:**
Edit the dates in `index.html` around line 58 and in the card sections.

**To update styles:**
Edit `index.css` directly. Use CSS custom properties for colors (defined in `:root`).

**To update header image:**
Replace `img/header.jpg` and regenerate `og-image.jpg` using the sips commands above.

**To test locally:**
Open `index.html` in a browser or use a simple HTTP server. No build step needed.

## Performance

Current page load metrics:
- HTML: ~6KB
- CSS: ~9KB
- Header image: ~1.0MB
- Total: ~1.01MB per page load

With CloudFront caching and gzip compression, repeat visitors see even faster loads.

## Browser Support

The site uses modern CSS features (custom properties, flexbox, mask-image, aspect-ratio) which are supported in:
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

No IE11 support (not needed for this use case).

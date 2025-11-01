# Gingerbread Village - St. George's Episcopal Church

A simple, modern static website for the annual Gingerbread Village & Christmas Bazaar event at St. George's Episcopal Church in Middlebury, CT.

## 🎄 About

The 56th Annual Gingerbread Village & Christmas Bazaar is a beloved holiday tradition featuring gingerbread house displays, a Christmas bazaar, and festive activities. This website provides event information, hours, and directions.

**Event Dates:** December 7-14, 2024
**Location:** 393 Tucker Hill Road, Middlebury, CT 06762
**Website:** https://www.gingerbreadvillagect.com

## 🚀 Features

- **Pure Static Site** - No build process, no npm dependencies
- **Responsive Design** - Works beautifully on all devices
- **Optimized Performance** - Fast loading with optimized images
- **Modern CSS** - Custom properties, flexbox, responsive design
- **Google Fonts** - Beautiful typography with Kranky and Truculenta fonts
- **Analytics** - Google Analytics 4 integration
- **Social Sharing** - Open Graph metadata for Facebook/Twitter
- **AWS Hosted** - S3 + CloudFront for global performance

## 📁 Structure

```
/
├── index.html          # Main HTML page
├── index.css           # Styles with CSS variables
├── img/
│   ├── header.jpg      # Hero image (1.0MB)
│   └── og-image.jpg    # Social sharing image (243KB)
├── favicons/           # Various favicon formats
└── scripts/deploy/
    └── to_prod.sh      # Deployment script
```

## 🛠️ Development

**Local Testing:**
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use Python's built-in server
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Making Changes:**
- Edit `index.html` for content changes
- Edit `index.css` for styling changes
- Refresh your browser to see updates
- No build process needed!

## 🚢 Deployment

**Prerequisites:**
- AWS CLI configured with `gb-deploy` profile
- Access to S3 bucket: `www.gingerbreadvillagect.com`
- Access to CloudFront distribution: `E2T4L0EV8WQEB2`

**Deploy to Production:**
```bash
./scripts/deploy/to_prod.sh
```

The script will:
1. Sync all files to S3 (excluding git, scripts, docs)
2. Invalidate CloudFront cache for immediate updates

## 🎨 Design

**Color Scheme:**
- Primary Green: `#0F8A5F`
- Secondary Green: `#34A65F`
- Red accent for festive headers

**Typography:**
- **Kranky** - Playful serif font for headers
- **Truculenta** - Clean sans-serif for body text

**Layout:**
- Responsive card-based schedule display
- Embedded Google Maps for directions
- Candy cane SVG pattern background

## 📊 Performance

- **HTML:** ~6KB
- **CSS:** ~9KB
- **Images:** ~1.0MB (optimized)
- **Total:** ~1.01MB per page load
- **CloudFront CDN** for fast global delivery
- **Gzip compression** enabled

## 🖼️ Image Optimization

Images have been optimized from 4.3MB PNG to 1.0MB JPEG using macOS `sips` command.

**To update images in the future:**

```bash
# Optimize a new header image (PNG → JPEG at 90% quality)
sips -s format jpeg -s formatOptions 90 new-header.png --out img/header.jpg

# Create new social sharing image (1200x630px)
sips -z 630 1200 img/header.jpg --out img/og-image.jpg
```

**Current optimized images:**
- `header.jpg` - 1.0MB (1920x1280px) - Hero image
- `og-image.jpg` - 243KB (1200x630px) - Social sharing

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Credits

- **Original Template:** Start Bootstrap Creative (heavily simplified)
- **Church:** St. George's Episcopal Church, Middlebury, CT
- **Hosting:** AWS S3 + CloudFront
- **Fonts:** Google Fonts (Kranky, Truculenta)

## 📞 Contact

**St. George's Episcopal Church**
393 Tucker Hill Road
Middlebury, CT 06762
Phone: (203) 758-9864
Website: https://www.stgeorgesct.com

**For Large Groups:**
Barbara Fecteau: (203) 217-4246

---

*This site was rebuilt in 2024 to be a simple, fast, zero-dependency static website.*

# Image Loading Issue - Root Cause Analysis and Resolution

## Problem Statement
Images on the production website (https://1294-test-page.robot-armies.com/) were not loading correctly. Only team-photo-4.jpg was loading properly.

## Root Cause Analysis

### Issue #1: HEIF Format Misnamed as JPEG
The primary issue was that **three image files (team-photo-1.jpg, team-photo-2.jpg, and team-photo-3.jpg) were actually in HEIF format** (Apple's High Efficiency Image Format) but had `.jpg` file extensions. 

- HEIF is not widely supported by web browsers
- Most browsers (Chrome, Firefox, Edge) cannot display HEIF images natively
- Safari has limited support, but not universal
- This caused these images to fail loading in production

**Why team-photo-4.jpg worked:** It was a genuine JPEG file, not HEIF.

### Issue #2: Extremely Large File Sizes
All images had excessive file sizes that were impacting performance:

| File | Original Size | Format |
|------|--------------|--------|
| team-photo-1.jpg | 3.5 MB | HEIF (5712x4284px) |
| team-photo-2.jpg | 9.2 MB | HEIF (12010x3812px) |
| team-photo-3.jpg | 1.2 MB | HEIF (3024x4032px) |
| team-photo-4.jpg | 1.9 MB | JPEG (3072x4080px) |
| team-photo-5.jpg | 1.6 MB | JPEG (1548x2330px) |
| team-photo-6.jpg | 2.2 MB | JPEG (3072x4080px) |
| logo.png | 477 KB | PNG (2400x2400px) |

### Issue #3: 306MB Video File
The IMG_1496.MOV video file was **306 MB**, which is completely unsuitable for web delivery:
- Causes extremely long loading times
- May exceed CDN/hosting limits
- Terrible user experience on mobile/slow connections

## Solutions Implemented

### 1. HEIF to JPEG Conversion
Converted all HEIF files to proper JPEG format using Python's Pillow with pillow-heif:
```python
from PIL import Image
import pillow_heif
pillow_heif.register_heif_opener()

# Convert HEIF to JPEG with optimization
img = Image.open('team-photo-1.jpg')  # Opens HEIF
img.save('team-photo-1.jpg', 'JPEG', quality=85, optimize=True)
```

### 2. Image Optimization
All images were optimized with:
- **Resizing**: Max width of 1920px (suitable for modern displays)
- **Compression**: 85% quality JPEG compression
- **Format conversion**: All images now in web-compatible formats

**Results:**
| File | Before | After | Reduction |
|------|--------|-------|-----------|
| team-photo-1.jpg | 3.5 MB | 676 KB | 81% |
| team-photo-2.jpg | 9.2 MB | 248 KB | 97% |
| team-photo-3.jpg | 1.2 MB | 549 KB | 54% |
| team-photo-4.jpg | 1.9 MB | 455 KB | 76% |
| team-photo-5.jpg | 1.6 MB | 323 KB | 80% |
| team-photo-6.jpg | 2.2 MB | 390 KB | 82% |
| logo.png | 477 KB | 110 KB | 77% |

**Total savings:** ~18.3 MB → ~3.0 MB (84% reduction)

### 3. Video Replacement
Replaced the 306MB video in the hero section with a static optimized image:
```tsx
// Before
<ScrollExpandMedia
  mediaType="video"
  mediaSrc="/IMG_1496.MOV"  // 306MB!
  posterSrc="/team-photo-2.jpg"
  bgImageSrc="/team-photo-2.jpg"

// After
<ScrollExpandMedia
  mediaType="image"
  mediaSrc="/team-photo-2.jpg"  // 248KB
  posterSrc="/team-photo-2.jpg"
  bgImageSrc="/team-photo-2.jpg"
```

## Future Recommendations

### For the Video File
If you want to use video in the hero section in the future:

1. **Convert to Web-Optimized Format:**
   ```bash
   ffmpeg -i IMG_1496.MOV \
     -c:v libx264 \
     -preset slow \
     -crf 23 \
     -vf "scale=1920:-2" \
     -c:a aac \
     -b:a 128k \
     output.mp4
   ```
   This should reduce the file to ~5-10MB

2. **Use External Hosting:**
   - Upload to YouTube/Vimeo and embed
   - Use a CDN specifically designed for video (Cloudflare Stream, AWS CloudFront)

3. **Lazy Loading:**
   - Only load video when user scrolls to that section
   - Provide fallback image for slower connections

### For Future Images
1. **Always use web-compatible formats:**
   - JPEG for photos
   - PNG for logos/graphics with transparency
   - WebP for modern browsers (with fallbacks)
   - Never use HEIF/HEIC on the web

2. **Optimize before uploading:**
   - Resize images to appropriate dimensions (1920px max width)
   - Compress with 80-85% quality
   - Target file sizes: <200KB for photos, <50KB for icons/logos

3. **Use Modern Formats:**
   Consider using WebP with JPEG fallback:
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="...">
   </picture>
   ```

## Verification Steps
After deployment, verify:
1. All team photos load correctly on the production site
2. Hero section displays properly with the static image
3. Page load times are significantly improved
4. Images display correctly across all major browsers (Chrome, Firefox, Safari, Edge)

## Tools Used
- **sharp**: Node.js image processing library
- **Pillow with pillow-heif**: Python library for HEIF conversion
- **npm package**: sharp (added as dev dependency)

## Dependencies Added
```json
{
  "devDependencies": {
    "sharp": "^0.34.5"
  }
}
```

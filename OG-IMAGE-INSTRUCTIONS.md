# Social Media Preview Image Instructions

## What I've Added

I've added Open Graph and Twitter Card meta tags to your `index.html` file. These tags will make your wedding invitation look beautiful when shared on:
- WhatsApp
- Facebook
- Twitter/X
- LinkedIn
- Telegram
- And other social platforms

## Creating the Preview Image

You need to create an image file named `og-image.jpg` in the `public` folder. Here are your options:

### Option 1: Screenshot the Preview Page (Easiest)

1. **Open the preview page in your browser:**
   - Run: `npm run dev`
   - Navigate to: `http://localhost:5173/og-preview.html`

2. **Take a screenshot:**
   - The page is designed to be exactly 1200x630px (optimal for social media)
   - Use browser DevTools to set viewport to 1200x630
   - Or use a screenshot tool to capture the exact dimensions

3. **Save the screenshot:**
   - Save it as `og-image.jpg` in the `public` folder
   - Make sure it's a JPG file (not PNG) for better compression

### Option 2: Use a Design Tool

Create a 1200x630px image using:
- Canva (free templates available)
- Figma
- Photoshop
- Any graphic design tool

**Recommended content:**
- Names: Victor & Esther
- Date: Saturday, 15th November 2025
- Text: "You're Invited" or "Wedding Invitation"
- Use elegant fonts and your wedding colors (#667eea, #764ba2)

### Option 3: Use an Online OG Image Generator

Tools like:
- https://www.opengraph.xyz/
- https://ogimage.gallery/
- https://og-playground.vercel.app/

## After Creating the Image

1. Place `og-image.jpg` in the `/public` folder
2. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add social media preview image"
   git push
   ```

3. Wait for Netlify to deploy (if you have auto-deploy enabled)

## Testing the Preview

After deployment, test your link preview:

1. **WhatsApp**: Share your link in a chat and see the preview
2. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

**Note**: Social platforms cache previews. If you update the image, you may need to:
- Clear the cache using the debugging tools above
- Wait 24-48 hours for the cache to expire
- Add a query parameter to force refresh (e.g., `?v=2`)

## Image Requirements

- **Dimensions**: 1200x630px (2:1 aspect ratio)
- **Format**: JPG or PNG
- **Size**: Under 1MB (preferably under 300KB)
- **Content**: Should be readable when scaled down to thumbnail size

## Current Meta Tags

The following tags have been added to your `index.html`:
- Open Graph tags (for Facebook, WhatsApp, LinkedIn)
- Twitter Card tags (for Twitter/X)
- Image dimensions and alt text
- Site name and descriptions

Your link will now show a beautiful preview card when shared! 🎉

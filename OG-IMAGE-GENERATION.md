# Open Graph Image Generation Guide

## Current Setup

The link preview now uses:
- **Title**: 💒 Victor & Esther's Wedding - You're Invited! 🎉
- **Description**: 🌸 Join us in celebrating our special day! Saturday, 15th November 2025 at 2:00 PM
- **Image**: `/public/og-image.jpg` (currently the bride & groom photo)

## To Create a Custom OG Image

### Option 1: Use the HTML Template (Recommended)

1. Open `public/og-preview.html` in a browser
2. Take a screenshot at 1200x630px resolution
3. Save as `public/og-image.jpg`

### Option 2: Online Tools

Use these free tools to create a 1200x630px image:
- [Canva](https://www.canva.com/) - Use "Facebook Post" template
- [Figma](https://www.figma.com/) - Create custom design
- [OG Image Generator](https://og-image.vercel.app/)

### Option 3: Screenshot with Playwright (Automated)

```bash
npm install -D playwright
npx playwright install chromium
```

Create `scripts/generate-og-image.js`:
```javascript
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`file://${path.resolve(__dirname, '../public/og-preview.html')}`);
  await page.waitForTimeout(1000); // Wait for animations
  
  await page.screenshot({ 
    path: 'public/og-image.jpg',
    type: 'jpeg',
    quality: 90
  });
  
  await browser.close();
  console.log('✅ OG image generated at public/og-image.jpg');
})();
```

Run: `node scripts/generate-og-image.js`

## Testing the Preview

### WhatsApp
1. Send the link in a chat
2. WhatsApp will automatically fetch and display the preview

### Facebook/LinkedIn
Use the debugger tools:
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

### Twitter
Use: https://cards-dev.twitter.com/validator

## Important Notes

- Image must be **1200x630px** for best results
- File size should be under **8MB**
- Use **JPG or PNG** format
- After updating, social platforms may cache the old image for 24-48 hours
- To force refresh, add a query parameter: `og-image.jpg?v=2`

## Current Image Dimensions

The bride-n-groom.jpg is being used. To check its dimensions:
```bash
file public/og-image.jpg
```

If it's not 1200x630, consider resizing or creating a custom one.

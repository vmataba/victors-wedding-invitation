export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Only handle paths that look like guest IDs (numeric)
  const guestIdMatch = path.match(/^\/(\d+)$/);
  if (!guestIdMatch) {
    return context.next();
  }
  
  const guestId = guestIdMatch[1];
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detect if it's a bot/crawler (WhatsApp, Facebook, Twitter, etc.)
  const isBot = /bot|crawler|spider|crawling|facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot/i.test(userAgent);
  
  // If it's a bot, serve HTML with OG tags
  if (isBot) {
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    <meta name="description" content="💍 You're invited to celebrate the wedding of Victor & Esther! Saturday, 15th November 2025 at St. Gaudence Makoka Parish. View your personalized invitation card." />
    <meta name="theme-color" content="#667eea" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://victors-wedding-invitation.netlify.app/${guestId}" />
    <meta property="og:title" content="💒 Victor & Esther's Wedding - You're Invited! 🎉" />
    <meta property="og:description" content="🌸 Join us in celebrating our special day! Saturday, 15th November 2025 at 2:00 PM. St. Gaudence Makoka Parish. Click to view your personalized invitation card! 💐" />
    <meta property="og:image" content="https://victors-wedding-invitation.netlify.app/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Victor & Esther Wedding Invitation Card" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://victors-wedding-invitation.netlify.app/${guestId}" />
    <meta name="twitter:title" content="💒 Victor & Esther's Wedding - You're Invited! 🎉" />
    <meta name="twitter:description" content="🌸 Join us in celebrating our special day! Saturday, 15th November 2025 at 2:00 PM. St. Gaudence Makoka Parish. Click to view your personalized invitation card! 💐" />
    <meta name="twitter:image" content="https://victors-wedding-invitation.netlify.app/og-image.jpg" />
    
    <!-- WhatsApp specific -->
    <meta property="og:site_name" content="Victor & Esther Wedding" />
    
    <title>💒 Victor & Esther's Wedding Invitation</title>
  </head>
  <body>
    <h1>Victor & Esther's Wedding</h1>
    <p>You're invited to celebrate our special day!</p>
    <p>Saturday, 15th November 2025 at 2:00 PM</p>
    <p>St. Gaudence Makoka Parish</p>
  </body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
  
  // For regular users, continue to the SPA
  return context.next();
};

export const config = {
  path: "/*"
};

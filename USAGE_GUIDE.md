# Wedding Invitation System - Usage Guide

## Quick Start

The application is now running at `http://localhost:5174`

## How to Use

### 1. Verification Page (Default Landing)

When you first open the application, you'll land on the **Verification System** at `/verify`.

#### Option A: QR Code Scanner
1. Click the **"QR Scanner"** tab (default)
2. Click **"Start Camera"** button
3. Grant camera permissions when prompted
4. Point your camera at a QR code containing guest information
5. The system will automatically scan and verify

#### Option B: Manual Card Number Entry
1. Click the **"Manual Entry"** tab
2. Enter a card number in the text field
3. Click **"Verify Invitation"**

**Test Card Numbers:**
- `WED2024-001` - John & Sarah Smith (VIP, 2 guests, Confirmed)
- `WED2024-002` - Maria Garcia (Family, 1 guest, Pending)
- `WED2024-003` - Robert & Jennifer Lee (Friend, 2 guests, Confirmed)

### 2. Viewing Invitation Cards

After successful verification:
1. Click **"View Full Invitation"** button
2. You'll be redirected to `/invitation/{guestId}`
3. The invitation card displays:
   - Couple's names with elegant typography
   - Guest information (name, guest count, table number)
   - RSVP status
   - Personal message (if available)
   - Event details (date, time, venue, address)
   - Dress code
   - Dietary restrictions (if any)
   - RSVP deadline reminder

### 3. Direct URL Access

You can also access invitations directly via URL:
- `http://localhost:5174/invitation/GUEST001`
- `http://localhost:5174/invitation/GUEST002`
- `http://localhost:5174/invitation/GUEST003`

## Features Demonstration

### Material Design Elements

**Typography:**
- Headings use "Playfair Display" serif font for elegance
- Body text uses "Roboto" for readability
- Responsive font sizes adapt to screen size

**Color Scheme:**
- Primary: Purple gradient (#667eea to #764ba2)
- Cards have elevation shadows
- Smooth color transitions on interactions

**Animations:**
- Fade-in effects on page load
- Slide-up animations for content sections
- Smooth tab transitions
- Loading spinners during API calls

**Components:**
- Material Cards with rounded corners
- Chips for tags and status indicators
- Alerts for notifications
- Tabs for navigation
- Icons from Material Icons library

### Mobile Responsiveness

**Test on Different Screen Sizes:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Try different device presets:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - Desktop (1920px)

**Mobile Features:**
- Touch-friendly buttons (minimum 44x44px)
- Responsive padding and margins
- Adaptive font sizes
- Stack layout on mobile, grid on desktop
- Camera access for QR scanning

### Accessibility

- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels for screen readers
- High contrast text
- Touch target sizes meet WCAG guidelines

## Testing Scenarios

### Scenario 1: First-Time Guest
1. Open `/verify`
2. Use manual entry with `WED2024-001`
3. View guest details in verification result
4. Click "View Full Invitation"
5. Explore the complete invitation card

### Scenario 2: QR Code Scanning (Mobile)
1. Open on mobile device
2. Navigate to `/verify`
3. Click "Start Camera"
4. Grant camera permissions
5. Scan a QR code (you can generate one with guest data)

### Scenario 3: Direct Link Access
1. Share link: `http://localhost:5174/invitation/GUEST002`
2. Recipient opens link directly
3. Views invitation without verification step

### Scenario 4: Invalid Verification
1. Try card number: `INVALID-123`
2. See error message
3. Error is dismissible
4. Can retry with valid number

## Customization Guide

### Changing Wedding Details

Edit `/src/services/api.ts`:
```typescript
weddingDetails: {
  brideName: 'Your Bride Name',
  groomName: 'Your Groom Name',
  date: 'Your Date',
  time: 'Your Time',
  venue: 'Your Venue',
  address: 'Your Address',
  dressCode: 'Your Dress Code',
  rsvpDeadline: 'Your Deadline'
}
```

### Adding More Guests

In `/src/services/api.ts`, add to `invitationDatabase`:
```typescript
'GUEST004': {
  guestId: 'GUEST004',
  cardNumber: 'WED2024-004',
  guest: {
    id: 'GUEST004',
    name: 'Guest Name',
    guestCount: 1,
    invitationType: 'Friend',
    confirmed: false,
    plusOne: false,
  },
  weddingDetails: { /* same as above */ }
}
```

### Changing Theme Colors

Edit `/src/App.tsx`:
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
    secondary: {
      main: '#your-color',
    },
  },
});
```

## Troubleshooting

### Camera Not Working
- Ensure HTTPS is used (required for camera access)
- Check browser permissions
- Try different browser (Chrome/Safari recommended)
- Test on actual mobile device

### Card Number Not Found
- Verify card number format (case-insensitive)
- Check if guest exists in database
- Use provided test numbers

### Styling Issues
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check console for errors

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. The `dist` folder contains production files

3. Deploy to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

4. **Important for QR Scanner:**
   - Must use HTTPS in production
   - Configure camera permissions
   - Test on actual devices

## Support

For issues or questions:
1. Check console for errors (F12)
2. Review this guide
3. Contact development team

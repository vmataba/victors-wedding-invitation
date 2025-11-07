# Design Updates - Burgundy/Gold Wedding Invitation Theme

## Overview
The invitation card has been redesigned to match the elegant burgundy and gold aesthetic shown in the reference image.

## Key Design Changes

### Color Palette
- **Primary Background**: Deep burgundy gradient (#4a0e4e → #81003f → #4a0e4e)
- **Card Background**: Rich maroon gradient (#6b1b4d → #8b2252 → #6b1b4d)
- **Accent Color**: Luxurious gold (#d4af37)
- **Text Colors**: 
  - Light cream (#f5e6d3) for main text on dark backgrounds
  - Deep burgundy (#4a0e4e, #6b1b4d) for text on light backgrounds

### Typography
- **"Save the Date"**: Great Vibes cursive font (5rem desktop, 3rem mobile)
- **Bride & Groom Names**: Great Vibes cursive (4rem desktop, 2.8rem mobile)
- **Body Text**: Roboto for readability
- **All script text**: Gold color with text shadows for depth

### Layout Features

#### Main Invitation Header
1. **"Save the Date"** heading in elegant gold script
2. **Circular Frame Design**:
   - Double golden circle borders with glow effects
   - Sparkle/star effect in top-right corner
   - Content centered within circle
3. **Names Display**:
   - First names only in large cursive script
   - Wedding rings emoji (💍) between names with glow effect
   - "For the wedding of" subtitle
4. **Event Information**:
   - Date and time prominently displayed
   - Venue and address in cream color
   - Decorative heart emoji at bottom

#### Information Sections
All sections now feature the burgundy/gold theme:

1. **Guest Information Card**:
   - Burgundy gradient background
   - Gold border and accents
   - Gold chips for guest details
   - Green/yellow status indicators for RSVP

2. **Personal Message**:
   - Light background with gold left border
   - Burgundy text for contrast

3. **Event Details**:
   - White background with gold border
   - Gold icons for each detail
   - Burgundy text with proper hierarchy

4. **Dietary Preferences**:
   - Matching white background
   - Gold-bordered chips

5. **RSVP Reminder**:
   - Gold-tinted alert box
   - Gold border and icon

### Visual Effects
- **Radial gradients** for depth and dimension
- **Box shadows** with gold tint on circular frame
- **Text shadows** on all gold script text
- **Sparkle effect** using CSS pseudo-elements
- **Smooth animations** (fade, slide) on all sections

### Mobile Responsiveness
- Circular frame scales from 280px (mobile) to 400px (desktop)
- Font sizes adapt responsively
- All sections maintain proper spacing on small screens
- Touch-friendly interactions maintained

## Technical Implementation

### Files Modified
1. `/src/components/InvitationCard.tsx` - Complete redesign
2. `/src/index.css` - Added Great Vibes and Tangerine fonts

### Color Variables Used
```css
Primary Burgundy: #4a0e4e, #6b1b4d, #8b2252, #81003f
Gold Accent: #d4af37
Light Text: #f5e6d3
Background Tint: rgba(245, 230, 211, 0.95)
```

## Testing
View the invitation at:
- `http://localhost:5174/invitation/GUEST001`
- `http://localhost:5174/invitation/GUEST002`
- `http://localhost:5174/invitation/GUEST003`

Or verify first at: `http://localhost:5174/verify`

## Design Inspiration
The design closely matches the reference image with:
- ✅ Burgundy/maroon gradient background
- ✅ Gold script typography
- ✅ Circular frame with double borders
- ✅ "Save the Date" heading
- ✅ Elegant name display with wedding rings
- ✅ Date, time, and venue information
- ✅ Sparkle/star decorative elements
- ✅ Professional and elegant aesthetic

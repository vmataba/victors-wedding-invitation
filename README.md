# Wedding Invitation Card System 💍

A modern, mobile-first wedding invitation management system built with React, TypeScript, and Material-UI. This application allows guests to verify their invitations via QR code scanning or manual card number entry, and view beautifully designed digital invitation cards.

## ✨ Features

### 🎫 Wedding Invitation Card Viewer
- **Route**: `/invitation/{guestIdentifier}`
- Elegant, responsive invitation card display
- Material Design components with smooth animations
- Guest-specific information and personalized messages
- Wedding event details with icons
- RSVP status tracking
- Dietary restrictions display
- Mobile-optimized layout with touch-friendly interactions

### ✅ Invitation Verification System
- **Route**: `/verify`
- Dual verification methods:
  - **QR Code Scanner**: Camera-based scanning using device camera
  - **Manual Entry**: Card number input with validation
- Real-time verification feedback
- Guest details preview after successful verification
- Secure and intuitive verification flow
- Example card numbers for testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd victors-wedding-inv-card
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📱 Mobile-First Design

This application is built with mobile-first principles:
- Responsive layouts that adapt to all screen sizes
- Touch-friendly tap targets (minimum 44x44px)
- Optimized font sizes for mobile readability
- Smooth animations and transitions
- Safe area insets for notched devices
- Camera access for QR code scanning on mobile devices

## 🎨 Material Design Implementation

The application follows Material Design 3 guidelines:
- **Elevation**: Cards with appropriate shadow depths
- **Typography**: Playfair Display for headings, Roboto for body text
- **Color Scheme**: Custom purple gradient theme (#667eea to #764ba2)
- **Components**: Cards, Buttons, Chips, Alerts, Tabs, and more
- **Animations**: Fade, Slide, and custom transitions
- **Accessibility**: Focus indicators and ARIA labels

## 🧪 Testing the Application

### Test Card Numbers
Use these card numbers to test the verification system:
- `WED2024-001` - John & Sarah Smith (VIP, Confirmed)
- `WED2024-002` - Maria Garcia (Family, Pending)
- `WED2024-003` - Robert & Jennifer Lee (Friend, Confirmed)

### Test Guest IDs
Access invitations directly via URL:
- `/invitation/GUEST001`
- `/invitation/GUEST002`
- `/invitation/GUEST003`

## 📂 Project Structure

```
src/
├── components/
│   ├── InvitationCard.tsx      # Wedding invitation card viewer
│   └── VerificationSystem.tsx  # QR scanner & manual verification
├── services/
│   └── api.ts                   # API service layer with dummy data
├── App.tsx                      # Main app with routing
├── main.tsx                     # Application entry point
└── index.css                    # Global styles (mobile-first)
```

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **html5-qrcode** - QR code scanning
- **Emotion** - CSS-in-JS styling

## 🔒 Security Features

- Input validation for card numbers
- Error handling for invalid QR codes
- Secure API service layer
- No sensitive data in client-side code

## 📱 Camera Permissions

For QR code scanning to work:
1. Grant camera permissions when prompted
2. Ensure you're using HTTPS in production
3. Test on actual mobile devices for best results

## 🎯 Future Enhancements

- RSVP confirmation functionality
- Email notifications
- Calendar integration
- Social media sharing
- Multi-language support
- Dark mode theme
- Offline support with PWA

## 📄 License

This project is private and proprietary.

## 👥 Contact

For questions or support, please contact the wedding organizers.

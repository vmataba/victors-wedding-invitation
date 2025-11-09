import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Fade,
  Slide,
  Container,
  Stack,
} from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { QRCodeSVG } from 'qrcode.react';
import { fetchInvitationByGuestId } from '../services/api';
import type { InvitationCardWithWedding as InvitationCardType } from '../services/api';
import brideGroomImage from '../assets/bride-n-groom.jpg';

export default function InvitationCard() {
  const { guestIdentifier } = useParams<{ guestIdentifier: string }>();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationCardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvitation = async () => {
      if (!guestIdentifier) {
        setError('No guest identifier provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchInvitationByGuestId(guestIdentifier);
        setInvitation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load invitation');
      } finally {
        setLoading(false);
      }
    };

    loadInvitation();
  }, [guestIdentifier]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !invitation) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Fade in timeout={500}>
          <Box>
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={() => navigate('/verify')}>
                  Verify
                </Button>
              }
            >
              {error || 'Invitation not found'}
            </Alert>
            <Button
              variant="outlined"
              onClick={() => navigate('/verify')}
              fullWidth
            >
              Go to Verification
            </Button>
          </Box>
        </Fade>
      </Container>
    );
  }

  const { guest, weddingDetails } = invitation;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e8f5e9 100%)',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(46, 125, 50, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 195, 74, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Card
            elevation={24}
            sx={{
              borderRadius: { xs: 2, sm: 3 },
              overflow: 'hidden',
              position: 'relative',
              maxWidth: 600,
              mx: 'auto',
              border: '3px solid #d4af37',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(212, 175, 55, 0.3)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${brideGroomImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 255, 245, 0.80) 50%, rgba(255, 255, 255, 0.85) 100%)',
                zIndex: 1,
              },
            }}
          >
            {/* Falling stars decoration */}
            {/* Star 1 - Falling diagonally */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: '10%',
                fontSize: '1.2rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar1 8s linear infinite',
                '@keyframes fallingStar1': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) rotate(0deg)',
                  },
                  '10%': { 
                    opacity: 0.8,
                  },
                  '90%': { 
                    opacity: 0.8,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(100px, 600px) rotate(360deg)',
                  },
                },
              }}
            >
              ✨
            </Box>
            
            {/* Star 2 - Falling from right */}
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: '15%',
                fontSize: '1rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar2 10s linear infinite 2s',
                '@keyframes fallingStar2': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) rotate(0deg)',
                  },
                  '10%': { 
                    opacity: 1,
                  },
                  '90%': { 
                    opacity: 1,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(-80px, 650px) rotate(-360deg)',
                  },
                },
              }}
            >
              ⭐
            </Box>
            
            {/* Star 3 - Falling from left middle */}
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                left: '5%',
                fontSize: '0.9rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar3 12s linear infinite 4s',
                '@keyframes fallingStar3': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) scale(0.5) rotate(0deg)',
                  },
                  '10%': { 
                    opacity: 0.9,
                    transform: 'translate(0, 50px) scale(1) rotate(45deg)',
                  },
                  '90%': { 
                    opacity: 0.9,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(120px, 700px) scale(0.5) rotate(360deg)',
                  },
                },
              }}
            >
              ✨
            </Box>
            
            {/* Star 4 - Falling from right middle */}
            <Box
              sx={{
                position: 'absolute',
                top: -25,
                right: '8%',
                fontSize: '1.1rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar4 9s linear infinite 6s',
                '@keyframes fallingStar4': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) rotate(0deg)',
                  },
                  '15%': { 
                    opacity: 0.85,
                  },
                  '85%': { 
                    opacity: 0.85,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(-100px, 600px) rotate(-270deg)',
                  },
                },
              }}
            >
              ⭐
            </Box>
            
            {/* Star 5 - Falling from center */}
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                left: '50%',
                fontSize: '1rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar5 11s linear infinite 1s',
                '@keyframes fallingStar5': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(-50%, 0) rotate(0deg)',
                  },
                  '10%': { 
                    opacity: 1,
                  },
                  '90%': { 
                    opacity: 1,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(30px, 680px) rotate(360deg)',
                  },
                },
              }}
            >
              ✨
            </Box>
            
            {/* Star 6 - Falling from left */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: '20%',
                fontSize: '0.8rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar6 13s linear infinite 5s',
                '@keyframes fallingStar6': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) rotate(0deg)',
                  },
                  '12%': { 
                    opacity: 0.7,
                  },
                  '88%': { 
                    opacity: 0.7,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(90px, 720px) rotate(360deg)',
                  },
                },
              }}
            >
              ⭐
            </Box>
            
            {/* Star 7 - Falling from right */}
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: '25%',
                fontSize: '1.15rem',
                color: '#d4af37',
                zIndex: 3,
                animation: 'fallingStar7 10.5s linear infinite 3s',
                '@keyframes fallingStar7': {
                  '0%': { 
                    opacity: 0, 
                    transform: 'translate(0, 0) scale(0.8) rotate(0deg)',
                  },
                  '10%': { 
                    opacity: 0.95,
                    transform: 'translate(0, 40px) scale(1) rotate(30deg)',
                  },
                  '90%': { 
                    opacity: 0.95,
                  },
                  '100%': { 
                    opacity: 0, 
                    transform: 'translate(-110px, 660px) scale(0.8) rotate(-360deg)',
                  },
                },
              }}
            >
              ✨
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                py: { xs: 2, sm: 2.5 },
                px: { xs: 2, sm: 2.5 },
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Slide direction="down" in timeout={600}>
                <Box>
                  {/* Decorative top flourish */}
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ color: '#2e7d32', fontSize: '1.2rem', opacity: 0.6 }}>
                      🌿
                    </Typography>
                  </Box>

                  {/* Save the Date */}
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: '"Allura", "Great Vibes", cursive',
                      fontWeight: 400,
                      color: '#2e7d32',
                      mb: 1,
                      fontSize: { xs: '2.2rem', sm: '3rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Save the Date
                  </Typography>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.4 }} />
                    <Typography sx={{ color: '#d4af37', fontSize: '0.9rem' }}>💚</Typography>
                    <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.4 }} />
                  </Box>

                  {/* Wedding announcement */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Cinzel", serif',
                      color: '#424242',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      mb: 1.5,
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    For the Wedding Of
                  </Typography>

                  {/* Groom & Bride Names - One line with ring */}
                  <Box 
                    sx={{ 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Alex Brush", "Allura", cursive',
                        color: '#1b5e20',
                        fontSize: { xs: '2.5rem', sm: '3.5rem' },
                        fontWeight: 400,
                        lineHeight: 1.2,
                        textShadow: '2px 2px 6px rgba(0,0,0,0.15)',
                        animation: 'fadeInLeft 1s ease-out',
                        '@keyframes fadeInLeft': {
                          '0%': { opacity: 0, transform: 'translateX(-20px)' },
                          '100%': { opacity: 1, transform: 'translateX(0)' },
                        },
                      }}
                    >
                      {weddingDetails.groomName}
                    </Typography>
                    
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        mx: 1,
                      }}
                    >
                      {/* First Ring */}
                      <Box
                        sx={{
                          position: 'relative',
                          animation: 'ringPulse 2.5s ease-in-out infinite',
                          '@keyframes ringPulse': {
                            '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                            '50%': { transform: 'scale(1.1) rotate(-5deg)' },
                          },
                        }}
                      >
                        <PanoramaFishEyeIcon
                          sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem' },
                            color: '#d4af37',
                            filter: 'drop-shadow(0 3px 8px rgba(212, 175, 55, 0.7))',
                            strokeWidth: 3,
                            position: 'relative',
                            zIndex: 2,
                          }}
                        />
                        {/* Inner glow */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60%',
                            height: '60%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                            zIndex: 1,
                          }}
                        />
                      </Box>
                      
                      {/* Second Ring - Overlapping */}
                      <Box
                        sx={{
                          position: 'relative',
                          marginLeft: '-0.8rem',
                          animation: 'ringPulse2 2.5s ease-in-out infinite',
                          '@keyframes ringPulse2': {
                            '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                            '50%': { transform: 'scale(1.1) rotate(5deg)' },
                          },
                        }}
                      >
                        <PanoramaFishEyeIcon
                          sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem' },
                            color: '#c9a961',
                            filter: 'drop-shadow(0 3px 8px rgba(201, 169, 97, 0.7))',
                            strokeWidth: 3,
                            position: 'relative',
                            zIndex: 1,
                          }}
                        />
                        {/* Inner glow */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60%',
                            height: '60%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%)',
                            zIndex: 0,
                          }}
                        />
                      </Box>

                      {/* Sparkle effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          fontSize: '1rem',
                          animation: 'sparkle 2s ease-in-out infinite',
                          '@keyframes sparkle': {
                            '0%, 100%': { opacity: 0, transform: 'scale(0.5) rotate(0deg)' },
                            '50%': { opacity: 1, transform: 'scale(1) rotate(180deg)' },
                          },
                        }}
                      >
                        ✨
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Alex Brush", "Allura", cursive',
                        color: '#1b5e20',
                        fontSize: { xs: '2.5rem', sm: '3.5rem' },
                        fontWeight: 400,
                        lineHeight: 1.2,
                        textShadow: '2px 2px 6px rgba(0,0,0,0.15)',
                        animation: 'fadeInRight 1s ease-out',
                        '@keyframes fadeInRight': {
                          '0%': { opacity: 0, transform: 'translateX(20px)' },
                          '100%': { opacity: 1, transform: 'translateX(0)' },
                        },
                      }}
                    >
                      {weddingDetails.brideName}
                    </Typography>
                  </Box>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: 2 }}>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                    <Typography sx={{ color: '#d4af37', fontSize: '0.85rem', opacity: 0.6 }}>✨</Typography>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                  </Box>

                  {/* Guest Details - Moved before Event Details */}
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: 2,
                      p: { xs: 1.5, sm: 2 },
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
                      mb: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {/* Invite message with guest name */}
                      <Box sx={{ textAlign: 'center', pb: 1.5, borderBottom: '2px solid rgba(46, 125, 50, 0.2)' }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: '"Cormorant Garamond", serif',
                            color: '#424242', 
                            mb: 0.8,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontStyle: 'italic',
                            fontWeight: 500,
                          }}
                        >
                          We Welcome You
                        </Typography>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontFamily: '"Playfair Display", serif',
                            color: '#1b5e20', 
                            fontWeight: 700,
                            fontSize: { xs: '1.3rem', sm: '1.5rem' },
                            letterSpacing: '0.02em',
                          }}
                        >
                          {guest.name}
                        </Typography>
                      </Box>

                      {/* Guest Count - centered */}
                      <Box sx={{ textAlign: 'center', pt: 0.5 }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontFamily: '"Cinzel", serif',
                            color: '#616161', 
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 500,
                          }}
                        >
                          Number of Guests
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: '"Playfair Display", serif',
                            color: '#2e7d32', 
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                            mt: 0.3,
                          }}
                        >
                          {guest.guestCount}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: 2 }}>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                    <Typography sx={{ color: '#d4af37', fontSize: '0.85rem', opacity: 0.6 }}>🌿</Typography>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                  </Box>

                  {/* Event Details Box */}
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: 2,
                      p: { xs: 1.5, sm: 2 },
                      mb: 2,
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Cinzel", serif',
                        color: '#2e7d32',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        mb: 1.5,
                      }}
                    >
                      Ceremony Details
                    </Typography>

                    <Stack spacing={1.5}>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: '#1b5e20',
                            fontSize: { xs: '1.2rem', sm: '1.4rem' },
                            fontWeight: 700,
                            mb: 0.3,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {weddingDetails.date}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            color: '#424242',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontWeight: 500,
                          }}
                        >
                          {weddingDetails.time}
                        </Typography>
                      </Box>

                      <Divider sx={{ borderColor: '#2e7d32', opacity: 0.3 }} />

                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: '#2e7d32',
                            fontSize: { xs: '1.05rem', sm: '1.2rem' },
                            fontWeight: 700,
                            mb: 0.3,
                            letterSpacing: '0.01em',
                          }}
                        >
                          {weddingDetails.venue}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            color: '#616161',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                            fontWeight: 400,
                          }}
                        >
                          {weddingDetails.address}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* RSVP Link */}
                  <Box sx={{ mt: 2.5, textAlign: 'center' }}>
                    <Typography
                      component="button"
                      sx={{
                        color: '#757575',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        textTransform: 'none',
                        fontWeight: 400,
                        letterSpacing: '0.03em',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        fontFamily: 'inherit',
                        '&:hover': {
                          color: '#616161',
                          textDecoration: 'underline',
                        },
                        transition: 'all 0.2s',
                      }}
                      onClick={() => {
                        // Handle RSVP decline
                        if (window.confirm('Are you sure you cannot attend?')) {
                          alert('Thank you for letting us know. We will miss you!');
                        }
                      }}
                    >
                      I won't be able to attend
                    </Typography>
                  </Box>

                  {/* Bottom decoration with serial number and QR code */}
                  <Box sx={{ mt: 2.5, position: 'relative', minHeight: '80px', pb: 1 }}>
                    {/* Center decoration and serial number */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1.5 }}>
                        <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                        <Typography sx={{ color: '#d4af37', fontSize: '0.9rem', opacity: 0.5 }}>💚</Typography>
                        <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: '"Cinzel", serif',
                          color: '#616161',
                          opacity: 0.6,
                          fontWeight: 400,
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Serial No: {guest.id}
                      </Typography>
                    </Box>

                    {/* QR Code - Bottom Right */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: { xs: 8, sm: 16 },
                        bgcolor: 'white',
                        p: 0.5,
                        borderRadius: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <QRCodeSVG
                        value={`${window.location.origin}/invitation/${guest.id}`}
                        size={60}
                        level="M"
                        includeMargin={false}
                        fgColor="#1b5e20"
                      />
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </Box>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}

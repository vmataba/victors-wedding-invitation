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

  const { weddingDetails } = invitation;

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
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography sx={{ color: '#66bb6a', fontSize: '1.2rem', opacity: 0.7 }}>🌸</Typography>
                    <Typography sx={{ color: '#4caf50', fontSize: '1.3rem', opacity: 0.6 }}>🤍</Typography>
                    <Typography sx={{ color: '#66bb6a', fontSize: '1.2rem', opacity: 0.7 }}>🌸</Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Cinzel", serif',
                      color: '#1b5e20',
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      mb: 2.5,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      lineHeight: 1.4,
                    }}
                  >
                    💍 Wedding Invitation
                  </Typography>

                  {/* Family Introduction */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 2,
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    The family of Natalis Mataba of Maswa, Simiyu,<br />
                    together with the Organizing Committee,<br />
                    warmly invite
                  </Typography>

                  {/* Guest Name - Highlighted */}
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: 2,
                      p: { xs: 1.5, sm: 2 },
                      mb: 2,
                      boxShadow: '0 4px 16px rgba(46, 125, 50, 0.15)',
                      border: '2px solid rgba(46, 125, 50, 0.3)',
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        color: '#1b5e20', 
                        fontWeight: 700,
                        fontSize: { xs: '1.3rem', sm: '1.6rem' },
                        letterSpacing: '0.02em',
                        lineHeight: 1.3,
                        textAlign: 'center',
                      }}
                    >
                      {invitation.name}
                    </Typography>
                    {invitation.totalInvitees > 1 && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: '"Josefin Sans", sans-serif',
                          color: '#2e7d32', 
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                          mt: 0.5,
                          textAlign: 'center',
                        }}
                      >
                        and {invitation.totalInvitees - 1} guest{invitation.totalInvitees > 2 ? 's' : ''}
                      </Typography>
                    )}
                  </Box>

                  {/* Celebration text */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 2,
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    to the joyful celebration of the marriage of their son,
                  </Typography>

                  {/* Groom Name */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: '"Dancing Script", cursive',
                      color: '#1b5e20',
                      fontSize: { xs: '2.5rem', sm: '3.5rem' },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                      mb: 1.5,
                      textAlign: 'center',
                      animation: 'fadeInLeft 1s ease-out',
                      '@keyframes fadeInLeft': {
                        '0%': { opacity: 0, transform: 'translateX(-20px)' },
                        '100%': { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    {weddingDetails.groomName},
                  </Typography>

                  {/* Exchange vows text */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 1.5,
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    who will exchange vows with
                  </Typography>

                  {/* Bride Name */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: '"Dancing Script", cursive',
                      color: '#1b5e20',
                      fontSize: { xs: '2.5rem', sm: '3.5rem' },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                      mb: 2.5,
                      textAlign: 'center',
                      animation: 'fadeInRight 1s ease-out',
                      '@keyframes fadeInRight': {
                        '0%': { opacity: 0, transform: 'translateX(20px)' },
                        '100%': { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    {weddingDetails.brideName},
                  </Typography>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: 2.5 }}>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                    <Typography sx={{ color: '#66bb6a', fontSize: '1rem' }}>🌺</Typography>
                    <Box sx={{ width: 70, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                  </Box>

                  {/* Ceremony Details */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 2,
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    in a Holy Mass at <strong style={{ color: '#2e7d32' }}>{weddingDetails.venue}</strong>,<br />
                    on <strong style={{ color: '#1b5e20' }}>{weddingDetails.date}</strong>, starting at <strong>{weddingDetails.time}</strong>
                  </Typography>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: 2 }}>
                    <Box sx={{ width: 50, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                    <Typography sx={{ color: '#81c784', fontSize: '0.9rem' }}>🌿</Typography>
                    <Box sx={{ width: 50, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                  </Box>

                  {/* Reception Details */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 2.5,
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    Thereafter, a reception party will be held at<br />
                    <strong style={{ color: '#2e7d32' }}>{weddingDetails.address}</strong>
                  </Typography>

                  {/* Decorative divider */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: 2 }}>
                    <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                    <Typography sx={{ color: '#d4af37', fontSize: '0.9rem', opacity: 0.6 }}>💚</Typography>
                    <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                  </Box>

                  {/* Closing Message */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Josefin Sans", sans-serif',
                      color: '#424242',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      fontStyle: 'italic',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    Your presence and blessings will be deeply appreciated<br />
                    as we share in this moment of love and joy.
                  </Typography>

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
                        Serial No: {invitation.id}
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
                        value={`${window.location.origin}/invitation/${invitation.id}`}
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

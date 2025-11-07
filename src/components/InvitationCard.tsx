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
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: '10%',
                fontSize: '1.2rem',
                color: '#d4af37',
                opacity: 0.6,
                zIndex: 3,
                animation: 'twinkle 3s ease-in-out infinite',
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                },
              }}
            >
              ✨
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 40,
                right: '15%',
                fontSize: '1rem',
                color: '#d4af37',
                opacity: 0.5,
                zIndex: 3,
                animation: 'twinkle 2.5s ease-in-out infinite 0.5s',
              }}
            >
              ⭐
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '30%',
                left: '5%',
                fontSize: '0.9rem',
                color: '#d4af37',
                opacity: 0.4,
                zIndex: 3,
                animation: 'twinkle 3.5s ease-in-out infinite 1s',
              }}
            >
              ✨
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                right: '8%',
                fontSize: '1.1rem',
                color: '#d4af37',
                opacity: 0.5,
                zIndex: 3,
                animation: 'twinkle 2.8s ease-in-out infinite 1.5s',
              }}
            >
              ⭐
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 60,
                left: '12%',
                fontSize: '1rem',
                color: '#d4af37',
                opacity: 0.6,
                zIndex: 3,
                animation: 'twinkle 3.2s ease-in-out infinite 0.8s',
              }}
            >
              ✨
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                right: '20%',
                fontSize: '0.8rem',
                color: '#d4af37',
                opacity: 0.4,
                zIndex: 3,
                animation: 'twinkle 2.6s ease-in-out infinite 1.2s',
              }}
            >
              ⭐
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
                      fontFamily: '"Great Vibes", "Tangerine", cursive',
                      fontWeight: 400,
                      color: '#2e7d32',
                      mb: 1,
                      fontSize: { xs: '1.8rem', sm: '2.4rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                      letterSpacing: '0.02em',
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
                      color: '#424242',
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      mb: 1.5,
                      fontWeight: 400,
                      letterSpacing: '0.05em',
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
                        fontFamily: '"Great Vibes", "Tangerine", cursive',
                        color: '#1b5e20',
                        fontSize: { xs: '2rem', sm: '2.8rem' },
                        fontWeight: 400,
                        lineHeight: 1,
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
                        animation: 'ringPulse 2s ease-in-out infinite',
                        '@keyframes ringPulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.15)' },
                        },
                      }}
                    >
                      <Box
                        component="svg"
                        viewBox="0 0 80 50"
                        sx={{
                          width: { xs: '56px', sm: '72px' },
                          height: { xs: '35px', sm: '45px' },
                          filter: 'drop-shadow(0 2px 6px rgba(212, 175, 55, 0.5))',
                        }}
                      >
                        <defs>
                          <linearGradient id="ringGold" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffd700" />
                            <stop offset="40%" stopColor="#d4af37" />
                            <stop offset="100%" stopColor="#b8860b" />
                          </linearGradient>
                        </defs>
                        
                        {/* Left Ring */}
                        <circle
                          cx="25"
                          cy="25"
                          r="15"
                          fill="none"
                          stroke="url(#ringGold)"
                          strokeWidth="5"
                        />
                        
                        {/* Right Ring */}
                        <circle
                          cx="50"
                          cy="25"
                          r="15"
                          fill="none"
                          stroke="url(#ringGold)"
                          strokeWidth="5"
                        />
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Great Vibes", "Tangerine", cursive',
                        color: '#1b5e20',
                        fontSize: { xs: '2rem', sm: '2.8rem' },
                        fontWeight: 400,
                        lineHeight: 1,
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
                            color: '#424242', 
                            mb: 0.8,
                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                            fontStyle: 'italic',
                          }}
                        >
                          We Welcome You
                        </Typography>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: '#1b5e20', 
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
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
                            color: '#616161', 
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Number of Guests
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#2e7d32', 
                            fontWeight: 600,
                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
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
                        color: '#2e7d32',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        fontWeight: 600,
                        letterSpacing: '0.1em',
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
                            color: '#1b5e20',
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          {weddingDetails.date}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#424242',
                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
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
                            color: '#2e7d32',
                            fontSize: { xs: '1rem', sm: '1.15rem' },
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          {weddingDetails.venue}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#616161',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
                          color: '#616161',
                          opacity: 0.6,
                          fontWeight: 400,
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          letterSpacing: '0.1em',
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

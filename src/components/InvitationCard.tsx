import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Fade,
  Slide,
  Container,
  Stack,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { fetchInvitationByGuestId, acceptInvitation, declineInvitation } from '../services/card-vew.service';
import type { InvitationCardWithWedding as InvitationCardType } from '../services/card-vew.service';
import brideGroomImage from '../assets/bride-n-groom.jpg';

export default function InvitationCard() {
  const { guestIdentifier } = useParams<{ guestIdentifier: string }>();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationCardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'accepted' | 'declined' | null>(null);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; type: 'decline' | 'change'; newStatus?: 'accepted' | 'declined' }>({ open: false, type: 'decline' });

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
        // Initialize RSVP status from loaded data
        if (data.rsvpStatus && data.rsvpStatus !== 'pending') {
          setRsvpStatus(data.rsvpStatus);
        }
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
                py: { xs: 1.5, sm: 2.5 },
                px: { xs: 1.5, sm: 2.5 },
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Slide direction="down" in timeout={600}>
                <Box>
                  {/* Decorative top flourish */}
                  <Box sx={{ mb: { xs: 1, sm: 1.5 }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography sx={{ color: '#66bb6a', fontSize: { xs: '1rem', sm: '1.2rem' }, opacity: 0.7 }}>🌸</Typography>
                    <Typography sx={{ color: '#4caf50', fontSize: { xs: '1.1rem', sm: '1.3rem' }, opacity: 0.6 }}>🤍</Typography>
                    <Typography sx={{ color: '#66bb6a', fontSize: { xs: '1rem', sm: '1.2rem' }, opacity: 0.7 }}>🌸</Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Cinzel", serif',
                      color: '#1b5e20',
                      fontSize: { xs: '1.1rem', sm: '1.4rem' },
                      mb: { xs: 1.5, sm: 2.5 },
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
                      fontSize: { xs: '0.8rem', sm: '0.95rem' },
                      mb: { xs: 1.5, sm: 2 },
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

                  {/* Guest Name - Elegant Display */}
                  <Box
                    sx={{
                      position: 'relative',
                      mb: { xs: 1.5, sm: 2 },
                      py: { xs: 1.5, sm: 2.5 },
                      px: { xs: 1.5, sm: 3 },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: { xs: '92%', sm: '88%' },
                        height: '100%',
                        bgcolor: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: 2,
                        boxShadow: '0 2px 12px rgba(46, 125, 50, 0.1)',
                        border: '1px solid rgba(46, 125, 50, 0.15)',
                        zIndex: 0,
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '100%', px: { xs: 1, sm: 2 } }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontFamily: '"Quicksand", sans-serif',
                          color: '#1b5e20', 
                          fontWeight: 500,
                          fontSize: { 
                            xs: 'clamp(0.9rem, 4vw, 1.2rem)', 
                            sm: 'clamp(1.1rem, 3vw, 1.5rem)' 
                          },
                          letterSpacing: '0.02em',
                          lineHeight: 1.4,
                          textAlign: 'center',
                          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
                          mb: (invitation.totalInvitees ?? 0) > 1 ? 1 : 0,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                          hyphens: 'auto',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          display: 'block',
                        }}
                      >
                        {invitation.name}
                      </Typography>
                      
                      {(invitation.totalInvitees ?? 0) > 1 && (
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 1,
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: 30, 
                              height: '1px', 
                              bgcolor: '#2e7d32', 
                              opacity: 0.4,
                            }} 
                          />
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.8,
                              bgcolor: 'rgba(46, 125, 50, 0.08)',
                              borderRadius: 3,
                              px: 1.5,
                              py: 0.5,
                              border: '1px solid rgba(46, 125, 50, 0.2)',
                            }}
                          >
                            <Typography 
                              sx={{ 
                                fontFamily: '"Quicksand", sans-serif',
                                color: '#2e7d32', 
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                              }}
                            >
                              Guests
                            </Typography>
                            <Typography 
                              sx={{ 
                                fontFamily: '"Quicksand", sans-serif',
                                color: '#1b5e20', 
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                fontWeight: 600,
                                lineHeight: 1,
                              }}
                            >
                              {invitation.totalInvitees}
                            </Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              width: 30, 
                              height: '1px', 
                              bgcolor: '#2e7d32', 
                              opacity: 0.4,
                            }} 
                          />
                        </Box>
                      )}
                    </Box>
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
                      fontSize: { xs: '2rem', sm: '3.5rem' },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                      mb: { xs: 1, sm: 1.5 },
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
                      fontSize: { xs: '0.8rem', sm: '0.95rem' },
                      mb: { xs: 1, sm: 1.5 },
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
                      fontSize: { xs: '2rem', sm: '3.5rem' },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                      mb: { xs: 1.5, sm: 2.5 },
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
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, my: { xs: 1.5, sm: 2.5 } }}>
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
                    in a Holy Mass at <strong style={{ color: '#2e7d32' }}>{weddingDetails.massVenue}</strong>,<br />
                    on <strong style={{ color: '#1b5e20' }}>{weddingDetails.date}</strong>, starting at <strong>{weddingDetails.massTime}</strong>
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
                      fontSize: { xs: '0.8rem', sm: '0.95rem' },
                      mb: { xs: 1.5, sm: 2.5 },
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    Thereafter, a reception party will be held at<br />
                    <strong style={{ color: '#2e7d32' }}>{weddingDetails.receptionVenue}</strong>, <strong style={{ color: '#424242' }}>{weddingDetails.receptionAddress}</strong><br />
                    starting at <strong>{weddingDetails.receptionTime}</strong>
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
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontStyle: 'italic',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    Your presence and blessings will be deeply appreciated<br />
                    as we share in this moment of love and joy.
                  </Typography>

                  {/* RSVP Buttons */}
                  <Box sx={{ mt: { xs: 2, sm: 3 }, mb: { xs: 1.5, sm: 2 } }}>
                    {rsvpStatus === null ? (
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                          variant="contained"
                          onClick={async () => {
                            if (!invitation) return;
                            setRsvpLoading(true);
                            try {
                              await acceptInvitation(invitation.id);
                              setRsvpStatus('accepted');
                              setSnackbar({ open: true, message: 'Invitation accepted successfully!', severity: 'success' });
                            } catch (err) {
                              setSnackbar({ open: true, message: 'Failed to accept invitation. Please try again.', severity: 'error' });
                            } finally {
                              setRsvpLoading(false);
                            }
                          }}
                          disabled={rsvpLoading}
                          sx={{
                            bgcolor: '#2e7d32',
                            color: 'white',
                            px: { xs: 3, sm: 4 },
                            py: 1,
                            fontFamily: '"Josefin Sans", sans-serif',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textTransform: 'none',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
                            '&:hover': {
                              bgcolor: '#1b5e20',
                              boxShadow: '0 6px 16px rgba(46, 125, 50, 0.4)',
                            },
                            '&:disabled': {
                              bgcolor: '#9e9e9e',
                            },
                          }}
                        >
                          {rsvpLoading ? 'Processing...' : 'Accept Invitation'}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setConfirmDialog({ open: true, type: 'decline' });
                          }}
                          disabled={rsvpLoading}
                          sx={{
                            borderColor: '#757575',
                            color: '#757575',
                            px: { xs: 3, sm: 4 },
                            py: 1,
                            fontFamily: '"Josefin Sans", sans-serif',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#616161',
                              color: '#616161',
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                            },
                            '&:disabled': {
                              borderColor: '#e0e0e0',
                              color: '#9e9e9e',
                            },
                          }}
                        >
                          Can't Attend
                        </Button>
                      </Stack>
                    ) : (
                      <Box>
                        <Box
                          sx={{
                            textAlign: 'center',
                            bgcolor: rsvpStatus === 'accepted' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(117, 117, 117, 0.1)',
                            borderRadius: 2,
                            p: 2,
                            border: `2px solid ${rsvpStatus === 'accepted' ? '#2e7d32' : '#757575'}`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: '"Josefin Sans", sans-serif',
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                              fontWeight: 600,
                              color: rsvpStatus === 'accepted' ? '#1b5e20' : '#424242',
                              mb: 0.5,
                            }}
                          >
                            {rsvpStatus === 'accepted' ? '✓ Invitation Accepted' : '✗ Invitation Declined'}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: '"Josefin Sans", sans-serif',
                              fontSize: { xs: '0.85rem', sm: '0.9rem' },
                              color: '#616161',
                            }}
                          >
                            {rsvpStatus === 'accepted'
                              ? 'Thank you! We look forward to celebrating with you.'
                              : 'Thank you for letting us know. You will be missed.'}
                          </Typography>
                        </Box>
                        
                        {/* Change Response Link */}
                        <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                              const newStatus = rsvpStatus === 'accepted' ? 'declined' : 'accepted';
                              setConfirmDialog({ open: true, type: 'change', newStatus });
                            }}
                            disabled={rsvpLoading}
                            sx={{
                              color: '#757575',
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              textTransform: 'none',
                              fontFamily: '"Josefin Sans", sans-serif',
                              textDecoration: 'underline',
                              '&:hover': {
                                color: '#616161',
                                bgcolor: 'transparent',
                                textDecoration: 'underline',
                              },
                              '&:disabled': {
                                color: '#9e9e9e',
                              },
                            }}
                          >
                            {rsvpLoading ? 'Updating...' : 'Change Response'}
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Bottom decoration with serial number and QR code */}
                  <Box sx={{ mt: { xs: 1.5, sm: 2.5 }, position: 'relative', minHeight: { xs: '70px', sm: '80px' }, pb: 1 }}>
                    {/* Center decoration and serial number */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: { xs: 1, sm: 1.5 } }}>
                        <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                        <Typography sx={{ color: '#d4af37', fontSize: '0.9rem', opacity: 0.5 }}>💚</Typography>
                        <Box sx={{ width: 40, height: '1px', bgcolor: '#2e7d32', opacity: 0.3 }} />
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: '"Cinzel", serif',
                          color: '#424242',
                          opacity: 0.85,
                          fontWeight: 500,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Serial No: {invitation.id.replace(/(.{3})/g, '$1 ').trim()}
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
                        size={55}
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

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        PaperProps={{
          sx: {
            borderRadius: 2,
            px: 1,
            py: 0.5,
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Josefin Sans", sans-serif', fontWeight: 600, color: '#1b5e20' }}>
          {confirmDialog.type === 'decline' ? 'Unable to Attend?' : 'Change Response?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: '"Josefin Sans", sans-serif', color: '#424242' }}>
            {confirmDialog.type === 'decline' 
              ? 'We understand plans can change. We will miss you at the celebration.'
              : confirmDialog.newStatus === 'accepted'
                ? 'Would you like to change your response to Accept?'
                : "Would you like to change your response to Can't Attend?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            sx={{ 
              fontFamily: '"Josefin Sans", sans-serif',
              textTransform: 'none',
              color: '#757575',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={async () => {
              if (!invitation) return;
              setConfirmDialog({ ...confirmDialog, open: false });
              setRsvpLoading(true);
              
              try {
                if (confirmDialog.type === 'decline') {
                  await declineInvitation(invitation.id);
                  setRsvpStatus('declined');
                  setSnackbar({ open: true, message: 'Response updated. We will miss you!', severity: 'success' });
                } else {
                  // Change response
                  if (confirmDialog.newStatus === 'accepted') {
                    await acceptInvitation(invitation.id);
                    setRsvpStatus('accepted');
                    setSnackbar({ open: true, message: 'Response changed to Accepted!', severity: 'success' });
                  } else {
                    await declineInvitation(invitation.id);
                    setRsvpStatus('declined');
                    setSnackbar({ open: true, message: 'Response updated. We will miss you!', severity: 'success' });
                  }
                }
              } catch (err) {
                setSnackbar({ open: true, message: 'Failed to update response. Please try again.', severity: 'error' });
              } finally {
                setRsvpLoading(false);
              }
            }}
            variant="contained"
            sx={{ 
              fontFamily: '"Josefin Sans", sans-serif',
              textTransform: 'none',
              bgcolor: confirmDialog.type === 'decline' || confirmDialog.newStatus === 'declined' ? '#757575' : '#2e7d32',
              '&:hover': {
                bgcolor: confirmDialog.type === 'decline' || confirmDialog.newStatus === 'declined' ? '#616161' : '#1b5e20',
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            fontFamily: '"Josefin Sans", sans-serif',
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress,
  Paper,
  Fade,
  Stack,
  Divider,
} from '@mui/material';
import {
  Input,
  CheckCircle,
  Error as ErrorIcon,
  Verified,
} from '@mui/icons-material';
import {
  verifyInvitationByCardNumber,
} from '../services/card-vew.service';
import type { InvitationCardWithWedding } from '../services/card-vew.service';

export default function VerificationSystem() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedInvitation, setVerifiedInvitation] = useState<InvitationCardWithWedding | null>(null);

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value: string) => {
    // Remove all spaces and convert to uppercase
    const cleaned = value.replace(/\s+/g, '').toUpperCase();
    // Add space after every 4 characters
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };


  const handleManualVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber.trim()) {
      setError('Please enter a card number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const invitation = await verifyInvitationByCardNumber(cardNumber);
      setVerifiedInvitation(invitation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setVerifiedInvitation(null);
    } finally {
      setLoading(false);
    }
  };


  const handleViewInvitation = () => {
    if (verifiedInvitation) {
      navigate(`/invitation/${verifiedInvitation.id}`);
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={500}>
          <Box>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Verified
                sx={{
                  fontSize: { xs: 48, sm: 64 },
                  color: 'primary.main',
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}
              >
                Verify Your Invitation
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Enter your card number to verify your invitation
              </Typography>
            </Box>

            <Card elevation={6} sx={{ borderRadius: { xs: 2, sm: 3 } }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <form onSubmit={handleManualVerification}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Enter Invitee's Card Serial Number
                      </Typography>
                      <TextField
                        fullWidth
                        label="Card Serial Number"
                        placeholder="e.g., 1754 4246 2089 9"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        disabled={loading}
                        variant="outlined"
                        autoFocus
                        sx={{ mt: 1 }}
                        InputProps={{
                          sx: { 
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            fontFamily: 'monospace',
                            letterSpacing: '0.05em'
                          },
                        }}
                      />
                    </Box>

                    <Alert severity="info" icon={<Input />}>
                      <Typography variant="body2">
                        Enter your complete card number. Spaces will be added automatically for readability.
                      </Typography>
                    </Alert>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading || !cardNumber.trim()}
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Verify Invitation'
                      )}
                    </Button>
                  </Stack>
                </form>

                {/* Error Display */}
                {error && (
                  <Fade in timeout={300}>
                    <Alert
                      severity="error"
                      icon={<ErrorIcon />}
                      onClose={() => setError(null)}
                      sx={{ mt: 2 }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                {/* Success Display */}
                {verifiedInvitation && (
                  <Fade in timeout={500}>
                    <Box sx={{ mt: 3 }}>
                      {/* Success Header with Icon */}
                      <Box 
                        sx={{ 
                          textAlign: 'center', 
                          mb: 3,
                          animation: 'fadeIn 0.5s ease-in'
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            mb: 2,
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 48, color: '#fff' }} />
                        </Box>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1
                          }}
                        >
                          Verification Successful!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your invitation has been verified
                        </Typography>
                      </Box>

                      {/* Card Details */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 3,
                          background: '#fff',
                          border: '1px solid',
                          borderColor: 'divider',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          }
                        }}
                      >
                        <Stack spacing={3}>
                          {/* Name */}
                          <Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'text.secondary',
                                fontWeight: 600,
                                mb: 1,
                                display: 'block'
                              }}
                            >
                              Invitee Name
                            </Typography>
                            <Typography 
                              variant="h4" 
                              sx={{ 
                                fontWeight: 700,
                                color: 'text.primary',
                                fontFamily: '"Playfair Display", serif'
                              }}
                            >
                              {verifiedInvitation.name}
                            </Typography>
                          </Box>

                          {/* Card Details Grid */}
                          <Box 
                            sx={{ 
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                              gap: 3,
                              pt: 2
                            }}
                          >
                            {/* Card Type */}
                            <Box
                              sx={{
                                p: 2.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                border: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.1em',
                                  color: 'text.secondary',
                                  fontWeight: 600,
                                  mb: 1,
                                  display: 'block'
                                }}
                              >
                                Card Type
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  color: 'text.primary'
                                }}
                              >
                                {verifiedInvitation.totalInvitees === 2 ? 'DOUBLE' : 'SINGLE'}
                              </Typography>
                            </Box>

                            {/* Card Serial Number */}
                            <Box
                              sx={{
                                p: 2.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                border: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.1em',
                                  color: 'text.secondary',
                                  fontWeight: 600,
                                  mb: 1,
                                  display: 'block'
                                }}
                              >
                                Serial Number
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  fontFamily: 'monospace',
                                  letterSpacing: '0.1em',
                                  color: 'text.primary',
                                  fontSize: '1.1rem'
                                }}
                              >
                                {verifiedInvitation.cardNumber.match(/.{1,4}/g)?.join(' ') || verifiedInvitation.cardNumber}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Action Button */}
                          <Button
                            variant="contained"
                            size="large"
                            onClick={handleViewInvitation}
                            fullWidth
                            sx={{ 
                              mt: 2, 
                              py: 1.5,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                              fontWeight: 600,
                              fontSize: '1rem',
                              textTransform: 'none',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                              }
                            }}
                          >
                            View Full Invitation
                          </Button>
                        </Stack>
                      </Paper>
                    </Box>
                  </Fade>
                )}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Paper
              elevation={0}
              sx={{
                mt: 4,
                p: 3,
                bgcolor: 'action.hover',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Need Help?
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  • Enter the complete card number from your invitation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Spaces will be added automatically for readability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Card numbers are case-insensitive
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Each card can only be verified once
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Contact the wedding organizers if you're having trouble verifying
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

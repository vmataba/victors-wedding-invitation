import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  QrCodeScanner,
  Input,
  CheckCircle,
  Error as ErrorIcon,
  Close,
  CameraAlt,
  Verified,
} from '@mui/icons-material';
import { Html5Qrcode } from 'html5-qrcode';
import {
  verifyInvitationByCardNumber,
  verifyInvitationByQRCode,
} from '../services/card-vew.service';
import type { InvitationCardWithWedding } from '../services/card-vew.service';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`verification-tabpanel-${index}`}
      aria-labelledby={`verification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function VerificationSystem() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedInvitation, setVerifiedInvitation] = useState<InvitationCardWithWedding | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [requestingPermission, setRequestingPermission] = useState(false);
  const qrCodeScannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
    setVerifiedInvitation(null);
    // Stop scanner when switching tabs
    if (newValue !== 0 && scannerActive) {
      stopScanner();
    }
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

  const startScanner = async () => {
    try {
      setScannerError(null);
      setRequestingPermission(true);
      
      // Check if running on HTTPS (required for camera access)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        setScannerError(
          'Camera access requires HTTPS. Please use manual verification or access the site via HTTPS.'
        );
        setRequestingPermission(false);
        return;
      }
      
      // Check if camera API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setScannerError(
          'Camera access is not supported in this browser. Please use manual verification or try a different browser.'
        );
        setRequestingPermission(false);
        return;
      }
      
      // Check camera permissions using Permissions API if available
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
          
          if (permissionStatus.state === 'denied') {
            setScannerError(
              'Camera access is blocked. Please enable camera permissions in your browser settings and reload the page.'
            );
            setRequestingPermission(false);
            return;
          }
        } catch (permError) {
          // Permissions API might not support camera query on all browsers, continue anyway
          console.log('Permissions API check failed:', permError);
        }
      }

      // Initialize the QR code scanner
      const html5QrCode = new Html5Qrcode('qr-reader');
      qrCodeScannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            // Successfully scanned
            await stopScanner();
            handleQRCodeScanned(decodedText);
          },
          (errorMessage) => {
            // Scanning error (can be ignored for most cases)
            console.log('QR Scan error:', errorMessage);
          }
        );

        setScannerActive(true);
        setRequestingPermission(false);
      } catch (startError: any) {
        console.error('Html5Qrcode start error:', startError);
        
        // Handle specific Html5Qrcode errors
        if (startError.message && startError.message.includes('NotAllowedError')) {
          setScannerError(
            'Camera access denied. Please allow camera permissions when prompted and try again.'
          );
        } else if (startError.message && startError.message.includes('NotFoundError')) {
          setScannerError(
            'No camera found. Please ensure your device has a camera or use manual verification.'
          );
        } else if (startError.message && startError.message.includes('NotReadableError')) {
          setScannerError(
            'Camera is in use by another application. Please close other apps and try again.'
          );
        } else {
          setScannerError(
            'Failed to start camera: ' + (startError.message || 'Unknown error') + '. Please try manual verification.'
          );
        }
        setRequestingPermission(false);
      }
    } catch (err: any) {
      console.error('Scanner initialization error:', err);
      setScannerError(
        'Unable to initialize camera scanner: ' + (err.message || 'Unknown error') + '. Please use manual verification.'
      );
      setRequestingPermission(false);
    }
  };

  const stopScanner = async () => {
    if (qrCodeScannerRef.current && scannerActive) {
      try {
        await qrCodeScannerRef.current.stop();
        qrCodeScannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      setScannerActive(false);
    }
  };

  const handleQRCodeScanned = async (qrData: string) => {
    try {
      setLoading(true);
      setError(null);
      const invitation = await verifyInvitationByQRCode(qrData);
      setVerifiedInvitation(invitation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QR verification failed');
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

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (scannerActive) {
        stopScanner();
      }
    };
  }, [scannerActive]);

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
                Scan your QR code or enter your card number to verify your invitation
              </Typography>
            </Box>

            <Card elevation={6} sx={{ borderRadius: { xs: 2, sm: 3 } }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    '& .MuiTab-root': {
                      py: 2,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                >
                  <Tab
                    icon={<QrCodeScanner />}
                    label="QR Scanner"
                    iconPosition="start"
                  />
                  <Tab
                    icon={<Input />}
                    label="Manual Entry"
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {/* QR Scanner Tab */}
                <TabPanel value={tabValue} index={0}>
                  <Stack spacing={3}>
                    {!scannerActive && !verifiedInvitation && (
                      <Slide direction="up" in timeout={300}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 4,
                              bgcolor: 'action.hover',
                              borderRadius: 2,
                              mb: 3,
                            }}
                          >
                            <CameraAlt
                              sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                              {requestingPermission ? 'Requesting Camera Access...' : 'Ready to Scan'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {requestingPermission 
                                ? 'Please allow camera access in your browser'
                                : 'Position the QR code within the camera frame'
                              }
                            </Typography>
                          </Paper>
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={requestingPermission ? <CircularProgress size={20} color="inherit" /> : <QrCodeScanner />}
                            onClick={startScanner}
                            disabled={requestingPermission}
                            fullWidth
                            sx={{ py: 1.5 }}
                          >
                            {requestingPermission ? 'Requesting Permission...' : 'Start Camera'}
                          </Button>
                        </Box>
                      </Slide>
                    )}

                    {scannerActive && (
                      <Slide direction="up" in timeout={300}>
                        <Box>
                          <Box
                            ref={scannerContainerRef}
                            id="qr-reader"
                            sx={{
                              borderRadius: 2,
                              overflow: 'hidden',
                              '& video': {
                                width: '100%',
                                borderRadius: 2,
                              },
                            }}
                          />
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Close />}
                            onClick={stopScanner}
                            fullWidth
                            sx={{ mt: 2 }}
                          >
                            Stop Scanner
                          </Button>
                        </Box>
                      </Slide>
                    )}

                    {scannerError && (
                      <Alert
                        severity="warning"
                        onClose={() => setScannerError(null)}
                      >
                        {scannerError}
                      </Alert>
                    )}
                  </Stack>
                </TabPanel>

                {/* Manual Entry Tab */}
                <TabPanel value={tabValue} index={1}>
                  <Slide direction="up" in timeout={300}>
                    <form onSubmit={handleManualVerification}>
                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Enter your invitation card number
                          </Typography>
                          <TextField
                            fullWidth
                            label="Card Number"
                            placeholder="e.g., WED2024-001"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.toUpperCase())}
                            disabled={loading}
                            variant="outlined"
                            sx={{ mt: 1 }}
                            InputProps={{
                              sx: { fontSize: { xs: '1rem', sm: '1.1rem' } },
                            }}
                          />
                        </Box>

                        <Alert severity="info" icon={<Input />}>
                          <Typography variant="body2">
                            Your card number can be found on your physical invitation card
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

                        {/* Example cards for testing */}
                        <Box>
                          <Divider sx={{ mb: 2 }}>
                            <Chip label="Try These Examples" size="small" />
                          </Divider>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {['WED2024-001', 'WED2024-002', 'WED2024-003'].map((example) => (
                              <Chip
                                key={example}
                                label={example}
                                onClick={() => setCardNumber(example)}
                                variant="outlined"
                                size="small"
                                sx={{ cursor: 'pointer' }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </form>
                  </Slide>
                </TabPanel>

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
                      <Alert
                        severity="success"
                        icon={<CheckCircle />}
                        sx={{ mb: 3 }}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>
                          Invitation Verified Successfully!
                        </Typography>
                      </Alert>

                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #6b1b4d15 0%, #8b225215 100%)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        <Stack spacing={2.5}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: '#6b1b4d', opacity: 0.7 }}>
                              Guest ID
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#4a0e4e', fontWeight: 600 }}>
                              {verifiedInvitation.id}
                            </Typography>
                          </Box>

                          <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

                          <Box>
                            <Typography variant="subtitle2" sx={{ color: '#6b1b4d', opacity: 0.7 }}>
                              Name
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#4a0e4e', fontWeight: 600 }}>
                              {verifiedInvitation.name}
                            </Typography>
                          </Box>

                          <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

                          <Box>
                            <Typography variant="subtitle2" sx={{ color: '#6b1b4d', opacity: 0.7 }}>
                              Number of Guests
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#4a0e4e', fontWeight: 600 }}>
                              {verifiedInvitation.totalInvitees}
                            </Typography>
                          </Box>

                          <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

                          <Box>
                            <Typography variant="subtitle2" sx={{ color: '#6b1b4d', opacity: 0.7 }}>
                              Card Number
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ color: '#d4af37' }}>
                              {verifiedInvitation.cardNumber}
                            </Typography>
                          </Box>

                          <Button
                            variant="contained"
                            size="large"
                            onClick={handleViewInvitation}
                            fullWidth
                            sx={{ 
                              mt: 2, 
                              py: 1.5,
                              background: 'linear-gradient(135deg, #6b1b4d 0%, #8b2252 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5a1640 0%, #7a1e48 100%)',
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
                  • Make sure your camera permissions are enabled for QR scanning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Card numbers are case-insensitive
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

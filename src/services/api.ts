// API Service Layer with Dummy Data

export interface GuestDetails {
  id: string;
  name: string;
  phone: string;
  guestCount: number;
}

export interface InvitationCard {
  guestId: string;
  cardNumber: string;
  guest: GuestDetails;
  personalMessage?: string;
}

export interface InvitationCardWithWedding extends InvitationCard {
  weddingDetails: {
    brideName: string;
    groomName: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    dressCode: string;
    rsvpDeadline: string;
  };
}

// Wedding Details - Constant for all invitations
const WEDDING_DETAILS = {
  brideName: 'Esther',
  groomName: 'Victor',
  date: 'November 15, 2025',
  time: 'From 1800 HRS',
  venue: 'Mawela Kati',
  address: 'Sinza Kijiweni. Dar es Salaam',
  dressCode: 'Formal',
  rsvpDeadline: 'November 10, 2025'
};

// Dummy database
const invitationDatabase: Record<string, InvitationCard> = {
  'GUEST001': {
    guestId: 'GUEST001',
    cardNumber: 'WED2024-001',
    guest: {
      id: 'GUEST001',
      name: 'John & Sarah Smith',
      phone: '+1 234 567 8900',
      guestCount: 2
    },
    personalMessage: 'We are honored to have you celebrate this special day with us. Your presence means the world to us!'
  },
  'GUEST002': {
    guestId: 'GUEST002',
    cardNumber: 'WED2024-002',
    guest: {
      id: 'GUEST002',
      name: 'Maria Garcia',
      phone: '+1 234 567 8901',
      guestCount: 1
    },
    personalMessage: 'Dear Maria, we would be delighted to have you join us on our special day!'
  },
  'GUEST003': {
    guestId: 'GUEST003',
    cardNumber: 'WED2024-003',
    guest: {
      id: 'GUEST003',
      name: 'Robert & Jennifer Lee',
      phone: '+1 234 567 8902',
      guestCount: 2
    }
  }
};

// Card number to guest ID mapping
const cardNumberMap: Record<string, string> = {
  'WED2024-001': 'GUEST001',
  'WED2024-002': 'GUEST002',
  'WED2024-003': 'GUEST003'
};

/**
 * Simulates API call to fetch invitation by guest identifier
 */
export const fetchInvitationByGuestId = async (guestId: string): Promise<InvitationCardWithWedding> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const invitation = invitationDatabase[guestId.toUpperCase()];
  
  if (!invitation) {
    throw new Error('Invitation not found. Please check your guest identifier.');
  }
  
  return {
    ...invitation,
    weddingDetails: WEDDING_DETAILS
  };
};

/**
 * Simulates API call to verify invitation by card number
 */
export const verifyInvitationByCardNumber = async (cardNumber: string): Promise<InvitationCardWithWedding> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const guestId = cardNumberMap[cardNumber.toUpperCase()];
  
  if (!guestId) {
    throw new Error('Invalid card number. Please check and try again.');
  }
  
  return {
    ...invitationDatabase[guestId],
    weddingDetails: WEDDING_DETAILS
  };
};

/**
 * Simulates API call to verify invitation by QR code data
 */
export const verifyInvitationByQRCode = async (qrData: string): Promise<InvitationCardWithWedding> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // QR code should contain JSON with guestId or cardNumber
    const data = JSON.parse(qrData);
    
    if (data.guestId) {
      return await fetchInvitationByGuestId(data.guestId);
    } else if (data.cardNumber) {
      return await verifyInvitationByCardNumber(data.cardNumber);
    }
    
    throw new Error('Invalid QR code format');
  } catch (error) {
    // If not JSON, try as direct guest ID
    const invitation = invitationDatabase[qrData.toUpperCase()];
    if (invitation) {
      return {
        ...invitation,
        weddingDetails: WEDDING_DETAILS
      };
    }
    
    throw new Error('Invalid QR code. Please try manual verification.');
  }
};

/**
 * Simulates API call to update RSVP status
 */
export const updateRSVPStatus = async (guestId: string, confirmed: boolean): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const invitation = invitationDatabase[guestId.toUpperCase()];
  if (invitation) {
    invitation.guest.confirmed = confirmed;
  }
};

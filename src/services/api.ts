// API Service Layer with Dummy Data

import { viewInvitee } from "./card-vew.service";

export interface InvitationCard {
  id: string;
  cardNumber: string;
  name: string;
  totalInvitees?: number;
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
  venue: 'Mawela Hall',
  address: 'Sinza Kijiweni. Dar es Salaam',
  dressCode: 'Formal',
  rsvpDeadline: 'November 10, 2025'
};

// Dummy database
const invitationDatabase: InvitationCard[] = [
  {
    id: 'GUEST001',
    cardNumber: 'WED2024-001',
    name: 'John & Sarah Smith',
    totalInvitees: 2,
    personalMessage: 'We are honored to have you celebrate this special day with us. Your presence means the world to us!'
  },
  {
    id: 'GUEST002',
    cardNumber: 'WED2024-002',
    name: 'Maria Garcia',
    totalInvitees: 1,
    personalMessage: 'Dear Maria, we would be delighted to have you join us on our special day!'
  },
  {
    id: 'GUEST003',
    cardNumber: 'WED2024-003',
    name: 'Robert & Jennifer Lee',
    totalInvitees: 2
  }
];

/**
 * Simulates API call to fetch invitation by guest identifier
 */
export const fetchInvitationByGuestId = async (guestId: string): Promise<InvitationCardWithWedding> => {
  
  const invitee  = await viewInvitee(guestId)
  
  
  if (!invitee) {
    throw new Error('Invitation not found. Please check your guest identifier.');
  }
  if (!invitee.paidAmount || invitee.paidAmount <= 50000) {
    throw new Error('Invitation not found. Please check your guest identifier.');
  }

  const computeTotalGuests = (amount: number) => {
   if (amount > 100000) {
    return 2;
   } else if (amount > 50000) {
    return 1;
   }
  }

  const card : InvitationCard = {
    id: invitee.id,
    cardNumber: invitee.id,
    name: invitee.name,
    totalInvitees: computeTotalGuests(invitee.paidAmount),
    personalMessage: "Dear " + invitee.name + ", we would be delighted to have you join us on our special day!"
  }

  
  return {
    ...card,
    weddingDetails: WEDDING_DETAILS
  };
};

/**
 * Simulates API call to verify invitation by card number
 */
export const verifyInvitationByCardNumber = async (cardNumber: string): Promise<InvitationCardWithWedding> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const invitation = invitationDatabase.find(inv => inv.cardNumber === cardNumber.toUpperCase());
  
  if (!invitation) {
    throw new Error('Invalid card number. Please check and try again.');
  }
  
  return {
    ...invitation,
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
    const invitation = invitationDatabase.find(inv => inv.id === qrData.toUpperCase());
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
  
  const invitation = invitationDatabase.find(inv => inv.id === guestId.toUpperCase());
  // Note: confirmed status would need to be added to InvitationCard interface if needed
};

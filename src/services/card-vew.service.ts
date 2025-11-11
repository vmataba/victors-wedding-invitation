import {
    FirebaseNode,
    readFromFirebase,
    updateInFirebase
} from "../config/firebase.config";
import type {Invitee} from "../models/invitee.model";

// Invitation Card Interfaces
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
    massVenue: string;
    massTime: string;
    receptionVenue: string;
    receptionAddress: string;
    receptionTime: string;
    dressCode: string;
    rsvpDeadline: string;
  };
}

// Wedding Details - Constant for all invitations
const WEDDING_DETAILS = {
  brideName: 'Esther',
  groomName: 'Victor',
  date: 'Saturday, 15th November 2025',
  massVenue: 'St. Gaudence Makoka Parish',
  massTime: '2:00 p.m.',
  receptionVenue: 'Mawela Hall',
  receptionAddress: 'Sinza, Dar es Salaam',
  receptionTime: '6:00 p.m.',
  dressCode: 'Formal',
  rsvpDeadline: 'November 10, 2025'
};

// Invitee Management
export const updateInvitee = async (invitee: Invitee) => {
    return await updateInFirebase(FirebaseNode.INVITEES, invitee.id, invitee);
}

export const viewInvitee = async (id: string): Promise<Invitee | null> => {
    return await readFromFirebase(FirebaseNode.INVITEES, id);
}

// Invitation Card Management
/**
 * Fetch invitation by guest identifier
 */
export const fetchInvitationByGuestId = async (guestId: string): Promise<InvitationCardWithWedding> => {
  const invitee = await viewInvitee(guestId);
  
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

  const card: InvitationCard = {
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
 * Verify invitation by card number (placeholder for future implementation)
 */
export const verifyInvitationByCardNumber = async (cardNumber: string): Promise<InvitationCardWithWedding> => {
  // For now, redirect to fetchInvitationByGuestId
  return await fetchInvitationByGuestId(cardNumber);
};

/**
 * Verify invitation by QR code data
 */
export const verifyInvitationByQRCode = async (qrData: string): Promise<InvitationCardWithWedding> => {
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
    return await fetchInvitationByGuestId(qrData);
  }
};
import {
    FirebaseNode,
    readFromFirebase,
    updateInFirebase
} from "../config/firebase.config";
import type {Invitee} from "../models/invitee.model";
import { treatAsDouble } from "../treat-as-double.config";

// Invitation Card Interfaces
export interface InvitationCard {
  id: string;
  cardNumber: string;
  name: string;
  totalInvitees?: number;
  personalMessage?: string;
  rsvpStatus?: 'pending' | 'accepted' | 'declined';
  rsvpDate?: string;
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
  receptionVenue: 'Mawela Hall - Business',
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

  const computeTotalGuests = (amount: number, id: string) => {
   // Check if ID is in treatAsDouble and amount is exactly 100000
   if (treatAsDouble.includes(id) && amount === 100000) {
    return 2;
   }
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
    totalInvitees: computeTotalGuests(invitee.paidAmount, invitee.id),
    personalMessage: "Dear " + invitee.name + ", we would be delighted to have you join us on our special day!",
    rsvpStatus: invitee.rsvpStatus || 'pending',
    rsvpDate: invitee.rsvpDate
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

/**
 * Accept invitation - Update invitee RSVP status to accepted
 */
export const acceptInvitation = async (guestId: string): Promise<void> => {
  const invitee = await viewInvitee(guestId);
  
  if (!invitee) {
    throw new Error('Invitee not found');
  }

  // Update invitee with accepted status
  const updatedInvitee: Invitee = {
    ...invitee,
    rsvpStatus: 'accepted',
    rsvpDate: new Date().toISOString(),
  };

  await updateInvitee(updatedInvitee);
};

/**
 * Decline invitation - Update invitee RSVP status to declined
 */
export const declineInvitation = async (guestId: string): Promise<void> => {
  const invitee = await viewInvitee(guestId);
  
  if (!invitee) {
    throw new Error('Invitee not found');
  }

  // Update invitee with declined status
  const updatedInvitee: Invitee = {
    ...invitee,
    rsvpStatus: 'declined',
    rsvpDate: new Date().toISOString(),
  };

  await updateInvitee(updatedInvitee);
};
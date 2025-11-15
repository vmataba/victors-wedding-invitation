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

  const computeTotalGuests = (amount: number, treatAsDouble?: boolean) => {
   // Check if invitee has treatAsDouble flag and amount is exactly 100000
   if (treatAsDouble && amount === 100000) {
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
    totalInvitees: computeTotalGuests(invitee.paidAmount, invitee.treatAsDouble),
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
 * Mark a card as verified
 */
export const markCardAsVerified = async (guestId: string): Promise<void> => {
  const invitee = await viewInvitee(guestId);
  
  if (!invitee) {
    throw new Error('Invitee not found');
  }

  const updatedInvitee: Invitee = {
    ...invitee,
    cardVerified: true,
    verifiedAt: new Date().toISOString(),
  };

  await updateInvitee(updatedInvitee);
};

/**
 * Verify invitation by card number (exact match only)
 */
export const verifyInvitationByCardNumber = async (cardNumber: string): Promise<InvitationCardWithWedding> => {
  // Remove spaces and normalize
  const normalizedCardNumber = cardNumber.replace(/\s+/g, '').toUpperCase().trim();
  
  const invitee = await viewInvitee(normalizedCardNumber);
  
  if (!invitee) {
    throw new Error('Invitation not found. Please check your card number and try again.');
  }
  
  // Check if card has already been verified
  if (invitee.cardVerified) {
    throw new Error(`This invitation card has already been verified on ${new Date(invitee.verifiedAt || '').toLocaleString()}. Each card can only be verified once.`);
  }
  
  // Mark card as verified
  await markCardAsVerified(normalizedCardNumber);
  
  // Return the invitation details
  return await fetchInvitationByGuestId(normalizedCardNumber);
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
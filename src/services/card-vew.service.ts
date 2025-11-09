import {
    FirebaseNode,
    readFromFirebase,
    updateInFirebase
} from "../config/firebase.config";
import type {Invitee} from "../models/invitee.model";


export const updateInvitee = async (invitee: Invitee) => {
    return await updateInFirebase(FirebaseNode.INVITEES, invitee.id, invitee);
}

export const viewInvitee = async (id: string): Promise<Invitee | null> => {
    return await readFromFirebase(FirebaseNode.INVITEES, id);
}
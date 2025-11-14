export interface Invitee {
    id: string;
    name: string;
    phone: string;
    pledgeAmount?: number
    paymentInstallments?: number[]
    paidAmount?: number
    registrationType?: any
    adminId?: string
    rsvpStatus?: 'pending' | 'accepted' | 'declined'
    rsvpDate?: string
    treatAsDouble?: boolean
}
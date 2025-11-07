# Wedding Details Update

## Changes Made

### Wedding Details Now Constant

Wedding details are no longer duplicated for each guest. They are now defined once as a constant and shared across all invitations.

### Updated Wedding Information

- **Bride**: Esther Mmbaga
- **Groom**: Victor Mataba
- **Date**: November 15, 2025
- **Time**: 10:00 AM
- **Venue**: Mawela Kati
- **Address**: Sinza Kijiweni
- **Dress Code**: Formal
- **RSVP Deadline**: November 10, 2025

### Technical Implementation

#### Before
Each guest record contained duplicate wedding details:
```typescript
{
  guestId: 'GUEST001',
  guest: { ... },
  weddingDetails: { ... }, // Duplicated for each guest
}
```

#### After
Wedding details are defined once and added dynamically:
```typescript
const WEDDING_DETAILS = {
  brideName: 'Esther Mmbaga',
  groomName: 'Victor Mataba',
  // ... other details
};

// Guest records only contain guest-specific data
{
  guestId: 'GUEST001',
  guest: { ... },
  // No weddingDetails here
}

// API functions add wedding details when returning data
return {
  ...invitation,
  weddingDetails: WEDDING_DETAILS
};
```

### Benefits

✅ **Single Source of Truth** - Wedding details defined once
✅ **Easier Updates** - Change wedding info in one place
✅ **Reduced Data Duplication** - Smaller database records
✅ **Consistency** - All invitations show same wedding details
✅ **Better Performance** - Less data to store and transfer

### Files Modified

1. **`/src/services/api.ts`**
   - Added `WEDDING_DETAILS` constant
   - Created `InvitationCardWithWedding` interface
   - Updated all API functions to add wedding details dynamically
   - Removed wedding details from guest records

2. **`/src/components/InvitationCard.tsx`**
   - Updated to use `InvitationCardWithWedding` type
   - Cleaned up unused imports

3. **`/src/components/VerificationSystem.tsx`**
   - Updated to use `InvitationCardWithWedding` type

## Testing

The application will now display the updated wedding details:
- Bride: **Esther Mmbaga**
- Groom: **Victor Mataba**
- Date: **November 15, 2025**
- Venue: **Mawela Kati**
- Address: **Sinza Kijiweni**

All test guests (GUEST001, GUEST002, GUEST003) will show these same wedding details.

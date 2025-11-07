# Simplified Invitation Card Design

## Changes Made

### Guest Data Structure
Simplified to only essential fields:
- **Guest ID**: Unique identifier
- **Name**: Guest's full name
- **Phone**: Contact number

### Removed Fields
- Guest count
- Invitation type (VIP, Family, Friend, etc.)
- Table number
- Dietary restrictions
- RSVP confirmation status
- Plus one indicator
- Email address

### Single Section Design

The invitation card now displays **one clean section** with:

1. **Invitee Details** (centered heading in gold)
2. **Guest ID** - with label and value
3. **Name** - with label and value
4. **Phone** - with label and value
5. **Card Number** - at the bottom

### Visual Design
- **Single burgundy card** with gold border
- **Gold dividers** between each field
- **Consistent typography** with cream labels and gold values
- **Clean spacing** for easy readability
- **Mobile-responsive** sizing

### Layout Structure
```
┌─────────────────────────────────┐
│     "Save the Date"             │
│   [Circular Frame with Names]   │
│     Date, Time, Venue           │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│      Invitee Details            │
│  ─────────────────────────      │
│  Guest ID: GUEST001             │
│  ─────────────────────────      │
│  Name: John & Sarah Smith       │
│  ─────────────────────────      │
│  Phone: +1 234 567 8900         │
│  ─────────────────────────      │
│  Card: WED2024-001              │
└─────────────────────────────────┘
```

## Test Data

### Guest 1
- ID: `GUEST001`
- Name: `John & Sarah Smith`
- Phone: `+1 234 567 8900`
- Card: `WED2024-001`

### Guest 2
- ID: `GUEST002`
- Name: `Maria Garcia`
- Phone: `+1 234 567 8901`
- Card: `WED2024-002`

### Guest 3
- ID: `GUEST003`
- Name: `Robert & Jennifer Lee`
- Phone: `+1 234 567 8902`
- Card: `WED2024-003`

## Verification System
The verification page also updated to show only:
- Guest ID
- Name
- Phone
- Card Number

## Benefits
✅ **Cleaner design** - Less visual clutter
✅ **Faster loading** - Simpler data structure
✅ **Better focus** - Essential information only
✅ **Easier maintenance** - Fewer fields to manage
✅ **Mobile-friendly** - Simpler layout scales better

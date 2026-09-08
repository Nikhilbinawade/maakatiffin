# MaaKaTiffin Production Plan

## Architecture
Customer/Seller browser
        ↓ HTTPS
FastAPI backend
        ↓
PostgreSQL
        ↓
Razorpay + WebSocket live updates

## Required production modules
1. Customer OTP login
2. Seller OTP/login + seller verification
3. Admin login
4. Mother profile/menu management
5. GPS distance calculation (5 km normal, 20 km weekend)
6. Daily tiffin inventory with database transaction locking
7. Booking/order lifecycle
8. Razorpay server-side order creation + signature verification
9. Razorpay webhook reconciliation
10. Seller online collections, commission and payout ledger
11. Reviews only after completed orders
12. Cancellation/refund rules
13. Notifications
14. Audit/security logging

## Payment rule
Never mark an order PAID from browser JavaScript alone. The server must verify the payment signature and reconcile webhook events.

## Deployment
- Push this folder to GitHub.
- Create a Render Web Service using the Dockerfile.
- Create PostgreSQL.
- Add environment variables.
- Deploy.
- Add a custom domain and HTTPS.
- Configure Razorpay webhook to the public `/api/payment/webhook` endpoint.

## Current status
This starter proves the public FastAPI deployment path. It deliberately does NOT contain live-money credentials or pretend that payment is production-ready.

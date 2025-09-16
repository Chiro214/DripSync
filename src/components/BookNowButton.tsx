import React, { useState } from 'react';

export function BookNowButton({ eventId, price, userEmail }: { eventId: string, price: number, userEmail: string }) {
  const [isCreating, setIsCreating] = useState(false);

  async function handleBook() {
    setIsCreating(true);
    // 1) create order on server to get orderId
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, amount: price, email: userEmail })
    });
    const order = await res.json(); // expect { id: 'ORDER123', amount: 100 }
    // 2) build UPI deep link (pa = your VPA, pn = your name, tr = orderId, am = amount)
    const upi = encodeURIComponent(`upi://pay?pa=yourvpa@bank&pn=Your+Name&tr=${order.id}&am=${order.amount.toFixed(2)}&cu=INR&tn=Ticket+${order.id}`);
    // open UPI intent (works on mobile)
    window.location.href = `upi://pay?pa=yourvpa@bank&pn=Your+Name&tr=${order.id}&am=${order.amount.toFixed(2)}&cu=INR&tn=Ticket+${encodeURIComponent('Order '+order.id)}`;

    // alternatively show QR & copy link for desktop
    setIsCreating(false);
    // After paying, prompt user to submit txn id or upload screenshot on a confirm page (/confirm-payment)
    // Your server will accept POST /api/orders/:id/confirm with { txnId } to mark paid
  }

  return <button className="btn-primary" disabled={isCreating} onClick={handleBook}>{isCreating ? 'Processing...' : `Book Now — ₹${price}`}</button>;
}
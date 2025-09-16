import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
// import { generateAndSendTicket } from './ticket';
const router = express.Router();
router.use(bodyParser.json());

// simple in-memory store (replace with real DB)
const ORDERS: Record<string, any> = {};

// create order
router.post('/api/orders', (req, res) => {
  const { eventId, amount, email } = req.body;
  const id = `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}`;
  ORDERS[id] = { id, eventId, amount: Number(amount), email, status: 'pending', createdAt: new Date() };
  return res.json(ORDERS[id]);
});

// confirm payment (user provides txnId or screenshot URL)
router.post('/api/orders/:id/confirm', async (req, res) => {
  const { id } = req.params;
  const { txnId } = req.body; // or screenshot URL
  const order = ORDERS[id];
  if(!order) return res.status(404).json({ error: 'Order not found' });

  // Here you should verify txnId manually or via bank/PSP if possible.
  // For this example we mark paid and send ticket.
  order.status = 'paid';
  order.txnId = txnId;
  try {
    await generateAndSendTicket(order); // implement below
    return res.json({ ok: true, order });
  } catch(err) {
    return res.status(500).json({ error: 'Failed to send ticket' });
  }
});

// Dummy implementation for generateAndSendTicket
export async function generateAndSendTicket(order: any): Promise<void> {
  // Simulate ticket generation and sending
  console.log(`Ticket generated and sent for order: ${order.id}`);
}

export default router;
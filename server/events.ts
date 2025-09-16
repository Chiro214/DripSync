import express from 'express';
const router = express.Router();
const EVENTS: any[] = [];

router.post('/api/events', (req, res) => {
  const ev = { id: `EV-${Date.now()}`, ...req.body };
  EVENTS.push(ev);
  res.json(ev);
});

router.get('/api/events', (req, res) => res.json(EVENTS));

export default router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// ── Persistence helpers ───────────────────────────────────────────────────────
const DATA_FILE = path.join(__dirname, '../data/reservations.json');

function loadReservations() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveReservations(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

let reservations = loadReservations();
// ─────────────────────────────────────────────────────────────────────────────

// POST — create a new reservation
router.post('/', (req, res) => {
  const { name, email, phone, date, time, guests, notes } = req.body;

  if (!name || !date || !time || !guests) {
    return res.status(400).json({ error: 'Name, date, time and guests are required.' });
  }

  const reservation = {
    id: Date.now(),
    name,
    email: email || '',
    phone: phone || '',
    date,
    time,
    guests: parseInt(guests),
    notes: notes || '',
    status: 'pending', // pending | confirmed | cancelled
    createdAt: new Date().toISOString(),
  };

  reservations.push(reservation);
  saveReservations(reservations);
  console.log('New reservation:', reservation);

  res.status(201).json({
    success: true,
    message: `Table reserved for ${name} on ${date} at ${time}. We look forward to seeing you!`,
    reservation,
  });
});

// GET — list all reservations
router.get('/', (req, res) => {
  res.json({ reservations });
});

// PATCH /:id — update reservation status (pending | confirmed | cancelled)
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'cancelled'];

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}.` });
  }

  const reservation = reservations.find((r) => r.id === id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  reservation.status = status;
  saveReservations(reservations);
  console.log(`Reservation ${id} status → ${status}`);
  res.json({ success: true, reservation });
});

// DELETE /:id — remove a reservation
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservations.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  const [removed] = reservations.splice(index, 1);
  saveReservations(reservations);
  console.log(`Reservation ${id} deleted`);
  res.json({ success: true, reservation: removed });
});

module.exports = router;


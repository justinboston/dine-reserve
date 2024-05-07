const express = require('express');
const router = express.Router();
const { Reservation } = require('../models');

// Route to get all reservations
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Route to create a new reservation
router.post('/reservations', async (req, res) => {
  try {
    const { date, time, guests, userId, restaurantId } = req.body;
    const newReservation = await Reservation.create({ date, time, guests, userId, restaurantId });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Route to delete a reservation by ID
router.delete('/reservations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.destroy({ where: { id } });
    if (deletedReservation === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

module.exports = router;

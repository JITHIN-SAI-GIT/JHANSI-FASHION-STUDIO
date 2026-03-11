import { Booking } from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      status: 'pending' // default status
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking submitted successfully', data: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to submit booking' });
  }
};

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  event_type: { type: String, required: true },
  event_date: { type: String, required: true },
  location: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'pending' }
}, { 
  timestamps: true 
});

export const Booking = mongoose.model('Booking', bookingSchema);

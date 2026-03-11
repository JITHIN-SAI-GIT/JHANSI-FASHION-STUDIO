import { ContactMessage } from '../models/ContactMessage.js';

export const saveContactMessage = async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};

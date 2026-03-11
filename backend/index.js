import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import { seedCategories } from './controllers/categoryController.js';

dotenv.config();

// Connect to Database
connectDB().then(() => {
  seedCategories();
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.send('Jhansi Fashion Studio API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

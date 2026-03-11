import express from 'express';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';
import { protect, ownerOnly } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getServices);

// Admin only routes
router.post('/', protect, ownerOnly, upload.single('image'), createService);
router.put('/:id', protect, ownerOnly, upload.single('image'), updateService);
router.delete('/:id', protect, ownerOnly, deleteService);

export default router;

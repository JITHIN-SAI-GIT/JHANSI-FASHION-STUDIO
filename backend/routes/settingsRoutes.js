import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, ownerOnly } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, ownerOnly, upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'heroVideo', maxCount: 1 }
]), updateSettings);

export default router;

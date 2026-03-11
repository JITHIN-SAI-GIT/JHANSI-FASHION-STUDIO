import express from 'express';
import { getCategories, updateCategoryCover } from '../controllers/categoryController.js';
import { protect, ownerOnly } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getCategories);
router.put('/:name', protect, ownerOnly, upload.single('image'), updateCategoryCover);

export default router;

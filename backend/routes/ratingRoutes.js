import express from 'express';
import { addRating, getAvgRating, getAllReviews } from '../controllers/ratingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/reviews/all', getAllReviews);
router.get('/:projectId', getAvgRating);
router.post('/', protect, addRating);

export default router;

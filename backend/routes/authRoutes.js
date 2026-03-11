import express from 'express';
import { registerUser, authUser, googleAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth);

export default router;

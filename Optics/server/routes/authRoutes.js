// routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

export default router;



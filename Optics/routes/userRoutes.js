// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Routes for handling CRUD operations
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', authController.requireSignin, userController.readUser);
router.post('/users', userController.createUser);
router.put('/users/:userId', authController.requireSignin, authController.hasAuthorization, userController.updateUser);
router.delete('/users/:userId', authController.requireSignin, authController.hasAuthorization, userController.deleteUser);

// Parameter middleware for handling userId
router.param('userId', userController.getUserById);

export default router;



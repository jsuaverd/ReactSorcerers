// routes/userRoutes.js
/*import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Routes for handling CRUD operations
router.route('/users')
.get( userController.getAllUsers)
.post(userController.createUser);
router.route('/users/:userId')
.get(authController.requireSignin,authController.hasAuthorization, userController.readUser)
.put( authController.requireSignin, authController.hasAuthorization, userController.updateUser)
.delete(authController.requireSignin, authController.hasAuthorization, userController.deleteUser);

// Parameter middleware for handling userId
router.param('userId', userController.getUserById);

export default router;*/

// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// Routes for handling CRUD operations
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:userId')
  .get(authController.requireSignin, authController.hasAuthorization, userController.readUser)
  .put(authController.requireSignin, authController.hasAuthorization, userController.updateUser)
  .delete(authController.requireSignin, authController.hasAuthorization, userController.deleteUser);

// Parameter middleware for handling userId
// router.param('userId', userController.getUserById);

export default router;




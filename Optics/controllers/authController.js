// controllers/authController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;


      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // If authentication is successful, generate a token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key');

      // Send the token as a response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};

export default authController;

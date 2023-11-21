/// controllers/authController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from './../config.js';

const authController = {
  signin: async (req, res) => {
    try {
      let user = await User.findOne({ "email": req.body.email });
      if (!user) {
        return res.status('401').json({ error: "User not found" });
      }

      if (!user.authenticate(req.body.password)) {
        return res.status('401').send({ error: "Email and password don't match." });
      }

      const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1h' }); // Set your desired expiration time
      res.cookie('t', token, { expire: new Date() + 9999 });

      return res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      return res.status('401').json({ error: "Could not sign in" });
    }
  },

  signout: (req, res) => {
    res.clearCookie("t");
    return res.status('200').json({
      message: "signed out"
    });
  },

  requireSignin: (req, res, next) => {
    // Get the token from the request header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      req.user = decoded;
      next();
    });
  },

  hasAuthorization: (req, res, next) => {
    const authorized = req.profile && req.auth;

    if (!authorized) {
      return res.status(403).json({
        error: "User is not authorized"
      });
    }
    next();
  }
};

export default authController;

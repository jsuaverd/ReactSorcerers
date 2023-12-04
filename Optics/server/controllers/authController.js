// controllers/authController.js
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from './../config.js';

const authController = {
  signin: async (req, res) => {
    try {
      console.log("server " + req.body.email + req.body.password)
      
      let user = await User.findOne({ "email": req.body.email });
      console.log("server " + user)
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!user.authenticate(req.body.password)) {
        return res.status(401).json({ error: "Email and password don't match" });
      }

      // Set token expiration to 1 hour (you can make it configurable)
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1h' });
      // Set cookie expiration to the same duration as the token expiration time
      res.cookie('t', token, { maxAge: 60 * 60 * 1000 });

      return res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Could not sign in" });
    }
  },

  signout: (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
      message: "signed out"
    });
  },

  requireSignin: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    console.log(token)

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
    const authorized = req.user && req.user._id === req.params.userId;
  
    if (!authorized) {
      return res.status(403).json({
        error: "User is not authorized"
      });
    }
    next();
  }
  
};

export default authController;


// errorController.js
const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: err.name + ": " + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.name + ": " + err.message });
    }
    next();
  };
  
  export default errorHandler;

const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  try {
    // Get token from header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user data in req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

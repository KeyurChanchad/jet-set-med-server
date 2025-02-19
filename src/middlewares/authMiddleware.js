const jwt = require('jsonwebtoken');
const { secret_key } = require('../../constants');

// Middleware to verify authentication
const verifyAuth = (req, res, next) => {
  let authToken = req.headers['authorization'];
  // Check if authToken exists
  if (!authToken) {
    return res.status(401).json({ success: false, message: "Invalid token please login again" });
  }
  authToken = authToken.split('Bearer ')[1]
  console.log('REq header token ', authToken);
  try {
    // Verify the authentication token
    const decodedToken = jwt.verify(authToken, secret_key);
    
    // Extract _id from the decoded token and attach it to the request object
    req._id = decodedToken._id;
    console.log('REQ userid ', decodedToken._id);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.status(400).json({ success: false, message: 'Invalid token, please login again', code: 498 });
  }
};

module.exports =  verifyAuth ;
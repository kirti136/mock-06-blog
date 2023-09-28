require("dotenv").config()
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Authentication failed', message: "Login First" });
    }

    // Check if the token is in the format "Bearer token"
    const tokenParts = tokenHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Authentication failed', message: "Invalid token format" });
    }

    const token = tokenParts[1]; // Extract the token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = { authenticateUser };

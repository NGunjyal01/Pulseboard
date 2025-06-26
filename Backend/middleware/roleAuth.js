// server/middleware/roleAuth.js
const jwt = require('jsonwebtoken');

// roles: array of allowed roles → e.g. ['admin'], ['editor', 'admin'], etc.
const roleAuth = (roles = []) => async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains { id, email, role }

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ 
                success: false,
                message: 'Forbidden: Insufficient role' });
        }

        next();
    } catch (error) {
        console.error('Role auth error:', error.message);
        return res.status(401).json({ 
            success: false,
            message: 'Unauthorized: Invalid token' });
    }
};

module.exports = roleAuth;

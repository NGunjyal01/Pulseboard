const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) 
        return res.status(401).json({ 
            success:false,
            error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ 
            success: false,
            error: 'Invalid token' });
    }
}

module.exports = userAuth;
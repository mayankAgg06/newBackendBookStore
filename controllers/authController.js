// Middleware to protect routes
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        req.user = user;
        next();
    });
}

// Middleware for role-based access
// function authorizeRoles(...allowedRoles) {
//     return (req, res, next) => {
//         if (!req.user || !allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Access denied" });
//         }
//         next();
//     };
// }

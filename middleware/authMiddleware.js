import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;
    // if (req.cookies.accessToken) {
        try {
            token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");
            if(!token)
                res.status(401).json({ message: "Not authorized, no token" });
            const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    // }
    // if (!token) {
    //     res.status(401).json({ message: "Not authorized, no token" });
    // }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
};

export const teamLead = (req, res, next) => {
    if (req.user && req.user.role === 'team lead') {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as a team lead" });
    }
};

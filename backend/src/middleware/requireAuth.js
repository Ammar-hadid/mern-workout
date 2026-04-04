import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: 'No authorization header was provided.' })
        return
    }

    if (!authorization.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authorization header must use the Bearer scheme.' })
        return
    }

    const token = authorization.split(' ')[1];

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(userId).select('_id email');

        next();
    }

    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' })
    }
}

export default requireAuth;
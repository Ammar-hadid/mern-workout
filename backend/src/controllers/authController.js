import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
};

export const register = async (req, res) => {
    const { email, password } = req.body;


    try {
        if (!email || !password) {
            res.status(400).json({ error: 'All fields are required!' })
            return
        }

        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters long.' })
            return
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ error: 'This email is already registered.' });
            return;
        }

        const user = await User.create({ email, password })

        const token = generateToken(user._id);

        res.status(201).json({
            user: {
                email: user.email
            },

            token
        })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Network error' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(400).json({ error: 'All fields are required!' });
            return;
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(401).json({ error: 'Email or password incorrect' });
            return
        }

        const isMatch = await user.comparePasswords(password);

        if (!isMatch) {
            res.status(401).json({ error: 'Email or password incorrect' });
            return
        }

        const token = generateToken(user._id);

        res.status(200).json({
            user: {
                email: user.email
            },
            token
        })
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).json({ error: 'Network error' })
    }
}
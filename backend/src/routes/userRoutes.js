import express from 'express'
import { register, login, clear } from '../controllers/authController.js'

const router = express.Router();

router.post('/login', login);

router.post('/register', register)

router.delete('/clear', clear)

export default router;
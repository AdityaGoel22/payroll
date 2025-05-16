import express from 'express';
import { forgotPassword, getUserFromToken, login, register, resetPassword } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', login);
router.get('/getUserData', getUserFromToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
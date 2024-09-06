import express from 'express';
import { loginUser, registerUSer } from '../controllers/authControllers.js';

const router = express.Router();


router.post('/login',loginUser);
router.post('/register',registerUSer); 

export default router
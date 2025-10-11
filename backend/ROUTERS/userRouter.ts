import express from "express";
import { signUp, Login, Profile } from "../Controllers/userController";
import authMiddleware from "../Middleware/authRoute";

const router=express.Router()

router.post('/signUp', signUp)
router.post('/login', Login)
router.get('/profile/:id', authMiddleware, Profile);

export default router
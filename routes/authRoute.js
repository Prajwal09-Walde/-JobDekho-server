import express from "express";
import { logOut, signIn, signUp, userProfile } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/logout', logOut);

router.get('/me', isAuthenticated, userProfile);

export default router;
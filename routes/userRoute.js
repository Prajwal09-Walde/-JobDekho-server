import express from "express";
import { allUsers, createUserJobsHistory, deleteUser, editUser, singleUser } from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

router.put('/user/edit/:id', isAuthenticated, editUser);

router.get('/user/:id', isAuthenticated, singleUser);

router.get('/allusers', isAuthenticated, isAdmin, allUsers);

router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

export default router;
import express from "express";
import { allJobsCategory, createJobType, deleteJobType, updateJobType } from "../controllers/jobTypeController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post('/type/create', isAdmin, isAuthenticated, createJobType);

router.put('/type/update/:type_id', isAdmin, isAuthenticated, updateJobType);

router.get('/type/jobs', allJobsCategory);

router.delete('/type/delete/:type_id', isAdmin, isAuthenticated, deleteJobType);

export default router;
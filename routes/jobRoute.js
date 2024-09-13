import express from "express";
import { createJob, deleteJob, showJobs, singleJob, updateJob } from "../controllers/jobController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/job/create', isAuthenticated, isAdmin, createJob);

router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);

router.get('/job/:id', singleJob);

router.get('/jobs/show', showJobs);

router.get('/job/delete/:job_id', isAuthenticated, isAdmin, deleteJob);

export default router;
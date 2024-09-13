import JobType from "../models/jobTypeModel.js";
import ErrResponse from "../utils/errResponse.js";

export const createJobType = async (rq, rs, next) => {

    try {
        const jobType = await JobType.create({
            jobTypeName: rq.body.jobTypeName,
            user: rq.user.id
        });
        rs.status(201).json({
            success: true,
            jobType
        })
    } catch (err) {
        next(err);
    }
};

export const allJobsCategory = async (rq, rs, next) => {
    try {
        const jobType = await JobType.find().sort({ createdAt: -1 });
        rs.status(200).json({
            success: true,
            jobType
        })
    } catch (err) {
        next(err);
    }
};

export const updateJobType = async (rq, rs, next) => {
    try {
        const jobType = await JobType.findByIdAndUpdate(rq.params.type_id, rq.body, { new: true });
        rs.status(200).json({
            success: true,
            jobType,
        })
    } catch (err) {
        next(err);
    }
};

export const deleteJobType = async (rq, rs, next) => {
    try {
        const jobType = await JobType.findByIdAndRemove(rq.params.type_id);
        rs.status(200).json({
            success: true,
            message: "Job type deleted",
        })
    } catch (err) {
        next(new ErrResponse("server error", 500));
    }
};
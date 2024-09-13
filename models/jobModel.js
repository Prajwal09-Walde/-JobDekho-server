import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        salary: {
            type: String,
            trim: true,
            required: true,
        },
        location: {
            type: String,
        }, 
        available: {
            type: Boolean,
            default: true
        },
        jobType: {
            type: ObjectId,
            ref: "JobType",
            required: true,
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
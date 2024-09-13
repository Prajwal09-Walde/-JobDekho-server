import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;

const jobTypeSchema = new mongoose.Schema(
    {
        jobTypeName: {
            type: String,
            trim: true,
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

export default mongoose.model("JobType", jobTypeSchema);
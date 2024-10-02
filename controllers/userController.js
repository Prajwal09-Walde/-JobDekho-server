import User from "../models/userModel.js";
import ErrResponse from "../utils/errResponse.js";


export const allUsers = async (rq, rs, next) => {

    const pageSize = 15;
    const page = Number(rq.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        rs.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (err) {
        return next(err);
    }
};

export const singleUser = async (rq, rs, next) => {
    try {
        const user = await User.findById(rq.params.id);
        rs.status(200).json({
            success: true,
            user
        })
        next();
    } catch (err) {
        return next(err);
    }
};

export const editUser = async (rq, rs, next) => {
    try {
        const user = await User.findByIdAndUpdate(rq.params.id, rq.body, { new: true });
        rs.status(200).json({
            success: true,
            user
        })
        next();
    } catch (err) {
        return next(err);
    }
};

export const createUserJobsHistory = async (rq, rs, next) => {
    const { title, description, salary, location } = rq.body;
    try {
        const currentUser = await User.findOne({ _id: rq.user._id });

        if (!currentUser) {
            return next(new ErrResponse("You must Log in", 401))
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: rq.user._id
            }
            currentUser.jobHistory.push(addJobHistory);
            await currentUser.save();
        }
        rs.status(200).json({
            success: true,
            currentUser
        })
        next();
    } catch (err) {
        return next(err);
    }
}

export const deleteUser = async (rq, rs, next) => {
    try {
        const user = await User.findByIdAndRemove(rq.params.id);
        rs.status(201).json({
            success: true,
            message: "user deleted"
        })
        next();
    } catch (err) {
        return next(err);
    }
}
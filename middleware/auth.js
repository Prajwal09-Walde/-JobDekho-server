import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrResponse from "../utils/errResponse.js";

export const isAuthenticated = async (rq, rs, next) => {
    const { token } = rq.cookies;

    if (!token) {
        return next(new ErrResponse('You must login!', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        rq.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrResponse('You must log in!', 401));
    }
}

export const isAdmin = (rq, rs, next) => {
    if (rq?.user?.role == 0) {
        return next(createError('Access is denied, you must be an admin', 401));
    }
    next();
}
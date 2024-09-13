import User from "../models/userModel.js";
import ErrResponse from "../utils/errResponse.js";

export const signUp = async (rq, rs, next) => {
    const { email } = rq.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrResponse("E-mail already registered", 400));
    }
    try {
        rq.body.role = 0;
        const user = await User.create(rq.body);
        rs.status(201).json({
            success: true,
            user
        })
    } catch (err) {
        next(err);
    }
};

export const signIn = async (rq, rs, next) => {

    try {
        const { email, password } = rq.body;

        if (!email) {
            return next(new ErrResponse("please enter valid email", 403));
        }
        if (!password) {
            return next(new ErrResponse("please enter a correct password", 403));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrResponse("Invalid credentials", 400));
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrResponse("Invalid credentials", 400));
        }

        sendTokenResponse(user, 200, rs);
    } catch (err) {
        next(err);
    }
};

export const sendTokenResponse = async (user, codeStatus, rs) => {
    const token = await user.getJwtToken();
    rs
        .status(codeStatus)
        .cookie('token', token, { maxAge: 259200, httpOnly: true })
        .json({
            success: true,
            role: user.role
        })
}

export const logOut = (rq, rs, next) => {
    rs.clearCookie('token');
    rs.status(200).json({
        success: true,
        message: "logged out"
    })
}

export const userProfile = async (rq, rs, next) => {
    const user = await User.findById(rq.user.id).select('-password');

    rs.status(200).json({
        success: true,
        user
    })
};
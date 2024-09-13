import ErrResponse from "../utils/errResponse.js";

export const errorHandler = (err, rq, rs, next) => {
    let error = {...err};
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource are not found ${err.value}`;
        error = new ErrResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrResponse(message, 300)
    }

    rs.status(error.status || 500).json({
        success: false,
        error: error.message || 'server error'
    })
}
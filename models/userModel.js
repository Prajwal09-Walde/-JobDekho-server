import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const jobHistorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            maxLength: 100,
        },
        description: {
            type: String,
            trim: true,
        },
        salary: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
        },
        interviewDate: {
            type: Date,
        },
        applicationStatus: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: "true",
        }
    },
    { timestamps: true },
)

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: [true, 'first name is required'],
            maxLength: 64,
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, 'last name is required'],
            maxLength: 64,
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'e-mail is required'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        password: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            minLength: [12, 'password must have (12) characters'],
        },
        jobHistory: [jobHistorySchema],
        role: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

export default mongoose.model("User", userSchema);
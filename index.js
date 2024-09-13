import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.js";
import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import jobTypeRoute from "./routes/jobTypeRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log("DB connected :)"))
    .catch((err) => console.log(err));

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorHandler);


app.get('/', (rq, rs) => {
    rs.send('Hello from NodeJS');
});

app.use('/api', authRoute);
app.use('/api', jobRoute);
app.use('/api', jobTypeRoute);
app.use('/api', userRoute);



app.listen(8092, () => {
    console.log("listening at port 8092")
})
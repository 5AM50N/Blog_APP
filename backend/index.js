import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
// app.use(cors());
const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json());
app.use("/users",router);
app.use("/blog",blogRouter);
const port = process.env.PORT;
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => app.listen(port)).then(()=>console.log("listening at "+port)).catch((err)=>console.log(err));


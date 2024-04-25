import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use("/users",router);
app.use("/blog",blogRouter);
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => app.listen(port)).then(()=>console.log("listening at "+port)).catch((err)=>console.log(err));


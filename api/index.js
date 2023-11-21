import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to mongoDB.");
}).catch((error) => {
    console.log(error);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running at port 3000!!!');
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
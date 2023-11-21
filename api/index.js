import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to mongoDB.");
}).catch((error) => {
    console.log(error);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running at port 3000!!!');
})
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/book',bookRoutes);
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('this is my backend of bookstore');
})

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is running fine')
    })
})
.catch((err)=>{
   console.log(err.message);
})


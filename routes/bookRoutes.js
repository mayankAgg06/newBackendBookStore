import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Book from "../models/bookModel.js";
dotenv.config();


const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized Access"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return  res.status(401).json({message:"Invalid Token"});
    }
}

import {
    getAllBooks,
    getBookByID,
    addBook,
    updateBookByID,
    deleteBook
} from "../controllers/bookController.js"

const router = express.Router();

router.post('/add', addBook);

router.get('/allBooks', getAllBooks);

router.get('/:id', getBookByID);
  
router.put('/edit/:id', updateBookByID);

router.delete('/:id', deleteBook); 

router.post('/login',(req,res)=>{
    const {id,password}=req.body;
    const user = Book.findOne({id,password});
    if(user){
        const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1h',maxAge:'1000000000'});
        res.cookie(token);
        res.redirect('/book/allBooks');
    }
    else{
        res.status(401).json({message:"Invalid Credentials"});
    }
})

export default router;

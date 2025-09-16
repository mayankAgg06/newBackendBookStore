import express from "express";
import mongoose from "mongoose";
import Book from "../models/bookModel.js";

const router = express.Router();

router.post('/add', async(req,res)=>{
    try{
        const {title,author,publishedDate,genre} = req.body;

        const newBook = new Book({title,author,genre,publishedDate});

        await newBook.save();
        res.status(200).json({message:"Book added successfully"});
    }
    catch(err){
        res.status(400).json({message: "Error in saving the book", err: err.message});
    }

})

router.get('/allBooks', async (req,res)=>{
    try{
        const page  = req.query.page || 1;
        const limit = req.query.limit || 3;

        const skip = (page-1)*limit;

        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = Book.countDocuments();
        const totalPages = totalBooks/limit;
        res.status(200).json({
            books,
            pagination:{
                currPage: page,
                totalBooks: totalBooks,
                totalPages: totalPages
            }});
    }
    catch(err){
        res.status(400).json({message:'Books Couldnot be Fetched',error:err.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID' });
      }

      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
  });
  
  router.put('/edit/:id',async (req,res)=>{
    try{
        const{id}=req.params;
        const updatedBookData = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            res.status(400).json({error:'Book Id is not valid'});
        }

        const updatedBook = Book.findByIdAndUpdate(id,updatedBookData,{new:true});

        if(!updatedBook)res.status(400).json({error:'Book not Found !!'});

        res.status(200).json({updatedBook});
    }
    catch(err){
        res.status(400).json({message:'Error updating the book',error:err.message});
    }
  })

export default router;

import express from "express";
import mongoose from "mongoose";

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

export default router;

import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type: String, 
        required:[true,'Title is required'],
        minlength:[3,'The title cannot be shorter than 3 characters']
    },
    author:{
        type: String, 
        required:[true,'Author is required'],
        minlength:[3,'Author Name cannot be shorter than 3 characters']
    },
    genre:{
        type: String, 
        required:[true,'Genre is required'],
    },
    publishedDate:{
        type: Date, 
        required:[true,'Publishing Date is required'],
        min:[1900,'Published year cannot be earlier than 1900'],
        max:[new Date().getFullYear(), 'Published date cannot be in future']
    }
})

const Book = mongoose.model('Book',bookSchema);

export default Book;
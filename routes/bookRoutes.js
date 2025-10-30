import express from "express";
import {
  getAllBooks,
  getBookByID,
  addBook,
  updateBookByID,
  deleteBook
} from "../controllers/bookController.js";
import { authenticateJWT, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post('/add', authenticateJWT, authorizeRoles("admin"), addBook);
router.get('/allBooks', authenticateJWT, getAllBooks);
router.get('/:id', authenticateJWT, getBookByID);
router.put('/edit/:id', authenticateJWT, authorizeRoles("admin"), updateBookByID);
router.delete('/:id', authenticateJWT, authorizeRoles("admin"), deleteBook);

export default router;

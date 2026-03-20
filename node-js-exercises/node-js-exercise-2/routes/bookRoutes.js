import express from "express";

import { createBook, getAllBooks, getBook, updateBook, deleteBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Books API" });
});

router.post("/create", createBook);
router.get("/all", getAllBooks);
router.get("/get/:id", getBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;

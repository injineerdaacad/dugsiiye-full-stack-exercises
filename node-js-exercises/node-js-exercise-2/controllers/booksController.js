import Book from '../models/BookModel.js';


// Add new book
export const createBook = async (req, res) => {
    try {
       const { title, author, publishedYear, genre, pages } = req.body;

       if (!title || !author) {
            return res.status(400).json({ message: 'Title and author are required' });
       }

        const savedBook = await Book.create({ title, author, publishedYear, genre, pages });

        res.status(201).json({ message: 'Book added successfully', book: savedBook });

    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {

        const books = await Book.find();
        res.json({ message: 'Books fetched successfully', books });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// Get single book by ID
export const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book fetched successfully', book });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
};

// Update book
export const updateBook = async (req, res) => {
    try {
        const { title, author, publishedYear, genre, pages } = req.body;

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title ?? book.title;
        book.author = author ?? book.author;
        book.publishedYear = publishedYear ?? book.publishedYear;
        book.genre = genre ?? book.genre;
        book.pages = pages ?? book.pages;

        const updatedBook = await book.save();

        res.json({ message: 'Book updated successfully', book: updatedBook });

    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// Delete book
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne();

        res.json({ message: 'Book deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};

import express from 'express';

const app = express();
app.use(express.json());

let books = [
  { id: 1, title: 'Hablaheenna', author: 'Maxamed Xirsi Guuleed' },
  { id: 2, title: 'Ila Dabbaalo', author: 'Musa M. Isse' },
  { id: 3, title: 'Dadqalato iyo Qori Ismaris', author: 'Yuusuf X. Cabdullaahi'},
  { id: 4, title: 'From a Crooked Rib', author: 'Nuruddin Farah' },
  { id: 5, title: 'A Naked Needle', author: 'Nuruddin Farah' },
  { id: 6, title: 'Maps', author: 'Nuruddin Farah' },
  { id: 7, title: 'Sheekooyinkii Ugu Wanaagsanaa', author: 'Cabdirisaaq Maxamed Cilmi'},
  { id: 8, title: 'Baro Af-Soomaali', author: 'Seattle Somali Community' },
];


// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to Eng. Honest API');
});


// 1. Get all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});


// 2. Get single book by ID
app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book);
});


// 3. Add new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: 'Title and author are required',
    });
  }

  const newId = books.length + 1;
  const newBook = { id: newId, title, author };

  books.push(newBook);

  res.status(201).json(newBook);
});


// 4. Update book title
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  book.title = title;

  res.status(200).json(book);
});


// 5. Delete book
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookExists = books.some((b) => b.id === id);

  if (!bookExists) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books = books.filter((b) => b.id !== id);

  res.status(200).json({ message: 'Book deleted successfully' });
});

const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT} and URL: http://${HOST}:${PORT}`);
});

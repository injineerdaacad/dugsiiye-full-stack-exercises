import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    author : {
        type : String,
        required : true,
    },

    publishedYear : {
        type : Number,
    },

    genre : {
        type : String,
    },

    pages : {
        type : Number,
    },
});


const Book = mongoose.model('Book', bookSchema);

export default Book;
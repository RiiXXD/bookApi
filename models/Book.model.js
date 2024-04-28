const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true,"Title is required"] },
  author: { type: String, required: [true,"Author is required"] },
  publicationYear: { type: Number, required: [true,"Publication Year is required"] },
});
const BookModel=mongoose.model("book",bookSchema);

module.exports=BookModel;
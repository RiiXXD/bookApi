const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true,"Title is required"] },
  createrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
},
  author: { type: String, required: [true,"Author is required"] },
  publicationYear: { type: Number, required: [true,"Publication Year is required"] },
  createdAt: {
    type: Date,
    default: Date.now
},
});
const BookModel=mongoose.model("books",bookSchema);

module.exports=BookModel;
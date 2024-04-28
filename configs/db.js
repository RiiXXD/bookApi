const mongoose = require('mongoose');
const BookModel=require('../models/Book.model') 
const UserModel=require('../models/User.model')
require('dotenv').config();
const connection=mongoose.connect(`${process.env.MONGO_URL}BookMangement`);

module.exports=connection;
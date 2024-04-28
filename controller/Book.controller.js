const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const BookModel=require("../models/Book.model");

require('dotenv').config()
const BookController=Router();








module.exports=BookController;
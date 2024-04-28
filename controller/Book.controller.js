const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const BookModel=require("../models/Book.model");
const authorization=require("../middleware/auth.middleware");
require('dotenv').config()
const BookController=Router();

BookController.get("/getBooks",async(req,res)=>{
    try{
        let { page = 1, limit = 8,sort,filter } = req.query;
        let sortCriteria={};
        let filterCriteria={};
        if(sort){
         const[field,order]= sort.split(" ")
         sortCriteria[field]=parseInt(order);
         console.log(sortCriteria);
        }
        if(filter){
          const[criteria,value]= filter.split(" ")
          filterCriteria[criteria] = value;
          
        }
         let book=[];
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
     
        book = await BookModel.find(filterCriteria).populate('createrId').skip((pageNumber - 1) * limitNumber)
       .limit(limitNumber).sort(sortCriteria)
    
       const total_count=await BookModel.find({}).count();
           res.status(200).json({book,total_count});
       }
   catch(e){console.log("error",e);
    res.status(404).json({message:e});}
  })

  BookController.post("/post",authorization,async(req,res)=>{
    const createrId=req.body.userId;
    if(!createrId){
        res.status(401).json({message:"Not Authorized."})
    }
    const { title, author, publicationYear } = req.body;
    try{
          const book = new BookModel({
              title,
              createrId,
              author,
              publicationYear,
              createdAt:Date.now(),
          })
          await book.save();
          res.status(201).json({message:"Book Added Successfully"});
          }
        
       catch(e){console.log("error",e);
       res.status(500).json({message:e});}
   })
  
  


module.exports=BookController;
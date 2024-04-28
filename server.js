const cors=require('cors');
const express=require('express');

const UserController=require('./controller/User.controller')
const BookController=require('./controller/Book.controller')
const connection = require('./configs/db')

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user",UserController)
app.use("/book",BookController)

app.get("/", async (req,res)=>{
  res.status(200).json({endpoints:{
    "user":{
    "/login":"login",
    "/sign":"Sign up",
},
    "Book":{ 
    "/":"To get all Books",
    "/getBook/:BookId":"Get Specific Book With Book-ID",
    "/getBook/:userId":"Get Book Posted By User with User ID userId",
    "/search":"Search books With Query",
    "/delete/:id/:userID":"Delete Book",
     "/postBook":"To Post Book",
    "/edit/:id/:userID":"Edit Book",
   }
  }});
 
})



app.listen(process.env.Port||8080,async()=>{
  try{
     connection;
     console.log("Connection Established With DB");
  }
  catch(e){console.log("Error While Connecting To Database",e);
  }
  console.log('listening on',process.env.Port||8080);  
})
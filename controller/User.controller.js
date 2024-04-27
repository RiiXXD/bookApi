const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserModel=require("../models/User.model");

require('dotenv').config()
const UserController=Router();

UserController.post("/sign",async(req,res)=>{
   const{name, email, password, profileImg}=req.body;
    try{
      const existingUser=await UserModel.findOne({email});
       if(existingUser){
        res.json({msg:"Already an user!"})
       }
       else{ console.log(name, email, password, profileImg);
        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash){
                const user=new UserModel({
                name, 
                email,
                password:hash,
                profileImg
            })
            await user.save();
            const token=jwt.sign({userId:user._id},process.env.EncryptionKey);
         
            res.json({msg:"Account Created!",user:{ id:user._id,name, email, profileImg,token}})}
            else if(err){
                res.json({msg:"Something went wrong try again!"})
                console.log(err);
            }
            else{
                res.json({msg:"Invalid Credentials!"});
               
            }
            
        });}
       
    }
    catch(e){console.log("error",e);}
})

UserController.post("/login",async (req,res)=>{
   const{ email, password}=req.body;
    const existingUser=await UserModel.findOne({email});
    if(existingUser){
    const cipher=existingUser.password;
    console.log(existingUser);
    bcrypt.compare(password,cipher,(err,result)=>{
      if(err){
        res.json({msg:"Something went wrong try again",error:err});
      }
      else if(result){
        const token=jwt.sign({userId:existingUser._id},process.env.EncryptionKey);
             res.json({msg:"Succesfully login ",token,user:{ email:existingUser._doc.email, name:existingUser._doc.name,id:existingUser._doc._id,profileImg:existingUser._doc.profileImg}})
      }
      else{
        res.json({msg:"Invalid credentials"});
      }
    })}
        
    else{
      res.json({msg:"Login First!"})
    }
            
        
})





module.exports=UserController;
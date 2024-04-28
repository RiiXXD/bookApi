const mongoose=require('mongoose');
const {isEmail} = require('validator')
const UserSchema=mongoose.Schema({
    name:{type:String, required:[true,"Name is required"]}, 
    email:{type:String, required:[true,"Email is required"],unique:true,trim:true,lowercase:true,validate:[isEmail,"Please enter a valid email"]},
    password:{type:String, required:[true,"Password is required"],minlength:[6,"Password must be at least 6 characters"]},
},{timeStamps:true});
const UserModel=mongoose.model("user",UserSchema);

module.exports=UserModel;
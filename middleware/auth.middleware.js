const jwt =require("jsonwebtoken")
const authorization=(req,res,next)=>{
  if(!req.headers.authorization){
    return res.status(401).json({msg:"Please Login First!"});
}
const token = req.headers.authorization.split(" ")[1];
jwt.verify(token,process.env.EncryptionKey,function(err,decoded){
    if(decoded){
      req.body.userId=decoded.userId;
      next();
    }
    else{
        res.status(401).json({msg:"Invalid Token"})
        console.log("Error occured while login",err)
    }
})
}

module.exports=authorization;
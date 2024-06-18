const { validationResult } = require("express-validator");
const UserModel = require("../model/UserModel");
const { getToken } = require("../middleware/JwtMiddleware");

//signup controller
exports.signUp=async(req,res)=>{
    console.log("signup router called");
    const{emailId,password}=req.body;
    const errors=validationResult(req);
    if(errors.isEmpty()){
        try {
            const user=await UserModel.findOne({emailId:emailId})
        if(!user){
            new UserModel(req.body).save()
            return res.status(200).send({message:"signup success"})
        }
        else{
            return res.status(400).send({message:"emailid already exists"})
        }
        } catch (error) {
            return res.status(500).send({message:"internal serrver error",errors:error})
        }
        
    }
    else{
        res.status(400).json({errors:errors.array()})
    }
}


//login controller
exports.login=async(req,res)=>{
    console.log("login router called")
    const{emailId,password}=req.body;
    const errors=validationResult(req);
    if(errors.isEmpty()){
        try {
            const user=await UserModel.findOne({emailId:emailId});
            console.log(user);
            if(user){
                if(user.password===password){
                    return res.status(200).send({message:"login success",token:getToken(user._id)})
                }
                else{
                    return res.status(400).send({message:"login failed"})
                }
            }
            else{
                return res.status(400).send({message:"email id or password wrong"})
            }
        } catch (error) {
         return res.status(500).send({message:"internal server error",errors:error})   
        }
    }
    else{
        return res.status(400).send({errors:errors.array()})
    }

}   

exports.data=(req,res)=>{
    if(req.user){
        res.send(`this user ${req.user.userID} secure api`)
    }
    else{
        res.send("not user in this api")
    }
}
const mongoose=require('mongoose')

const UserModel=mongoose.model("users",new mongoose.Schema({
    emailId:String,
    password:String
}))

module.exports=UserModel;
const mongoose=require('mongoose');

exports.Db=()=>mongoose.connect("mongodb://localhost:27017/jwt")
.then(()=>{
    console.log("DatabaseConnected Sucessfully")
})
.catch((err)=>{
    console.log("Database Connected failed");
})
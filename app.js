const express=require('express')
const { Db } = require('./config/DatabaseConnection')
const router = require('./routes/UserRoute')

const app=express()

app.use(express.static("./public"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//databaseConnection
Db()

//router

app.use(router)
app.listen(5000,()=>{
    console.log("server listening on port 5000")
})
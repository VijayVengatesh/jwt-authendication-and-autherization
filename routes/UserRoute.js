const express=require('express');
const { signUp, login, data } = require('../controller/UserController');
const { check } = require('express-validator');
const { checkToken } = require('../middleware/JwtMiddleware');
const router=express.Router();

const validation=[
    check('emailId').isEmail().withMessage('must be valid email id'),
    check('password').isLength({min:8}).withMessage('password must be atleast 8 character')
]

//signup router
router.post("/signup",validation,signUp)

//login router
router.post("/login",validation,login)

router.get("/data",checkToken,data);


module.exports=router
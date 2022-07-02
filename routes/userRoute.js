const express=require("express")
const User=require("../schema/userSchema")
const jwt=require("jsonwebtoken")
const router=express.Router()

const {signUp,login,getCrimeDetails,postCrimeDetails,logOut}=require("../controllers/userController")

router.route("/signUp").post(signUp)
router.route("/login").post(login)
router.route("/getCrimeDetails").get(isLoggedIn,getCrimeDetails)
router.route("/postCrimeDetails").post(isLoggedIn,postCrimeDetails)
router.route("/logout").get(logOut)

async function isLoggedIn(req,res,next){
    if(!req.cookies.token) return next("login first")
    const decoded=await jwt.verify(req.cookies.token,"chandhu@123")
    req.user=await User.findById(decoded.id)
    
    next()
}


module.exports=router
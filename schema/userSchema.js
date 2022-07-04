const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const userSchema=new mongoose.Schema({

fullName:{
   type:String,
   required:true,
   minlength:4,
},
email:{
    type:String,
    required:true,
    validate:[validator.isEmail,"email is required"],
    unique:true
},
password:{
    type:String,
    required:['true',"password is required"],
    minlength:6
},
location:{
    type:String
},
description:{
    type:String,
    maxlength:200 
},
crimeType:{
    type:String,
},
crimeOccuredAt:{
    type:Date,
    default:Date.now,
},
token:{
    type:String
}


})

userSchema.pre("save",async function(next){
  if(this.password) {
   this.password= await bcrypt.hash(this.password,3)
   next() 
  }
  
})

userSchema.methods.jsonToken=function(){
    return jwt.sign({id:this._id},"chandhu@123",{expiresIn:'2h'})
}

userSchema.methods.checkPassword=function(password){
    return bcrypt.compare(this.password,password)
}


module.exports=mongoose.model("userSchema",userSchema)
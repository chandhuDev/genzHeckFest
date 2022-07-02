const User=require("../schema/userSchema")
exports.signUp=async (req,res,next)=>{
    const {email,password,fullName}=req.body
    if(!email || !password){
        return next(new Error("please provide email and password details"))
    }
    
    const user=await User.create({
        fullName,
        email,
        password,
        
    })
    const token=user.jsonToken()
    user.password=undefined 
    
    const options={
        expires:new Date(Date.now()+24*60*60*1000),
        httpOnly:true
    }

    res.status(200).cookie("token",token,options).json({
      userDetails:user,
      success:true,
    })

}
exports.login=async (req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return next(new Error("please provide email and password details"))
    }

    const user=await User.findOne({email})
    const isPasswordCorrect=user.checkPassword(password)
    if(!isPasswordCorrect) return next(new Error("please retype the password"))
    const token=user.jsonToken()
    const options={
        expires:new Date(Date.now()+24*60*60*1000),
        httpOnly:true
    }
    req.user=user

    res.status(200).cookie("token",token,options).json({
      userDetails:user,
      success:true,
    })

}
exports.getCrimeDetails=async (req,res,next)=>{
    const {latitude,longitude}=req.body
    
}
exports.postCrimeDetails=async (req,res,next)=>{
    const {description,crimeType,location}=req.body
    const user=await User.findById(req.user.email)
    user.description=description
    user.crimeType=crimeType
    user.location.latitude=latitude
    user.location.longitude=longitude
    await user.save()
    res.json({
        success:true,
        updatedDetails:user
    })
    

}

exports.logOut=async (req,res,next)=>{
    if(!req.cookies.token){
       return res.sendStatus(403)
    }
    res.cookie("token",null,{
        expires: new Date(Date.now()),
       httpOnly: true,
    }).json({
        success:true
    })


    
}
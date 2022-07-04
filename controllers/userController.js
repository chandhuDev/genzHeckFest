const User=require("../schema/userSchema")
exports.signUp=async (req,res,next)=>{
    try{
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
    user.token=token
    await user.save({ validateBeforeSave: false })
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
  catch(e){
    console.log(e)
}

}
exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body
    if(!email || !password){
        return next(new Error("please provide email and password details"))
    }

    const user=await User.findOne({email})
    const isPasswordCorrect=user.checkPassword(password)
    if(!isPasswordCorrect) return next(new Error("please retype the password"))
     
    const options={
        expires:new Date(Date.now()+24*60*60*1000),
        httpOnly:true
    }
    req.user=user

    res.status(200).cookie("token",user.token,options).json({
      userDetails:user,
      success:true,
    })
}
catch(e){
    console.log(e)
}

}
exports.getOneDetails=async (req,res,next)=>{
    try{
    const {location}=req.query
    
    const Crimes=await User.find({location:location})
    
     
    
    res.send(crimes(Crimes))
    }
    catch(e){
        console.log(e)
    }

}
exports.getAllDetails=async (req,res,next)=>{
 try{

    const Crimes=await User.find()
    
    res.send(crimes(Crimes))
}catch(e){
      console.log(e)
 }
}
function crimes(Crimes){
    let listOfCrimes=[]
    for(let i=0;i<Crimes.length;i++){
        var crimeObject={}
        crimeObject.location=Crimes[i].location
        crimeObject.description=Crimes[i].description
        crimeObject.crimeType=Crimes[i].crimeType
        crimeObject.createdAt=Crimes[i].crimeOccuredAt
        listOfCrimes.push(crimeObject)
    }
    return listOfCrimes
}

exports.postCrimeDetails=async (req,res,next)=>{
    try{
    const {description,crimeType,location}=req.body
    const mail=req.user.email
    const user=await User.findOne({email:mail})
    if(!user) return next(new Error("there is no saved user"))
    user.description=description
    user.crimeType=crimeType
    user.location=location
    
   await user.save({ validateBeforeSave: false })
    
    res.json({
        success:true,
        updatedDetails:user
    })
  }catch(e){
    console.log(e)
  }

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
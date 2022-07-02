const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


const userRoute=require("./routes/userRoute")

app.use("/user",userRoute)


module.exports=app
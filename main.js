const express=require("express")
const app=express()
const cors=require("cors")
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:'*'
}))

const userRoute=require("./routes/userRoute")

app.use("/user",userRoute)


module.exports=app
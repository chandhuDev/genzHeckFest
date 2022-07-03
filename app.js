const app=require("./main")
require("dotenv").config()
require("./database/connect").connect()

app.listen(process.env.PORT,()=>{
    console.log("server listening succesfully")
})

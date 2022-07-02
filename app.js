const app=require("./main")
require("dotenv").config()
require("./database/connect").connect()

app.listen(6060,()=>{
    console.log("server listening succesfully")
})

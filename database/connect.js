const mongoose=require("mongoose")

exports.connect=async ()=>{

    mongoose.connect("mongodb+srv://chandhu:tlQxjVKrm5u1bCqy@cluster0.llich.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("succesfully connected database"))
    .catch((e)=>{
        console.log(e)
    })
}
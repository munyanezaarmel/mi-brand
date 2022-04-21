const mongoose= require('mongoose')
let loginSchema=mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:255,
        min:6
    }
})
module.exports=mongoose.model('login',loginSchema)
const mongoose= require('mongoose')
let singUpSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:255,
        min:6
    },
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
module.exports=mongoose.model('Signup',singUpSchema)
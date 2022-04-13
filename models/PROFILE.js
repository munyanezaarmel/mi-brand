let mongoose=require('mongoose');
const profileSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String

})
module.exports=mongoose.model('Profile',profileSchema)
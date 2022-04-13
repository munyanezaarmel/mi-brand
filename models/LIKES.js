let mongoose=require('mongoose');
const likeSchema=mongoose.Schema({
    like:String,
    comment:String
})
module.exports=mongoose.model('Likes',likeSchema)
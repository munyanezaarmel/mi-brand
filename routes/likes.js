const express=require('express')
const Comment=require('../models/LIKES')
let routerLikes=express.Router()
const verify=require('./privateroutes')
//get all likes information
routerLikes.get('/', async (req, res)=>{
    try{
        const getAllupdates= await Comment.find({})
        res.json(getAllupdates)
    }
    catch(err){
        res.json({message: err})
    }
})
//post profile
routerLikes.post('/',verify, async(req, res)=>{
    const profile=new Comment({
        like: req.body.like,
        comment: req.body.comment
       
    })
    try{
        const savedProfile= await profile.save()
        res.json(savedProfile)
    }
    catch(err){
        res.json({message:err})
    }
})
module.exports=routerLikes
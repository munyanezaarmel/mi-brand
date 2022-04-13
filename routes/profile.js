const express=require('express')
const Profiles= require('../models/PROFILE')
let routerProfile=express.Router()
//get updated information
routerProfile.get('/', async (req, res)=>{
    try{
        const getAllupdates= await Profiles.find({})
        res.json(getAllupdates)
    }
    catch(err){
        res.json({message: err})
    }
})
//post profile
routerProfile.post('/', async(req, res)=>{
    const profile=new Profiles({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedProfile= await profile.save()
        res.json(savedProfile)
    }
    catch(err){
        res.json({message:err})
    }
})
//updating a profile
routerProfile.patch('/:userId',async(req, res)=>{
    try{
   const updated=await Profiles.updateOne(
    {_id:req.params.userId},{$set:{email:req.body.email}}
    )
    res.json(updated)
    }
    catch (err) {
        res.json({message:err});
    }
})
module.exports=routerProfile
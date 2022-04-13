const express=require('express')
const contact= require('../models/CONTACT')
let routerContact=express.Router()
//get message
routerContact.get('/', async (req, res)=>{
    try{
        const getContact = await contact.find({})
        res.json(getContact)
    }
    catch(err){
        res.json({message: err})
    }
})
//posting a message 
routerContact.post('/', async(req, res)=>{
    const messageContact=new contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message:req.body.message
    })
    try{
        const savedContact = await messageContact.save()
        res.json(savedContact)
    }
    catch(err){
        res.json({message:err})
    }
})
module.exports=routerContact
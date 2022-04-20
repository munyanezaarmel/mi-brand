const express=require('express')
const Profiles= require('../models/PROFILE')
let routerProfile=express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Profiles:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         username:
 *           type: string
 *           description: username provided when creating account
 *         email:
 *           type: string
 *           description: email registered
 *         password:
 *           type: string
 *       example:
 *         id: d5fE_asz
 *         username: Munyaneza Armel
 *         email: munyaarmel61@gmail.com
 *         password: fjdfasdlfbudj
 */
/**
  * @swagger
  * tags:
  *   name: profiles
  *   description: updating user credentials
  */
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
/**
 * @swagger
 * /profile/{id}:
 *  put:
 *    summary: Update your profile
 *    tags: [Profiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profiles'
 *    responses:
 *      200:
 *        description: updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profiles'
 *      404:
 *        description: information not found
 *      500:
 *        description: Some error happened
 */
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
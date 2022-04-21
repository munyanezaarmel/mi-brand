const express=require('express');
let route= express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Signup=require('../models/SIGNUP');
const {registerValidation}=require('./passport')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     Signup:
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
 *           description: name must be 6 characters long
 *         email:
 *           type: string
 *           description: valid email 
 *         password:
 *           type: string
 *       example:
 *         id: d5fE_asz
 *         username: Armel
 *         email: munyaarmel61@gmail.com
 *         password: Kigali@1
 */
/**
  * @swagger
  * tags:
  *   name:  Signup
  *   description: create account
  */
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a account
 *     tags: [ Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       200:
 *         description: acccount created 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Signup'
 *       500:
 *         description: Some server error
 */
route.post('/', async (req, res)=>{
  //lets validate a user before submitting
  const{error}=registerValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);
  //checking if the email is already exist in database
  const emailExist=await Signup.findOne({email:req.body.email})
  if(emailExist) return res.status(400).send('email already registered')
  //Hashing password
  const salt= await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(req.body.password,salt)
  const signup=new Signup({
   username: req.body.username,
     email:req.body.email,
      password: hashedPassword
  })
  try{
  let savedUser=await signup.save()
 res.send({user:signup._id})
  }
  catch(err){
 res.json({message:err})
  }
})
module.exports=route;

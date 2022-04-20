const express=require('express');
let route= express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Signup=require('../models/SIGNUP');
const {registerValidation,loginValidation}=require('./passport')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     Login OR Signup:
 *       type: object
 *       required:
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
  *   name: Login or Signup
  *   description: login or signup
  */
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a account
 *     tags: [Login OR Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login OR Signup'
 *     responses:
 *       200:
 *         description: acccount created go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 */
route.post('/register', async (req, res)=>{
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
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login
 *     tags: [Login OR Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login OR Signup'
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login OR Signup'
 *       500:
 *         description: Some server error
 */
//login
route.post('/login', async (req, res)=>{
  //lets validate a user before submitting
 const{error}=loginValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);
  //checking if the email is already exist in database
  const user=await Signup.findOne({email:req.body.email})
  if(!user) return res.status(400).send('email not found');
  //checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send('invalid password');
  // create and asign web token(jwt)
  const token= jwt.sign({_id: user._id},process.env.SECRET)
  res.header('auth-token',token).send(token)
  res.send('logged In ')
   let login =new Signup({
       email: req.body.email,
       password: req.body.password
   })
   try{
const savedLogin= await login.save()
res.json(savedLogin)
   }
   catch(err){
 res.json({message:err})
   }
})
module.exports=route;

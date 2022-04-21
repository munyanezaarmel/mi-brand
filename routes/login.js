const express=require('express');
let route= express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Signup=require('../models/SIGNUP');
const {loginValidation}=require('./passport')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: valid email 
 *         password:
 *           type: string
 *       example:
 *         email: munyaarmel61@gmail.com
 *         password: Kigali@1
 */
/**
  * @swagger
  * tags:
  *   name:  Login
  *   description: login account
  */
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login
 *     tags: [Login ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login '
 *     responses:
 *       200:
 *         description: go to login page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */
//login
route.post('/', async (req, res)=>{
    //lets validate a user before submitting
   const{error}=loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    //checking if the email is already exist in database
    const user=await Signup.findOne({email: req.body.email})
    console.log(req.body.email, user);
    if(!user) return res.status(400).send('email not found');
    //checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('invalid password');
    // create and asign web token(jwt)
    const token= jwt.sign({_id: user._id},process.env.SECRET);
     let login =new Signup({
         email: req.body.email,
         password: req.body.password
     })
     try{
  const savedLogin= await login.save()
  res.header('auth-token',token).json(savedLogin)
     }
     catch(err){
   res.status(400).json({message:err})
     }
  })
  module.exports=route;
const express=require('express')
const Comment=require('../models/LIKES')
let routerLikes=express.Router()
const verify=require('./privateroutes')
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - like
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id 
 *         like:
 *           type: string
 *           description: like a blog
 *         comment:
 *           type: string
 *           description: commenting on a blog
 *       example:
 *         likes: yes
 *         comment: nice
 */
/**
  * @swagger
  * tags:
  *   name: Comment on blog
  *   description: like and comment on blog  
  */
/**
 * @swagger
 * /comment:
 *   get:
 *     summary: return all comments on single blog
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: The list of all comment on single blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
//get all likes information
routerLikes.get('/',async (req, res)=>{
    try{
        const getAllupdates= await Comment.find({})
        res.json(getAllupdates)
    }
    catch(err){
        res.json({message: err})
    }
})
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: post a comment
 *     tags: [Comment]
 *     responses:
 *       200:
 *          description: comment and like a blog
 */
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: comment on blog
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: comment posted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */
//post comment
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
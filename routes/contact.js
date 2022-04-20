const express=require('express')
const contact= require('../models/CONTACT')
let routerContact=express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: your email
 *         message:
 *           type: string
 *       example:
 *         id: ggyuuuju
 *         name: Armel
 *         email: munyaarmel61@gmail.com
 *         message: hi
 */
/**
  * @swagger
  * tags:
  *   name: contact me 
  *   description: get it touch
  */
/**
 * @swagger
 * /contact:
 *   get:
 *     summary: return list of all message
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: The list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
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

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: send me a message
 *     tags: [Contact]
 *     responses:
 *       200:
 *          description: create a single blog
 */
/**
 * @swagger
 * /contact:
 *   post:
 *     summary: send a message 
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: message sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Some server error
 */
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
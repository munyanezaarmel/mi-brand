const express=require('express')
const Blogs= require('../models/BLOGS')
const verify=require('./privateroutes')
let router=express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Blogs:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The blog title
 *         description:
 *           type: string
 *           description: description of blog
 *         image:
 *           type: string
 *       example:
 *         id: d5fE_asz
 *         title: why javascript is important
 *         description: javascript is important.......
 *         image: https://stackup-workspace.slack.com/team/U0352VD8NUA
 */
/**
  * @swagger
  * tags:
  *   name: Blogs
  *   description: managing Blogs API
  */
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: return list of all bblogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blogs'
 */
 
//getting all blogs
router.get('/', async (req, res)=>{
     try{
         const getAllBlogs= await Blogs.find({})
         res.status(200).json(getAllBlogs)
     }
     catch(err){
         res.json({message: err})
     }
})
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: create a blog
 *     responses:
 *       200:
 *          description: create a single blog
 */
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blogs'
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 */
//create a blog
router.post('/', verify ,async(req, res)=>{
    const blog=new Blogs({
        title: req.body.title,
        description: req.body.description,
        img:req.body.img
    })
    try{
        const savedBlogs= await blog.save()
        res.json(savedBlogs)
    }
    catch(err){
        res.json({message:err})
    }
})

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: Tthi is discription of blog by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The book was not found
 */
//retrieve a single blog
router.get('/:blogId', async(req, res) => {
    try {
   const singleBlog= await Blogs.findById(req.params.blogId)
   res.json(singleBlog)
    }
    catch (err) {
        res.json(err);
    }
})
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Remove the blog by  its id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
//DELETE A BLOG
router.delete('/:blogId',async(req, res)=>{
    try{
   const removed=  await Blogs.remove({_id:req.params.blogId})
   res.json(removed)
    }
    catch (err) {
        res.json({message:err});
    }
})
/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    summary: Update blog by its id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blogs'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blogs'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */
//update a blogId

router.patch('/:blogId',async(req, res)=>{
    try{
   const updated=await Blogs.updateOne(
    {_id:req.params.blogId},{$set:{title:req.body.title}}
    )
  
    res.json(updated)
    }
    catch (err) {
        res.json({message:err});
    }
})
module.exports=router
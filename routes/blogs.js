const express=require('express')
const Blogs= require('../models/BLOGS')
let router=express.Router()
 //getting all blogs
router.get('/', async (req, res)=>{
     try{
         const getAllBlogs= await Blogs.find({})
         res.json(getAllBlogs)
     }
     catch(err){
         res.json({message: err})
     }
})
//create a blog
router.post('/', async(req, res)=>{
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
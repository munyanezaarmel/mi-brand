const express=require('express')
let app= express()
const mongoose=require('mongoose')
require('dotenv').config()
const bodyParser= require('body-parser')
app.use(bodyParser.json())
//importing routes of blogs
let routeblog=require('./routes/blogs')
//importing routes of contact
let routeContact=require('./routes/contact')
//importing routes of profile
let routeProfile=require('./routes/profile')
//importing routelikes
let routeLikes=require('./routes/likes')
//importing routes for login
let routeLogin=require('./routes/login')
//importing routes for sign up
let routeSignup=require('./routes/signup')
//middleware for sign up 
app.use('/api/user',routeSignup)
//middlewares for Login
app.use('/user/login',routeLogin)
//middleware for likes
app.use('/comment',routeLikes)
//middleware for profile route
app.use('/profile',routeProfile)
//middleware for route contact 
app.use('/contact', routeContact)
//middleware for routepost
app.use('/blogs',routeblog)
//connecting to database
mongoose.connect(
    process.env.DATABASE_COLLECTION,{ useNewUrlParser: true },()=>
    console.log('connected to database')
)
//listening 
app.listen(3000)
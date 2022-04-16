const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const swaggerUI=require('swagger-ui-express')
const swaggerJsDoc=require('swagger-jsdoc')
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"My Brand API",
            version:"1.0.0",
            description:" my personal portfolio api"
        },
        servers:[{
             url:"http://localhost:3000"
        }],
        
    },
    apis:["./routes/*.js"]
}
const specs=swaggerJsDoc(options)
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
//importing routes for sign up
let routeSignup=require('./routes/signup')
//middleware for sign up 
app.use('/api/user',routeSignup)
//middleware for likes
app.use('/comment',routeLikes)
//middleware for profile route
app.use('/profile',routeProfile)
//middleware for route contact 
app.use('/contact', routeContact)
//middleware for routepost
app.use('/blogs',routeblog)
//middlewares for swagger documentation
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))
//connecting to database
app.use(cors())
app.use(morgan('dev'))
mongoose.connect(
    process.env.DATABASE_COLLECTION,{ useNewUrlParser: true },()=>
    console.log('connected to database')
)
//listening 
let port=process.env.PORT
if(port==null || port==""){
 port=8000
}
module.exports=app.listen(port,()=>console.log(`listening on port${port}`))
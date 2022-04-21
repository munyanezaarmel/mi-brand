const jwt=require('jsonwebtoken');
const util =require('util');
const { sign, verify } = jwt;

module.exports=async function(req,res,next){
    const token=req.header('auth-token')
    if(!token) return res.status(400).send('access denied')

    
    
    console.log("sdfd",token, process.env.SECRET)
    try{
    const verified=await util.promisify(verify)(token, process.env.SECRET);

 req.user=verified
 next()
}
catch (err){
    console.log(err)
 res.status(400).send('invalid token')
}
}


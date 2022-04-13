//VALIDATION
const joi=require('@hapi/joi');
//REGISTER VALIDATION
 const registerValidation=data =>{
const schema =joi.object({
    username: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
});
const validation=schema.validate(data)
return validation
} 
//Login validation
const loginValidation=data =>{
    const schema =joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    const validation=schema.validate(data)
   return validation
    }
module.exports.registerValidation=registerValidation
module.exports.loginValidation=loginValidation

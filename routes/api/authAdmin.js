const router = require("express").Router()
const { checkIfAdminExist, insertAdmin, getAdmin } = require("../../models/admin")
const { validateSignUpSchema, validateLogInSchema } = require("../../validation/admin.validation")
const { createHash, cmpHash } = require('../../config/bcrypt');
const { generateToken } = require('../../config/jwt');



router.post("/sign-up",async(req,res)=>{
    try{
        const [admin] = await checkIfAdminExist()
        if(admin[0])throw("access denied")

        const validatedValue = await validateSignUpSchema(req.body)
        const hashedPassword = await createHash(validatedValue.password)
        await insertAdmin(validatedValue.name,validatedValue.email,validatedValue.phoneNumber,hashedPassword)
        res.status(200).json("success")
    }
    catch(err){
        console.log("err",err);
        res.status(400).json(err)
    }
});

router.post("/sign-in-admin",async(req,res)=>{
    try{
       const validateValue =  await validateLogInSchema(req.body)
       const [admin] = await getAdmin(validateValue.email)
       if(admin[0].idadmin){
        const hashRes = await cmpHash(validateValue.password,admin[0].hashed_password)
        if(!hashRes)throw("invalid email or password");
         const token = await generateToken({
            name: admin[0].name,
            email: admin[0].email,
            phoneNumber: admin[0].phone_number,
            izAdmin:true
         })
         res.json({token})
       }
       else{
        throw("invalid email or password")
       }
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;
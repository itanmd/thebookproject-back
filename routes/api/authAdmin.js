const router = require("express").Router()
const { checkIfAdminExist, insertAdmin, getAdmin, updatePassword, updateAdminDetails } = require("../../models/admin")
const { validateSignUpSchema, validateLogInSchema, validateForgotPasswordSchema, validateRecoveryPasswordSchema, validateUpdateSchema } = require("../../validation/admin.validation")
const { createHash, cmpHash } = require('../../config/bcrypt');
const { generateToken } = require('../../config/jwt');
const generateRandomHexString = require('../../utils/randomHex');
const { encrypt, decrypt } = require('../../config/crypto');

const auth = require('../../middleware/admin.auth');
const { insertRecoveryData, getRecoveryData, removeRecoveryData, checkIfRecovery } = require('../../models/recoveryPassword');

const sendEmail = require('../../config/mailer');

router.get("/check-admin",async(req,res)=>{
    try{
        const [admin] = await checkIfAdminExist()
        if(admin[0]){
            res.json({admin:true})
        }
        else{
            res.json({admin:false})
        }
    }
    catch(err){
        res.status(400).json(err)
    }
})

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


router.post("/login-by-token",auth,async(req,res)=>{
     try{
         const [admin] = await getAdmin(req.userData.email)
         let token = await generateToken({
             name: admin[0].name,
             email: admin[0].email,
             phoneNumber: admin[0].phone_number,
             izAdmin:true
            })
         res.json({token})
    }catch(err){
        res.status(400).end()
    }
}) 

router.post("/forgot-password",async(req,res)=>{
    try{
        const {email} = await validateForgotPasswordSchema(req.body)
        const [admin] = await getAdmin(email)
        if(admin[0]){
            const secretKey = generateRandomHexString(8)
            const encryptedData = encrypt(admin[0].email)
            const secretUrl = `http://localhost:3000/recovery-password/${secretKey}/${encryptedData.iv}/${encryptedData.encryptedData}`
            const expDate = new Date(Date.now() + 600000)
            const [recovery] =  await checkIfRecovery()
            if(recovery[0]){
                await removeRecoveryData()
            }
            await insertRecoveryData(admin[0].email,secretKey,expDate)
            sendEmail({
                from:process.env.EMAIL,
                to: admin[0].email,
                subject: 'Your password recovery link',
                html:`
                 <h1>your password recovery link</h1>
                 <a href="${secretUrl}">click here</a>
                 <br>
                 <b>Please remember your password for next time :)</b>`
            }

            )
        res.status(200).json("if the email exist, the mail was sent")

        }
        else{
           res.status(200).json("if the email exist, the mail was sent")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post("/recovery-password/:secretKey/:iv/:encryptedData",async(req,res)=>{
    try{
        const {password} = await validateRecoveryPasswordSchema(req.body)
        const decryptedEmail = decrypt({
            iv:req.params.iv,
            encryptedData:req.params.encryptedData
        })
        const {email} = await validateForgotPasswordSchema({email:decryptedEmail})
        const [recoveryData] = await getRecoveryData(email,req.params.secretKey)
        if(recoveryData[0]){
            if(recoveryData[0].secret_key === req.params.secretKey){
                const timeNow = new Date()
                if(timeNow.getTime() < recoveryData[0].expDate.getTime()){
                    const hashedPassword = await createHash(password)
                    await updatePassword(hashedPassword,recoveryData[0].admin_email)
                    await removeRecoveryData()
                    res.status(200).json("password updated successfully")
                }
                else{
                    throw("something went wrong")
                }
            }
            else{
                throw("something went wrong")
            }
        }
        else{
            throw("something went wrong")
        }

    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})

router.put("/update-details", auth, async(req,res)=>{
    try{
        await validateUpdateSchema(req.body)
        await updateAdminDetails(req.body.name,req.body.email,req.body.phoneNumber)

         let token = await generateToken({
             name: req.body.name,
             email: req.body.email,
             phoneNumber: req.body.phoneNumber,
             izAdmin:true
            })
         res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})




module.exports = router;
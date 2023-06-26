const express = require('express');
const { generateToken, verifyToken } = require('../../config/jwt');
const { insertGoogleLead, getLead } = require('../../models/leads');
const router = express.Router()
const {OAuth2Client} = require('google-auth-library');


router.post("/google-lead",async(req,res)=>{
    try{
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const ticket = await client.verifyIdToken({
        idToken:req.body.token,
            audience:process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()
        const [lead] = await getLead(payload.email)
        if(lead[0]){
            const token = await generateToken({email:lead[0].email, name:lead[0].name,id:lead[0].idleads})
            res.json({token})
        }
        else{
             let lead = await insertGoogleLead(payload.name,payload.email)
             const token = await generateToken({email:payload.email,name:payload.name,id:lead[0].insertId})
             res.json({token})
        }
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post("/login-by-token",async(req,res)=>{
    try{
        const data = await verifyToken(req.body.token)
        const token = await generateToken({email:data.email, name:data.name,id:data.id})
        res.json({token})
    }
    catch(err){
         res.status(400).json("invalid token")
    }
})


module.exports = router
const express = require('express')
const { getLead, updateLeadPhoneNumber, insertLead } = require('../../models/leads')
const { sendMessage, getMessages, getAmount, setWatched, getUnreadMessagesAmount } = require('../../models/messages')
const { validateMessageSchema } = require('../../validation/messages.validation')
const router = express.Router()
const authAdmin = require("../../middleware/admin.auth")

router.post("/",async(req,res)=>{
    try{
        let time = new Date(Date.now())
        let idLead;
        const validatedValue =  await validateMessageSchema(req.body)
        const [lead] = await getLead(validatedValue.email)
        if(lead[0]){
            await updateLeadPhoneNumber(lead[0].idleads,validatedValue.phoneNumber)
        }
        else{
            idLead = await insertLead(validatedValue.name,validatedValue.email,validatedValue.phoneNumber)
        }
        await sendMessage(lead[0]?lead[0].idleads:idLead[0].insertId,validatedValue.message,validatedValue.subject,time)
        res.end()
    }
    catch(err){
        res.status(400).json(err)
    }
})


router.get("/unread-amount",authAdmin,async(req,res)=>{
    try{
        const [amount] = await getUnreadMessagesAmount()
        res.json(amount[0])
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get("/:limit",authAdmin,async(req,res)=>{
    try{
        const [messages] = await getMessages(req.params.limit)
        const [amount] = await getAmount()
        res.json({messages,amount:amount[0]})
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.put("/:id",authAdmin,async(req,res)=>{
    try{
        await setWatched(req.params.id)
        res.status(202).end()
    }
    catch(err){
        res.status(400).end()
    }
})

module.exports = router
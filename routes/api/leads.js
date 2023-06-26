const express = require("express")
const router  = express.Router()
const authAdmin = require("../../middleware/admin.auth")
const { getLeads, removeLead } = require("../../models/leads")

router.get("/",authAdmin,async(req,res)=>{
    try{
        const [leads] = await getLeads()
        res.json(leads)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.delete("/:id",authAdmin,async(req,res)=>{
    try{
        await removeLead(req.params.id)
        res.status(202).end()
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router
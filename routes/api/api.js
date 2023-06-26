const router = require('express').Router()

const adminRouter = require("./authAdmin")
const authLeadRouter = require('./authLead')
const leadsRouter = require('./leads')


router.use("/admin",adminRouter)
router.use("/lead",authLeadRouter)
router.use("/leads",leadsRouter)

module.exports = router
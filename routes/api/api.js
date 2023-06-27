const router = require('express').Router()

const adminRouter = require("./authAdmin")
const authLeadRouter = require('./authLead')
const leadsRouter = require('./leads')
const booksRouter = require('./books')


router.use("/admin",adminRouter)
router.use("/lead",authLeadRouter)
router.use("/leads",leadsRouter)
router.use("/books",booksRouter)


module.exports = router
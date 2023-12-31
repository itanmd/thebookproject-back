const router = require('express').Router()

const adminRouter = require("./authAdmin")
const authLeadRouter = require('./authLead')
const favoritesRouter = require('./favorites')
const leadsRouter = require('./leads')
const booksRouter = require('./books')
const categoryRouter = require('./categories')
const messagesRouter = require('./messages')



router.use("/admin",adminRouter)
router.use("/lead",authLeadRouter)
router.use("/favorites",favoritesRouter)
router.use("/leads",leadsRouter)
router.use("/books",booksRouter)
router.use("/categories", categoryRouter)
router.use("/messages",messagesRouter)




module.exports = router
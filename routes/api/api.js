const router = require('express').Router()

const adminRouter = require("./authAdmin")

router.use("/admin",adminRouter)

module.exports = router
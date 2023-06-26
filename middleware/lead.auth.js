const { verifyToken } = require("../config/jwt")
const { getLead } = require("../models/leads")

module.exports = async (req, res, next) => {
    try {
        let dataFromToken = await verifyToken(req.headers["x-auth-token"])
        let lead = await getLead(dataFromToken.email)
        let leadData = lead[0]
        if(leadData[0].email){
        req.leadData = leadData[0]
        next()}
        else{
            throw("Access denied")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}
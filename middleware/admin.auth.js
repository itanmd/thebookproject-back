const {
    verifyToken
} = require("../config/jwt")
const {
    getAdmin
} = require("../models/admin")


module.exports = async (req, res, next) => {
    try {
        let dataFromToken = await verifyToken(req.headers["x-auth-admin-token"])
        let user = await getAdmin(dataFromToken.email)
        let userData = user[0]
        if(userData[0].email){
        req.userData = userData[0]
        next()}
        else{
            throw("Access denied")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}
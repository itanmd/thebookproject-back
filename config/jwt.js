const jwt = require("jsonwebtoken")

const generateToken = (data) => {
    return new Promise((res, rej) => {
        jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: `${data.izAdmin?"4h":"72h"}`
        }, (err, token) => {
            if (err) rej(err)
            else res(token)
        })
    })
}

const verifyToken = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (err) {
                rej(err)
            }
            res(data)
        })
    })
}

module.exports = {
    generateToken,
    verifyToken
}


const mysql = require("./mySqlPool")

const getRecoveryData = (adminEmail,secretKey)=>{
    return mysql.execute(`SELECT * FROM recovery_password WHERE admin_email = ? AND secret_key = ?`,[adminEmail,secretKey])
}

const checkIfRecovery = ()=>{
    return mysql.execute(`SELECT * FROM recovery_password`)
}

const insertRecoveryData = (adminEmail,secretKey,expDate)=>{
    return mysql.execute(`INSERT INTO recovery_password (admin_email, secret_key, expDate) VALUES (?, ?, ?)`,[adminEmail,secretKey,expDate])
}

const removeRecoveryData = ()=>{
    return mysql.execute(`DELETE FROM recovery_password`)
}

module.exports = {
    getRecoveryData,
    insertRecoveryData,
    removeRecoveryData,
    checkIfRecovery
}
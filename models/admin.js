const mysql = require("./mySqlPool")

const insertAdmin = (name,email,phoneNumber,hashedPassword)=>{
    return mysql.execute(`
    INSERT INTO the_book_project.admin (name, email, phone_number, hashed_password) VALUES (?, ?, ?, ?)
`,[name,email,phoneNumber,hashedPassword])
}

const getAdmin = (email)=>{
    return mysql.execute(`SELECT * FROM admin WHERE email = ?`,[email])
}

const checkIfAdminExist = ()=>{
    return mysql.execute(`SELECT * FROM admin`)
}

const updatePassword = (password,email)=>{
    return mysql.execute(`UPDATE admin SET hashed_password = ? WHERE (email = ?);
`,[password,email])
}

const updateAdminDetails = (name,email,phonenumber)=>{
    return mysql.execute(`UPDATE admin SET name = ? , email = ? , phone_umber = ? , WHERE email = ?`,[name,email,phonenumber,email])
}

module.exports = {
    insertAdmin,
    getAdmin,
    updatePassword,
    checkIfAdminExist,
    updateAdminDetails
}

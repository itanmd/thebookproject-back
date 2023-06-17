const mysql = require("./mySqlPool")

const insertGoogleLead = (name,email)=>{
    return mysql.execute(`INSERT INTO leads (name, email) VALUES (?,?)`,[name,email])
}

const insertLead = (name,email,phonenuber)=>{
     return mysql.execute(`INSERT INTO leads (name, email,phone_number) VALUES (?,?,?)`,[name,email,phonenuber])
}

const updateLeadPhoneNumber= (idLead,phonenumber)=>{
 return mysql.execute(`UPDATE leads SET phone_number = ? WHERE (idleads = ?);
`,[phonenumber,idLead])
}

const getLead = (email)=>{
    return mysql.execute(`SELECT * FROM leads WHERE email = ?`,[email])
}

const getLeads = ()=>{
    return mysql.execute(`SELECT * FROM leads`)
}

const removeLead = (id)=>{
    return mysql.execute(`DELETE FROM leads WHERE (idleads = ?)
`,[id])
}

module.exports = {
    insertGoogleLead,
    insertLead,
    updateLeadPhoneNumber,
    getLead,
    getLeads,
    removeLead
}
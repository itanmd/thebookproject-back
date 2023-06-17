const mysql = require("./mySqlPool")

const sendMessage = (idlead,message,subject,date)=>{
    return mysql.execute(`INSERT INTO messages (idlead, message, subject, date) VALUES (?, ?, ?, ?)
`,[idlead,message,subject,date])
}

const getMessages = (limit)=>{
    return mysql.execute(`SELECT idmessages,date,subject,message,name,email,phone_number,watched FROM messages
inner join leads on messages.idlead = leads.idleads
ORDER BY date desc
limit ?,20`,[limit])
}

const getAmount = ()=>{
    return mysql.execute(`SELECT COUNT(idmessages) AS amount FROM messages`)
}

const getUnreadMessagesAmount = ()=>{
    return mysql.execute(`SELECT COUNT(idmessages) AS amount FROM messages WHERE watched = '0'`)
}

const setWatched = (id)=>{
    return mysql.execute(`UPDATE messages SET watched = '1' WHERE (idmessages = ?)
`,[id])
}

module.exports = {
    sendMessage,
    getMessages,
    getAmount,
    getUnreadMessagesAmount,
    setWatched
}
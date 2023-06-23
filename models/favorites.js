const mysql = require("./mySqlPool")

const insertFavorite = (idLead,idBook)=>{
    return mysql.execute(`INSERT INTO favorites (idlead, idBook) VALUES (?,?);
`,[idLead,idBook])
}

const getFavorite = (idLead,idBook)=>{
    return mysql.execute(`SELECT * FROM favorites WHERE idlead = ? AND idBook = ?`,[idLead,idBook])
}

const getFavorites = (idlead)=>{
    return mysql.execute(`
    SELECT idBooks,name,short_description,image_link,price FROM favorites
inner join Books on favorites.idBook = Books.idBooks
where idlead = ?
`,[idlead])
}

const removeFavorite = (idlead,idBook)=>{
    return mysql.execute(`
    DELETE FROM favorites WHERE idlead = ? AND idBook = ?
    `,[idlead,idBook])
}

const getFavoritesId = (idlead)=>{
    return mysql.execute(`
    SELECT idBook FROM favorites where idlead = ?
`,[idlead])
}

module.exports = {
    insertFavorite,
    getFavorites,
    removeFavorite,
    getFavorite,
    getFavoritesId
}
const mysql = require("./mySqlPool")

const insertBook = (name,description,uuid,pages,price,category,image_link)=>{
    return mysql.execute(
        `INSERT INTO books (name, description, uuid, pages, price, category, image_link) VALUES (?, ?, ?, ?, ?, ?, ?);
`,[name,description,uuid,pages,price,category,image_link]
    )
}

const updateBook = (name,description,uuid,pages,price,category,image_link,idBook)=>{
    return mysql.execute(
        `UPDATE books SET name = ?, description = ?, uuid = ?, pages = ?, price = ?, category, image_link = ? WHERE (idbooks = ?);

`,[name,description,uuid,pages,price,category,image_link,idBook]
    )
}

const updateBookNoImg = (name,description,uuid,pages,price,category,idBook)=>{
    return mysql.execute(
        `UPDATE books SET name = ?, description = ?, uuid = ?, pages = ?, price = ?, category = ?,  WHERE (idbooks = ?);

`,[name,description,uuid,pages,price,category,idBook]
    )
}

const deleteBook = (id)=>{
    return mysql.execute(`
    DELETE FROM books WHERE (idbooks = ?);
    `,[id])
}

const getAllBooks = ()=>{
    return mysql.execute(`
    SELECT idbooks,name,description,uuid,pages,price,category,image_link FROM books;
    `)
}

const getHomeBooks = ()=>{
    return mysql.execute(`SELECT * FROM the_book_project.books ORDER BY rand() LIMIT 0,6`)
}

const getBook = (id)=>{
    return mysql.execute(`
   SELECT * FROM books WHERE idbooks = ?
    `,[id])
}

const updatePrice = (price,id)=>{
    return mysql.execute(`
    UPDATE books SET price = ? WHERE (idbooks = ?);
    `,[price,id])
}

const getNames = ()=>{
    return mysql.execute(`SELECT idbooks,name FROM books`)
}

const getBooksCheapToExp = ()=>{
    return mysql.execute(`SELECT * FROM books ORDER BY price`)
}

const getBooksExpToCheap = ()=>{
    return mysql.execute(`SELECT * FROM books ORDER BY price DESC`)
}

module.exports = {
    insertBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBook,
    updatePrice,
    updateBookNoImg,
    getHomeBooks,
    getNames,
    getBooksCheapToExp,
    getBooksExpToCheap
}
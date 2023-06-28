const mysql = require("./mySqlPool")

const insertCategory = (category_name)=>{
    return mysql.execute(`INSERT INTO categories (category_name) VALUES (?);
`,[category_name])
}

const updateCategory = (category_name, idcategories)=>{
    return mysql.execute(
        `UPDATE categories SET category_name = ? WHERE (idcategories = ?);

`,[category_name,idcategories]
    )
}

const deleteCategory = (id)=>{
    return mysql.execute(`
    DELETE FROM categories WHERE (idcategories = ?);
    `,[id])
}

const getAllCategories = ()=>{
    return mysql.execute(`
    SELECT idcategories,category_name FROM categories;
    `)
}

module.exports = {
    insertCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}
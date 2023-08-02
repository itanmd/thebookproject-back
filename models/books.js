const mysql = require("./mySqlPool");

const insertBook = (
  name,
  description,
  uuid,
  pages,
  price,
  categoryId,
  image_link
) => {
  return mysql.execute(
    `INSERT INTO books (name, description, uuid, pages, price, categoryId, image_link) VALUES (?, ?, ?, ?, ?, ?, ?);
`,
    [name, description, uuid, pages, price, categoryId, image_link]
  );
};

const updateBook = (
  name,
  description,
  uuid,
  pages,
  price,
  categoryId,
  image_link,
  idbooks
) => {
  return mysql.execute(
    `UPDATE books SET name = ?, description = ?, uuid = ?, pages = ?, price = ?, categoryId = ?, image_link = ? WHERE idbooks = ?`,
    [name, description, uuid, pages, price, categoryId, image_link, idbooks]
  );
};

const updateBookNoImg = (
  name,
  description,
  uuid,
  pages,
  price,
  categoryId,
  idBook
) => {
  return mysql.execute(
    `UPDATE books SET name = ?, description = ?, uuid = ?, pages = ?, price = ?, categoryId = ? WHERE idbooks = ?;

`,
    [name, description, uuid, pages, price, categoryId, idBook]
  );
};

const deleteBook = (id) => {
  return mysql.execute(
    `
    DELETE FROM books WHERE (idbooks = ?);
    `,
    [id]
  );
};

const getAllBooks = () => {
  return mysql.execute(`
    SELECT idbooks,name,description,uuid,pages,price,categoryId,image_link FROM books;
    `);
};

const getHomeBooks = () => {
  return mysql.execute(
    `SELECT * FROM the_book_project.books ORDER BY rand() LIMIT 0,9`
  );
};

const getBook = (id) => {
  return mysql.execute(
    `
    SELECT idcategories,idbooks,name,description,uuid,pages,price,image_link,category_name FROM the_book_project.books
    inner join categories on books.categoryId = categories.idcategories
    where idbooks = ?
    `,
    [id]
  );
};

const updatePrice = (price, id) => {
  return mysql.execute(
    `
    UPDATE books SET price = ? WHERE (idbooks = ?);
    `,
    [price, id]
  );
};

const getNames = () => {
  return mysql.execute(`SELECT idbooks,name FROM books`);
};

const getBooksCheapToExp = () => {
  return mysql.execute(`SELECT * FROM books ORDER BY price`);
};

const getBooksExpToCheap = () => {
  return mysql.execute(`SELECT * FROM books ORDER BY price DESC`);
};

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
  getBooksExpToCheap,
};

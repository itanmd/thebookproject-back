const router = require("express").Router()
const authAdmin = require("../../middleware/admin.auth")
const {getAllBooks, getBook, deleteBook,  updatePrice, insertBook, updateBook, updateBookNoImg, getHomeBooks, getNames, getBooksExpToCheap, getBooksCheapToExp} = require('../../models/books')
const {validateDeleteOrGetSchema, validateUpdatePriceSchema, validateInsertOrUpdateBookSchema} = require('../../validation/books.validation')
const fs = require("fs").promises;
const multer = require("../../config/multerTypes");
const uploadMulter = multer.createMulter("uploads/", 3000000, {
  type: multer.allowedTypes.img,
});

router.post("/",authAdmin,uploadMulter.single("prodImg"),async(req,res)=>{
    try{
        delete req.body.prodImg
        const validateValue = await validateInsertOrUpdateBookSchema(req.body)
        await insertBook(validateValue.name,validateValue.description,validateValue.uuid,validateValue.pages,validateValue.price,validateValue.categoryId,req.file.filename)
        res.json("success")
    }
    catch(err){
        if(req.file){
        fs.unlink(req.file.path)
        }
        res.status(400).json(err)
    }
})

router.get("/",async(req,res)=>{
     try{
        const [books] = await getAllBooks()
        res.json(books)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get("/names",async(req,res)=>{
    try{
        const [names] = await getNames()
        res.json(names)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})


module.exports = router

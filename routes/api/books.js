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

router.put("/:idBook",authAdmin,uploadMulter.single("prodImg"),async(req,res)=>{
    try{
        if(req.body.prodImg){
         delete req.body.prodImg
        }
         const validateValue = await validateInsertOrUpdateBookSchema(req.body)
         if(req.file){
         await updateBook(validateValue.name,validateValue.description,validateValue.uuid,validateValue.pages,validateValue.price,validateValue.categoryId,req.file.filename,req.params.idBook)
         }
         else{
            await updateBookNoImg(validateValue.name,validateValue.description,validateValue.uuid,validateValue.pages,validateValue.price,validateValue.categoryId,req.params.idBook)
         }
         res.end()
    }
    catch(err){
        res.status(400).json(err)
    }
    
})

router.put("/price",authAdmin,async(req,res)=>{
     try{
        await validateUpdatePriceSchema(req.body)
        await updatePrice(req.body.price,req.body.idBook)
        res.end()
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.delete("/:idBook",authAdmin,async(req,res)=>{
     try{
        await validateDeleteOrGetSchema({ idBook:req.params.idBook})
        await deleteBook(req.params.idBook)
        res.end()
    }
    catch(err){
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

router.get("/cheap-to-exp",async(req,res)=>{
    try{
        const [books] = await getBooksCheapToExp()
        res.json(books)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get("/exp-to-cheap",async(req,res)=>{
    try{
        const [books] = await getBooksExpToCheap()
        res.json(books)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get("/home",async(req,res)=>{
     try{
        const [books] = await getHomeBooks()
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

router.get("/:idBook",async(req,res)=>{
     try{
        await validateDeleteOrGetSchema({idBook:req.params.idBook})
        const [book] = await getBook(req.params.idBook)
        res.json(book)
    }
    catch(err){
        res.status(400).json(err)
    }
})


module.exports = router

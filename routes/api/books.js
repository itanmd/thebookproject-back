const router = require("express").Router()
const authAdmin = require("../../middleware/admin.auth")
const {insertBook, getNames, getAllBooks} = require('../../models/books')
const {validateInsertOrUpdateBookSchema, validateUpdatePriceSchema, validateDeleteOrGetSchema} = require('../../validation/books.validation')

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

router.post("/",authAdmin, async(req,res) => {
   try {
        const validateValue = await validateInsertOrUpdateBookSchema(req.body)
        await insertBook(validateValue.name, validateValue.description, validateValue.uuid, validateValue.pages, validateValue.price )
        res.end()
    } catch(err){
        console.log(err);;
    }
})



module.exports = router

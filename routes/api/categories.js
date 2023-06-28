const router = require("express").Router()
const authAdmin = require("../../middleware/admin.auth")
const {insertCategory, updateCategory, deleteCategory, getAllCategories} = require('../../models/categories')
const {validateInsertOrUpdateCategorySchema, validateDeleteOrGetSchema} = require('../../validation/category.validation')

router.post("/", authAdmin,async(req,res) => {
    try {
        const validateValue =
        await validateInsertOrUpdateCategorySchema(req.body)
        await insertCategory(validateValue.category_name)
        res.json("success")
    }
    catch(err) {
        res.status(400).json(err)
    }
})

router.put("/:idCategory", authAdmin, async(req,res) => {
    try{
        const validateValue = await validateInsertOrUpdateCategorySchema(req.body) 
        await updateCategory(validateValue.category_name, req.params.idCategory)
        res.json("success")
    } catch {
         res.status(400).json(err)
    }
})

router.delete("/:idCategory",authAdmin, async(req,res) => {
    try {
        await validateDeleteOrGetSchema({idCategory:req.params.idCategory})
        await deleteCategory(req.params.idCategory)
        res.json("success")
    } catch {
         res.status(400).json(err)
    }
})

router.get("/",async(req,res)=>{
     try{
        const [categories] = await getAllCategories()
        res.json(categories)
    }
    catch(err){
        res.status(400).json(err)
    }
})





module.exports = router
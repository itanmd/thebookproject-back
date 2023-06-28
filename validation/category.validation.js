const Joi = require("joi");


const category_nameRole = {
    category_name:Joi.string().min(2).max(50).required()
}

const idCategoryRole = {
    idCategory:Joi.number().min(1).max(100).required()
}

const insertOrUpdateCategorySchema = Joi.object({
    ...category_nameRole
})

const deleteOrGetSchema =Joi.object({
    ...idCategoryRole
})

const validateInsertOrUpdateCategorySchema = (data)=>{
    return insertOrUpdateCategorySchema.validateAsync(data,{abortEarly:false})
}

const validateDeleteOrGetSchema = (data)=>{
    return deleteOrGetSchema.validateAsync(data,{abortEarly:false})
}

module.exports={
    validateInsertOrUpdateCategorySchema,
    validateDeleteOrGetSchema,
    insertOrUpdateCategorySchema,
    idCategoryRole,
    category_nameRole
}
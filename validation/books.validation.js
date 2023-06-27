const Joi = require("joi")
const { idBookRole } = require("./favorite.validation")

const nameRole = {
    name:Joi.string().min(2).max(50).required()
}
const descriptionRole = {
    description: Joi.string().min(5).max(5000).required()
}

const uuidRole = {
    uuid: Joi.number().min(Number.MIN_VALUE).max(999999999).required()
}

const pagesRole = {
    pages: Joi.number().min(1).max(2000).required()
}

const priceRole = {
    price:Joi.number().min(Number.MIN_VALUE).max(10000).required()
}

const categoryIdRole = {
    categoryId: Joi.number().min(1).max(255).required()
}

const insertOrUpdateBookSchema = Joi.object({
    ...nameRole,
    ...descriptionRole,
    ...uuidRole,
    ...pagesRole,
    ...priceRole,
    ...categoryIdRole
})

const updatePriceSchema = Joi.object({
    ...priceRole,
    ...idBookRole
})

const deleteOrGetSchema =Joi.object({
    ...idBookRole
})

const validateInsertOrUpdateBookSchema = (data)=>{
    return insertOrUpdateBookSchema.validateAsync(data,{abortEarly:false})
}

const validateUpdatePriceSchema = (data)=>{
    return updatePriceSchema.validateAsync(data,{abortEarly:false})
}

const validateDeleteOrGetSchema = (data)=>{
    return deleteOrGetSchema.validateAsync(data,{abortEarly:false})
}

module.exports = {
    validateInsertOrUpdateBookSchema,
    validateUpdatePriceSchema,
    validateDeleteOrGetSchema,
}
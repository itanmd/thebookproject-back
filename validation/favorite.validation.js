const Joi = require("joi");

const idLeadRole = {
    idLead:Joi.number().min(1).max(100000000).required(),
}
const idBookRole = {
    idBook:Joi.number().min(1).max(100).required()
}

const insertOrRemoveFavoriteSchema = Joi.object({
    ...idLeadRole,
    ...idBookRole,
})


const validateInsertGetOrRemoveFavoriteSchema = (data)=>{
    return insertOrRemoveFavoriteSchema.validateAsync(data,{abortEarly:false})
}


module.exports = {
    validateInsertGetOrRemoveFavoriteSchema,
    idLeadRole,
    idBookRole
}
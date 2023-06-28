const Joi = require("joi")
const { nameRole, emailRole, phoneNumberRole } = require("./lead.validation")

const messageRole = {
    message: Joi.string().min(5).max(1000).required()
}
const subjectRole = {
    subject: Joi.string().min(2).max(50).required()
}

const messageSchema = Joi.object({
    ...messageRole,
    ...nameRole,
    ...emailRole,
    ...phoneNumberRole,
    ...subjectRole,
})

const validateMessageSchema = (data)=>{
    return messageSchema.validateAsync(data,{abortEarly:false})
}

module.exports = {
    validateMessageSchema
}
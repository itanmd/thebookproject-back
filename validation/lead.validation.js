const Joi = require("joi");

const nameRole = {
    name: Joi.string().min(2).max(255).trim().required()
}
const emailRole = {
    email: Joi.string().email().min(6).max(255).trim().required()
}
const phoneNumberRole = {
    phoneNumber: Joi.string().min(9).max(15).trim().required()
}

const googleLeadSchema = Joi.object({
    ...nameRole,
    ...emailRole,
});

const leadSchema = Joi.object({
     ...nameRole,
     ...emailRole,
     ...phoneNumberRole,
})


const validateGoogleLeadSchema = (data) => {
    return googleLeadSchema.validateAsync(data, {
        abortEarly: false
    })
};

const validateLeadSchema = (data) => {
    return leadSchema.validateAsync(data, {
        abortEarly: false
    })
};



module.exports = {
    validateGoogleLeadSchema,
    validateLeadSchema,
    nameRole,
    emailRole,
    phoneNumberRole
}
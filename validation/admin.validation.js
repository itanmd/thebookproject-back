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
const passwordRole = {
    password: Joi.string().regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$")).required(),
};

const signUpSchema = Joi.object({
    ...nameRole,
    ...emailRole,
    ...phoneNumberRole,
    ...passwordRole,
});

const updateSchema = Joi.object({
     ...nameRole,
    ...emailRole,
    ...phoneNumberRole,
})

const logInSchema = Joi.object({
    ...emailRole,
    ...passwordRole,
})

const forgotPasswordSchema = Joi.object({
    ...emailRole
})

const recoveryPasswordSchema = Joi.object({
    ...passwordRole
})


const validateSignUpSchema = (data) => {
    return signUpSchema.validateAsync(data, {
        abortEarly: false
    })
};

const validateUpdateSchema = (data) => {
    return updateSchema.validateAsync(data, {
        abortEarly: false
    })
};

const validateLogInSchema = (data) => {
    return logInSchema.validateAsync(data, {
        abortEarly: false
    })
};

const validateForgotPasswordSchema = (data)=>{
    return forgotPasswordSchema.validateAsync(data,{abortEarly:false})
}

const validateRecoveryPasswordSchema = (data)=>{
    return recoveryPasswordSchema.validateAsync(data,{abortEarly:false})
}



module.exports = {
    validateSignUpSchema,
    validateLogInSchema,
    validateForgotPasswordSchema,
    validateRecoveryPasswordSchema,
    validateUpdateSchema
}
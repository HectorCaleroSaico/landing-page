import Joi from 'joi'

const postUserRequestInformation = {
    body: Joi.object({
        documentTypeId: Joi.number().integer().default(0),
        document: Joi.string().empty('').default(''),
        businessName: Joi.string().empty('').default(''),
        firstName: Joi.string().empty('').default(''),
        lastName: Joi.string().empty('').default(''),
        email: Joi.string().empty('').default(''),
        countryPhonecodeId: Joi.number().integer().default(0),
        phoneNumber: Joi.string().empty('').default(''),
        cityId: Joi.number().integer().default(0),
        message: Joi.string().empty('').default('')
    })
}

export {
    postUserRequestInformation
}
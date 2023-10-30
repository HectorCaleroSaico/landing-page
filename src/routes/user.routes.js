import { Router } from 'express'
import Joi from 'joi'
import { UserController } from '../controllers/index.js'
import validate from '../utils/validator.js'

const router = Router()

const postUserRequestInformation = {
    query: Joi.object({
        id: Joi.number().integer().default(0)
    }),
    body: Joi.object({
        ruc: Joi.string().empty('').default(''),
        businessName: Joi.string().empty('').default(''),
        firstName: Joi.string().empty('').default(''),
        lastName: Joi.string().empty('').default(''),
        email: Joi.string().empty('').default(''),
        phone: Joi.string().empty('').default(''),
        city: Joi.number().integer().default(0),
        message: Joi.string().empty('').default('')
    })
}

router
    .route('/v1/request/information')
    .post(
      validate(postUserRequestInformation),
      UserController.postUserRequestInformation
        //UserController.postUserRequestInformation
    )
    
    //.post('/v1/request/information')

export default router

/*
const getUsersRelsCommerces = {
  query: Joi.object().keys({
    uid_users: Joi.string().empty('').default(''),
    timestamp_active_from: Joi.string().empty('').default(''),
    timestamp_active_to: Joi.string().empty('').default(''),
    id_countries_documents_types: Joi.number().integer().empty('').default(''),
    document: Joi.string().empty('').default(''),
    id_countries_phonecodes: Joi.number().integer().default(51),
    phone_number: Joi.string().empty('').max(255).default(''),
    email: Joi.string().empty('').max(255).default(''),
    id_users_points_levels: Joi.number().integer().empty('').default(null),
    approved: Joi.number().integer().empty('').default(null),
    id_commerces: Joi.string().empty('').max(255).default(''),
    id_users_sessions: Joi.number().integer().default(0),
    option: Joi.number().integer().default(1),
    offset: Joi.number().integer().default(0),
    row_count: Joi.number().integer().default(100),
    page: Joi.number().integer().empty('').default(1),
  }),
};
*/
import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { UserValidate } from '../validates/index.js'
import { validate } from '../utils/index.js'

const router = Router()

router
  .route('/v1/request/information')
  .post(
    validate(UserValidate.postUserRequestInformation),
    UserController.postUserRequestInformation
  )

export default router

/*import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { UserValidate } from '../validates/index.js'
import { validate } from '../utils/index.js'
*/

const { Router } = require('express')
const { UserController } = require('../controllers/index')
const { UserValidate } = require('../validates/index')
const { validate } = require('../utils/index')


const router = Router()

router
  .route('/v1/request/information')
  .post(
    validate(UserValidate.postUserRequestInformation),
    UserController.postUserRequestInformation
  )

//export default router
module.exports = router

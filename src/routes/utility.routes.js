/*
import { Router } from 'express'
import { UtilityController } from '../controllers/index.js'
*/

const { Router } = require('express')
const { UtilityController } = require('../controllers/index')

const router = Router()

router
  .route('/v1/document-types')
  .get(
    UtilityController.getDocumentTypes
  )

router
  .route('/v1/countries-phonecodes')
  .get(
    UtilityController.getCountriesPhonecodes
  )

router
  .route('/v1/cities')
  .get(
    UtilityController.getCities
  )

//export default router
module.exports = router

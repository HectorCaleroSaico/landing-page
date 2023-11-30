/*import { Router } from 'express'

import userRouter from './user.routes.js'
import utilityRouter from './utility.routes.js'*/

const { Router } = require('express')

const userRouter = require('./user.routes')
const utilityRouter = require('./utility.routes')

const router = Router()

router.use('/user', userRouter)
router.use('/utility', utilityRouter)

//export default router
module.exports = router
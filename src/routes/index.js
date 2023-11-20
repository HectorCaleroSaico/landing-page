import { Router } from 'express'

import userRouter from './user.routes.js'
import utilityRouter from './utility.routes.js'

const router = Router()

router.use('/user', userRouter)
router.use('/utility', utilityRouter)

export default router
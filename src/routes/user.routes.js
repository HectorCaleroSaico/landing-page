import { Router, request, response } from 'express'

const router = Router()

router.
    route('/v1/request/information')
    .get((req = request, res = response) => {

        res.status(200).json({
            firstName: 'Hector Alcides',
            lastName: 'Calero Rivera',
            email: 'hectorcalerosaico@gmail.com',
            phone: '960228826'
        })

    })
    .post('/v1/request/information')

export default router
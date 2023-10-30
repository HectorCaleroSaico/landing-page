import { request, response } from 'express'

const postUserRequestInformation = async (req = request, res = response) => {

    const params = {
        ruc: req.body.ruc,
        businessName: req.body.businessName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        message: req.body.message
    }

    res.status(200).json(params)

}


export {
    postUserRequestInformation
}
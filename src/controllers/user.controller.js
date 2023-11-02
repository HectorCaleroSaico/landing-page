import { request, response } from 'express'
import { UserService } from '../services/index.js'

const postUserRequestInformation = async (req = request, res = response) => {

    const params = {
        documentTypeId: req.body.documentTypeId,
        document: req.body.document,
        businessName: req.body.businessName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        countryPhonecodeId: req.body.countryPhonecodeId,
        phone: req.body.phone,
        cityId: req.body.cityId,
        message: req.body.message
    }

    const users = await UserService.postUserRequestInformation(params)

    if (users === undefined || users.length === 0) {

        return res.status(404)

    }

    res.status(200).json(users)

}


export {
    postUserRequestInformation
}
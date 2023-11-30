/*
import { request, response } from 'express'
import { UserService, EmailService, NotificationService } from '../services/index.js'
*/

const { request, response } = require('express')
const { UserService, EmailService, NotificationService } = require('../services/index')

const postUserRequestInformation = async (req = request, res = response) => {

    const params = {
        documentTypeId: req.body.documentTypeId,
        document: req.body.document,
        businessName: req.body.businessName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        countryPhonecodeId: req.body.countryPhonecodeId,
        phoneNumber: req.body.phoneNumber,
        cityId: req.body.cityId,
        message: req.body.message
    }

    const users = await UserService.postUserRequestInformation(params)

    if (users === undefined || users.length === 0) {

        return res.status(404)

    }

    /*const email = users[0]?.email;

    const sender = await EmailService.sendEmail(email)*/

    const notification = await NotificationService.getDataNotificationEmail({
        p_notification_email_type_id: users[0]?.notification_email_type_id,
        p_data_id: users[0]?.user_information_request_id
    })

    const sender = await EmailService.sendEmail(notification[0])

    console.log(sender)

    if (!sender.messageId) {

        return res.status(404)

    }

    res.status(200).json(users)

}

/*
export {
    postUserRequestInformation
}
*/

module.exports = {
    postUserRequestInformation
}
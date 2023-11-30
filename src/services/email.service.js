//import nodemailer from 'nodemailer'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'mail.grupoinkillay.com',
    port: 465,
    secure: true,
    /*auth: {
        type: 'OAuth2',
        user: 'dragonclaw696@gmail.com',
        pass: '28081997slytherin',
        clientId: '556736648785-q2p94jld5feolo1vaoji2eeeu59og1rd.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04CQbVey5Ct0OCgYIARAAGAQSNwF-L9IroFUMKGzrY_5sv0sDgnim-71MhJNr_EaH0ladof7wrd5pCqaqChwwKCwSAlllmwGYa7M'
    }*/
    auth: {
        user: 'informes@grupoinkillay.com',
        pass: 'k(JHc~JN.59i'
        //user: 'hector.calero@grupoinkillay.com',
        //pass: '28081997Hc@'
    }
})

const mailOptions = (emailTo, subject, bodyEmail) => ({
    from: 'hector.calero@grupoinkillay.com',
    to: emailTo,
    subject: subject,
    html: bodyEmail
})

const sendEmail = async (data) => {

    try {

        const { subject, template, ...dataEmail } = data

        const dataEmailKeys = Object.keys(dataEmail)

        let subjectFilled = subject
        let templateFilled = template

        dataEmailKeys.forEach(key => {
            subjectFilled = subjectFilled.replaceAll(`{${key}}`, dataEmail[key])
        })

        dataEmailKeys.forEach(key => {
            templateFilled = templateFilled.replaceAll(`{{${key}}}`, dataEmail[key])
        })
        
        const emailResponse = await transporter.sendMail(mailOptions(dataEmail.email, subjectFilled, templateFilled))

        return emailResponse

    } catch (err) {
        
        console.log('Error email: 1', err)

        return err

    }


    /*transporter.sendMail(mailOptions(emailTo), function(err, data) {

        if (err) {
            console.log('Email error: ', err)
        } else {
            console.log('Email send successfull')
        }

    })*/

}

/*
export {
    sendEmail
}
*/

module.exports = {
    sendEmail
}
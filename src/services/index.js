/*
import * as UserService from './user.service.js'
import * as UitilityService from './utility.service.js'
import * as NotificationService from './notification.service.js'
import * as EmailService from './mail.service.js'
*/

const UserService = require('./user.service')
const UitilityService = require('./utility.service')
const NotificationService = require('./notification.service')
const EmailService = require('./email.service')

/*
export {
    UserService,
    UitilityService,
    NotificationService,
    EmailService
}
*/
module.exports = {
    UserService,
    UitilityService,
    NotificationService,
    EmailService
}
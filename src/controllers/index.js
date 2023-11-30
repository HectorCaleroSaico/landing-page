/*
import * as UserController from './user.controller.js'
import * as UtilityController from './utility.controller.js'

export {
    UserController,
    UtilityController
}
*/

const UserController = require('./user.controller')
const UtilityController = require('./utility.controller')

module.exports = {
    UserController,
    UtilityController
}
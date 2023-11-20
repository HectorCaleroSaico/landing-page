import DB from '../models/Database.js'
import { ApiError } from '../utils/index.js';

const db = new DB()

const getDataNotificationEmail = async (params) => {

    try {
        
        const { data } = await db.execute('sp_get_data_emails', params)

        return data

    } catch (error) {

        throw new ApiError(500, error)
        
    }

}

export {
    getDataNotificationEmail
}
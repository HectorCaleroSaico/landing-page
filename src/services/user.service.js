import DB from '../models/Database.js'
import { ApiError } from '../utils/index.js';

const db = new DB()

const postUserRequestInformation = async (params) => {

    try {
        
        const { data } = await db.execute('sp_set_user_information_requests', params)

        return data;

    } catch (error) {
        
        throw new ApiError(500, error)

    }

}

export {
    postUserRequestInformation
}
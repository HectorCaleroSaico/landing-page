import DB from '../models/Database.js'
import { ApiError } from '../utils/index.js';

const db = new DB()

const getDocumentTypes = async () => {

    try {
        
        const { data } = await db.execute('sp_get_document_types')

        return data

    } catch (error) {

        throw new ApiError(500, error)
        
    }

}

const getCountriesPhonecodes = async() => {

    try {
        
        const { data } = await db.execute('sp_get_countries_phonecodes')

        return data

    } catch (error) {

        throw new ApiError(500, error)
        
    }

}

const getCities = async() => {

    try {
        
        const { data } = await db.execute('sp_get_cities')

        return data

    } catch (error) {

        throw new ApiError(500, error)
        
    }

}

export {
    getDocumentTypes,
    getCountriesPhonecodes,
    getCities
}
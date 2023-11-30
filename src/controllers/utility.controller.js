/*
import { request, response } from 'express'
import { UitilityService } from '../services/index.js'
*/

const { request, response } = require('express')
const { UitilityService } = require('../services/index')

const getDocumentTypes = async (req = request, res = response) => {

    const documentsTypes = await UitilityService.getDocumentTypes()

    if (documentsTypes === undefined || documentsTypes.length === 0) {

        return res.status(404)

    }

    res.status(200).json(documentsTypes)

}

const getCountriesPhonecodes = async (req = request, res = response) => {

    const countriesPhoneCodes = await UitilityService.getCountriesPhonecodes()

    if (countriesPhoneCodes === undefined || countriesPhoneCodes.length === 0) {

        return res.status(404)

    }

    res.status(200).json(countriesPhoneCodes)

}

const getCities = async (req = request, res = response) => {

    const cities = await UitilityService.getCities()

    if (cities === undefined || cities.length === 0) {

        return res.status(404)

    }

    res.status(200).json(cities)

}

/*
export {
    getDocumentTypes,
    getCountriesPhonecodes,
    getCities
}
*/

module.exports = {
    getDocumentTypes,
    getCountriesPhonecodes,
    getCities
}
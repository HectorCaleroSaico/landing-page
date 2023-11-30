const express = require('express')
const { request, response } = require('express')
const routes = require('../routes/index')
const cors = require('cors')
const config = require('../../config')
const path = require('path')

/*import express, { request, response } from 'express'
import routes from '../routes/index.js'
import cors from 'cors'
import config from '../../config.js'
import path from 'path'
*/

class Server {

    constructor() {

        // Inicializa servidor.
        this.app = express()

        // Configura el puerto de salida del servicio.
        this.port = config.server.port

        // Ruta del proyecto
        this.__dirname =  config.server.__dirname

        // Configura los middlewares
        this.middlewares()

        // Enrutamiento del proyecto
        this.routes()

        // Servidor en lìnea
        //this.listen()

    }

    middlewares = () => {

        /*
        this.app.use(cors({
            origin: 'https://localhost:5173',
            credentials: true,
            optionsSuccessStatus: 200
        }))
        */

        this.app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }))

        // Lee solicitudes con un body en formato Json
        this.app.use(express.json())

        // Convierte 
        this.app.use(express.static(path.resolve(this.__dirname, 'client/dist')))

    }

    routes = () => {

        this.app.use('/api', routes)

        this.app.get('*', (req = request, res = response) => {
            res.sendFile(path.resolve(this.__dirname, 'client/dist', 'index.html'))
        })

    }

    listen = () => {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`)
            console.log(`Para acceder al aplicativo ingresar al siguiente enlace: http://localhost:${this.port}`)

        })

    }

}

//export default Server
module.exports = Server
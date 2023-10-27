import express, { request, response } from 'express'
import hbs from 'hbs'
import { URL } from 'url'

import config from '../config.js'

class Server {

    constructor() {

        // Inicializa servidor
        this.app = express()
        this.port = config.server.port

        // Inicializa handlebars
        this.hbs = hbs

        // Ruta del proyecto
        this.__dirname = config.server.__dirname

        // COnfigura los middlewares
        this.middlewares()

        // Enrutamiento del proyecto
        this.routes()

        // Servidor en lìnea
        //this.listen()

    }

    middlewares = () => {

        console.log(this.__dirname)

        // View Engine - Handlebars
        this.hbs.registerPartials(this.__dirname + 'views/partials', (err) => {
            console.log('<!-- Inicializando partials -->')
            if (err) console.log(err)
            console.log('<!-- Fin partials -->')
        })
        this.app.set('view engine', 'hbs')

        // View Engine - Handlebars Partials

        // Sirve contenido stàtico del directorio public
        //this.app.use(this.__dirname + '/public', express.static('public'))
        this.app.use('/public', express.static('public'))
        //this.app.use(express.static(path.resolve(__dirname, '../public')))

    }

    routes = () => {

        this.app.get('/', (req = request, res = response) => {

            res.render('home', {
                name: 'Hector Alcides Calero Saico',
                title: 'Landing Page de Grupo Inkillay'
            })
        
        })
        
        this.app.get('*', (req = request, res = response) => {
            
            res.render('404')
        
        })

    }

    listen = () => {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`)
            console.log(`Para acceder al aplicativo ingresar al siguiente enlace: http://localhost:${this.port}`)

        })

    }

}

export default Server
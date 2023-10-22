import express, { request, response } from 'express'
import hbs from 'hbs'
import { URL } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = new URL('.', import.meta.url).pathname

const app = express()

// Handlebars
app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + 'views/partials', (err) => {
    console.log(err)
})

// Servir contenido estàtico
app.use(express.static('public'))

app.get('/', (req = request, res = response) => {

    res.render('home', {
        name: 'Hector Alcides Calero Saico',
        title: 'Landing Page de Grupo Inkillay'
    })

})

app.get('*', (req = request, res = response) => {
    
    res.render('404')

})

app.listen(process.env.PORT, () => {
    console.log(`Aplicaciòn corriendo en el puerto ${process.env.PORT}`)
    console.log(`Para visitar la pàgina ingresar al siguiente enlace: http://localhost:${process.env.PORT}`)
})
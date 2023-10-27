import dotenv from 'dotenv'
import { URL } from 'url'

dotenv.config()

export default {
    server: {
        __dirname: new URL('.', import.meta.url).pathname,
        port: process.env.PORT
    },
    database: {
        name: '',
        host: ''
    }
}
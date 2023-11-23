import dotenv from 'dotenv'
import { URL } from 'url'
//import { fileURLToPath } from 'url'
//import path from 'path'

dotenv.config()

export default {
    server: {
       // __dirname: path.dirname(fileURLToPath(import.meta.url)),
       __dirname: new URL('.', import.meta.url).pathname,
        port: process.env.PORT
    },
    database: {
        hostname: process.env.HOSTNAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        databaseName: process.env.DATABASE,
        timeout: process.env.TIMEOUT
    }
}
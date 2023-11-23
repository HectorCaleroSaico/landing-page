import mysql2 from 'mysql2/promise.js'
import config from '../../config.js'

const configConnection = {
    host: config.database.hostname,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.databaseName,
    connectionLimit: 1000,
    //connectTimeout: 60 * 60 * 1000,
    connectTimeout: config.database.timeout,
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true
}

class DB {

    constructor() {
        this.config = configConnection
        //this.conn = dbConn
    }

    execute = async(storeProcedure, params) => {

        const conn = await mysql2.createConnection(this.config)

        try {

            if (!storeProcedure || storeProcedure.trim() === '') throw new Error('The Store Procedure is required and cannot be empty string')

            if (params && !(params instanceof Object)) throw new Error('The Params must be object')
            
            const [responseCollation, responseSQLMode] = await Promise.all([
                conn.execute(`SET collation_connection = 'utf8mb4_0900_ai_ci';`),
                conn.execute(`SET sql_mode = 'STRICT_TRANS_TABLES';`)
            ])
    
            if (responseCollation && responseSQLMode) {
                
                const paramsKeys = params ? Object.keys(params).map(value => '?') : []
                const paramsValues = params ? Object.values(params) : []
                const sqlCommand = `CALL ${storeProcedure}(${paramsKeys.join()});`

                const [rows, fields] = await conn.execute(sqlCommand, paramsValues);
                await conn.end();
                
                console.log(`<---------------------- DATA ---------------------->`);
                console.log({
                    data: rows[0] ? rows[0] : [],
                    rowsAffected: rows[0] ? rows[0].length : 0
                });
                console.log(`<---------------------- DATA ---------------------->`);
                
                return {
                    data: rows[0] ? rows[0] : [],
                    rowsAffected: rows[0] ? rows[0].length : 0
                };
    
            }

            await conn.end()
        
            return {
                responseCollation,
                responseSQLMode
            }

        } catch (error) {

            console.log(error)
            console.log('<---------------------- ERROR ---------------------->')
            console.log({
                errno: error?.errno,
                sql: error?.sql,
                sqlState: error?.sqlState,
                sqlMessage: error?.sqlMessage
            })
            console.log('<---------------------- ERROR ---------------------->')
            
            return {
                data: [],
                rowsAffected: 0,
                error: error?.sqlMessage
                
            }

        }

    }

}

export default DB
import mysql2 from 'mysql2'
import config from '../../config.js'

class DB {

    constructor(config) {
        this.conn = mysql2.createConnection(config)
    }

    execute = async(storeProcedure, params) => {

        try {

            if (!storeProcedure || storeProcedure.trim() === '') throw new Error('The Store Procedure is required and cannot be empty string')

            if (!params || !(params instanceof Object)) throw new Error('The Params must be object')
            
            const [responseCollation, responseSQLMode] = await Promise.all(
                this.conn.execute(`SET collation_connection = 'utf8mb4_0900_ai_ci';`),
                this.conn.execute(`SET sql_mode = 'STRICT_TRANS_TABLES';`)
            )
    
            if (responseCollation && responseSQLMode) {
                
                const paramsKeys = params ? Object.keys(params).map(value => '?') : []
                const paramsValues = params ? Object.values(params) : []
                const sqlCommand = `CALL ${spName}(${paramsKeys.join()});`

                const [rows, fields] = await conn.execute(sqlCommand, paramsValues);
                await this.conn.end();
                
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

            await this.conn.end()
        
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


const connectDB = () => {

    const configConnection = {
        host: config.database.hostname,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: 'main',
        connectionLimit: 1000,
        //connectTimeout: 60 * 60 * 1000,
        connectTimeout: config.database.timeout,
        supportBigNumbers: true,
        bigNumberStrings: true,
        decimalNumbers: true
    };

    const db = new DB(configConnection)

    return db

}

export default connectDB()
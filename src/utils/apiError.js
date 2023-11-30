class ApiError extends Error {

    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message)
        this.statusCode = statusCode,
        this.isOperational = isOperational,
        this.sqlError = message.Error || message.error || message.sqlError || '',
        this.sqlMessage = message.sqlMessage || '';
        this.sql = message.sql || '';

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

}

//export default ApiError

module.exports = ApiError
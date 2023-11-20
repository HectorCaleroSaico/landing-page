import {request, response} from 'express'

const validate = (objectSchema) => (req = request, res = response, next) => {

    const objectKeys = Object.keys(objectSchema)

    let errorCount = 0

    const validateResults = objectKeys.map((key) => {

        const { value, error } = objectSchema[key].validate(req[key], { abortEarly: false })

        if (!error) return [key, { value }]

        const errors = error.details.map(({ message, context }) => {

            const { key, label, value } = context

            errorCount += 1

            return {
                key,
                label,
                value,
                message
            }

        })

        return [
            key,
            { errors }
        ]

    })

    if (errorCount === 0) return next()

    res.status(400).json(Object.fromEntries(validateResults))

}

export default validate
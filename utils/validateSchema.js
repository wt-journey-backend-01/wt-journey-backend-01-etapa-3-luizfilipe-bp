const z = require('zod');
const ApiError = require('./ApiError');

function validateSchema(schema) {
    return (req, res, next) => {
        const data = req.body;
        const results = schema.safeParse(data);
        console.log(results);

        if (!results.success) {
            const issues = results.error.issues;
            const errors = {};

            for (const issue of issues) {
                if (issue.path[0] != errors.key) {
                    const field = issue.path[0];
                    if (!errors[field]) {
                        errors[field] = issue.message;
                    }
                }
            }

            return next(new ApiError(400, 'Parâmetros inválidos', errors));
        }

        req.body = results.data;
        next();
    };
}

module.exports = {
    validateSchema,
};

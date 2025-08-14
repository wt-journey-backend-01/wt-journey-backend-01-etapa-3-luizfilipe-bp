const ApiError = require('./ApiError');
function validateIDParam(req, res, next) {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return next(
            new ApiError(400, 'Parâmetros inválidos', {
                id: 'O parâmetro ID deve ser um número inteiro',
            })
        );
    }
    next();
}

module.exports = validateIDParam;

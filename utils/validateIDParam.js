function validateIDParam(req, res, next) {
    const id = req.params.id;
    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: 'O parâmetro ID deve ser um número inteiro' });
    }
    next();
}

module.exports = validateIDParam;

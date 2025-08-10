function validateIDParam(req, res, next) {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(404).json({ message: 'O parâmetro ID deve ser um número inteiro' });
    }
    next();
}

module.exports = validateIDParam;

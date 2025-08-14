const casosRepository = require('../repositories/casosRepository');
const agentesController = require('../controllers/agentesController');
const ApiError = require('../utils/ApiError');

async function getCasoOrThrowApiError(id) {
    const caso = await casosRepository.findById(id);
    if (!caso) {
        throw new ApiError(404, `Não foi possível encontrar o caso de Id: ${id}.`);
    }
    return caso;
}

async function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    if (status) {
        if (!['aberto', 'solucionado'].includes(status)) {
            throw new ApiError(400, "O status deve ser 'aberto' ou 'solucionado'.");
        }
    }

    const filtros = {};
    if (status) filtros.status = status;
    if (agente_id) filtros.agente_id = agente_id;
    const casos = await casosRepository.findAll(filtros);

    if (status) {
        if (casos.length === 0) {
            throw new ApiError(404, `Não foi possível encontrar casos com o status: ${status}.`);
        }
    }

    if (agente_id) {
        if (casos.length === 0) {
            throw new ApiError(404, `Nenhum caso foi encontrado para o agente de Id: ${agente_id}`);
        }
    }
    res.status(200).json(casos);
}

async function getCasoById(req, res) {
    const id = req.params.id;
    const caso = await getCasoOrThrowApiError(id);
    res.status(200).json(caso);
}

async function getAgenteByCaso(req, res) {
    const caso_id = req.params.id;
    const caso = await getCasoOrThrowApiError(caso_id);
    const agente = await agentesController.getAgenteOrThrowApiError(caso.agente_id);

    res.status(200).json(agente);
}

async function searchCasos(req, res) {
    const search = req.query.q;
    if (!search || search.trim() === '') {
        throw new ApiError(404, "Parâmetro de pesquisa 'q' não encontrado");
    }

    const searchedCasos = await casosRepository.search(search.trim());

    if (searchedCasos.length === 0) {
        throw new ApiError(
            404,
            `Não foi possível encontrar casos que correspondam à pesquisa: ${search}.`
        );
    }
    res.status(200).send(searchedCasos);
}

async function postCaso(req, res) {
    const caso = req.body;
    await agentesController.getAgenteOrThrowApiError(caso.agente_id);
    const createdCaso = await casosRepository.create(caso);
    res.status(201).json(createdCaso);
}

async function updateCaso(req, res) {
    const id = req.params.id;
    const caso = req.body;
    await getCasoOrThrowApiError(id);
    await agentesController.getAgenteOrThrowApiError(caso.agente_id);

    const updatedCaso = await casosRepository.update(id, caso);
    res.status(200).json(updatedCaso);
}

async function patchCaso(req, res) {
    const id = req.params.id;
    await getCasoOrThrowApiError(id);

    const caso = req.body;
    if (Object.keys(caso).length === 0) {
        throw new ApiError(
            400,
            'Pelo menos um dos campos titulo, descricao, status ou agente_id deve ser fornecido para atualizar um caso.'
        );
    }
    if (caso.agente_id) {
        await agentesController.getAgenteOrThrowApiError(caso.agente_id);
    }

    const patchedCaso = await casosRepository.update(id, caso);
    res.status(200).json(patchedCaso);
}

async function deleteCaso(req, res) {
    const id = req.params.id;
    await getCasoOrThrowApiError(id);
    await casosRepository.remove(id);
    res.status(204).send();
}

module.exports = {
    getAllCasos,
    getCasoById,
    postCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    getAgenteByCaso,
    searchCasos,
};

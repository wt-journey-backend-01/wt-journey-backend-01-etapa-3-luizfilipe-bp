const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

async function getAllCasos(req, res) {
    const agente_id = req.query.agente_id;
    const status = req.query.status;

    if (status) {
        if (!['aberto', 'solucionado'].includes(status)) {
            return res.status(400).json({
                message: 'O status deve ser "aberto" ou "solucionado".',
            });
        }
    }

    const filtros = {};
    if (status) filtros.status = status;
    if (agente_id) filtros.agente_id = agente_id;
    const casos = await casosRepository.findAll(filtros);

    if (casos.length === 0) {
        return res.status(404).json({
            message: `Não foi possível encontrar casos com o status: ${status}.`,
        });
    }

    if (agente_id) {
        if (casos.length === 0) {
            return res.status(404).json({
                message: `Nenhum caso foi encontrado para o agente de Id: ${agente_id}`,
            });
        }
    }
    res.status(200).json(casos);
}

async function getCasoById(req, res) {
    const id = req.params.id;
    const caso = await casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }
    res.status(200).json(caso);
}

async function getAgenteByCaso(req, res) {
    const caso_id = req.params.id;
    const caso = await casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${caso_id}.`,
        });
    }
    const agente = await agentesRepository.findById(caso.agente_id);
    if (!agente) {
        return res.status(404).json({
            message: `O caso de Id: ${caso_id} não possui um agente associado a ele.`,
        });
    }
    res.status(200).json(agente);
}

async function searchCasos(req, res) {
    const search = req.query.q?.trim().toLowerCase();
    if (!search) {
        return res.status(404).json({ message: "Parâmetro de pesquisa 'q' não encontrado" });
    }

    const searchedCasos = await casosRepository.search(search);

    if (!searchedCasos || searchedCasos.length === 0) {
        return res.status(404).json({
            message: `Não foi possível encontrar casos que correspondam à pesquisa: ${search}.`,
        });
    }
    res.status(200).send(searchedCasos);
}

async function postCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({
            message:
                'Os campos titulo, descricao, status e agente_id são obrigatórios para adicionar um novo caso.',
        });
    }
    if (!['aberto', 'solucionado'].includes(status)) {
        return res.status(400).json({
            message: "O status de um caso deve ser 'aberto' ou 'solucionado'.",
        });
    }

    if (!(await agentesRepository.findById(agente_id))) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
    }

    const newCasoData = {
        titulo,
        descricao,
        status,
        agente_id,
    };
    const createdCaso = await casosRepository.create(newCasoData);
    res.status(201).json(createdCaso);
}

async function updateCaso(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({
            message:
                'Os campos titulo, descricao, status e agente_id são obrigatórios para atualizar um caso.',
        });
    }

    if (!(await casosRepository.findById(id))) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }

    if (!(await agentesRepository.findById(agente_id))) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
    }

    if (!['aberto', 'solucionado'].includes(status)) {
        return res.status(400).json({
            message: "O status de um caso deve ser 'aberto' ou 'solucionado'.",
        });
    }

    const updatedCasoData = {
        titulo,
        descricao,
        status,
        agente_id,
    };
    const updatedCaso = await casosRepository.update(id, updatedCasoData);
    console.log(updatedCaso);
    res.status(200).json(updatedCaso);
}

async function patchCaso(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo && !descricao && !status && !agente_id) {
        return res.status(400).json({
            message:
                'Pelo menos um dos campos titulo, descricao, status ou agente_id deve ser fornecido para atualizar um caso.',
        });
    }

    const caso = await casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }

    if (agente_id !== undefined && !(await agentesRepository.findById(agente_id))) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${agente_id}.`,
        });
    }

    if (status !== undefined && !['aberto', 'solucionado'].includes(status)) {
        return res.status(400).json({
            message: "O status de um caso deve ser 'aberto' ou 'solucionado'.",
        });
    }

    const patchedCasoData = {
        titulo: titulo ?? caso.titulo,
        descricao: descricao ?? caso.descricao,
        status: status ?? caso.status,
        agente_id: agente_id ?? caso.agente_id,
    };
    const patchedCaso = await casosRepository.update(id, patchedCasoData);
    res.status(200).json(patchedCaso);
}

async function deleteCaso(req, res) {
    const id = req.params.id;
    const caso = await casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({
            message: `Não foi possível encontrar o caso de Id: ${id}.`,
        });
    }

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

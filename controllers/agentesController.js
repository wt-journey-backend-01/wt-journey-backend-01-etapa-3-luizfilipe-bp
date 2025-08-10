const agentesRepository = require('../repositories/agentesRepository');
const casosRepository = require('../repositories/casosRepository');
function dateFormatIsValid(dateString) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

async function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;
    if (sort && !['dataDeIncorporacao', '-dataDeIncorporacao'].includes(sort)) {
        return res.status(400).json({
            message: "O parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'.",
        });
    }
    const filtros = {};
    if (cargo) filtros.cargo = cargo;
    if (sort) filtros.sort = sort;
    const agentes = await agentesRepository.findAll(filtros);

    if (cargo) {
        if (agentes.length === 0) {
            return res.status(404).json({
                message: `Não foi possível encontrar agentes com o cargo: ${cargo}.`,
            });
        }
    }
    res.status(200).json(agentes);
}

async function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }
    res.status(200).json(agente);
}

async function getCasosByAgente(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }
    const casos = await casosRepository.findByAgenteId(id);
    if (!casos || casos.length === 0) {
        return res.status(404).json({
            message: `Nenhum caso foi encontrado para o agente de Id: ${id}.`,
        });
    }
    res.status(200).json(casos);
}

async function postAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            message:
                'Os campos nome, dataDeIncorporacao e cargo são obrigatórios para adicionar um agente.',
        });
    }

    if (!dateFormatIsValid(dataDeIncorporacao)) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
        });
    }
    const data = new Date(dataDeIncorporacao);
    if (isNaN(data.getTime())) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
        });
    }
    if (data > new Date()) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
        });
    }

    const newAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };

    const createdAgente = await agentesRepository.create(newAgenteData);
    res.status(201).json(createdAgente);
}

async function putAgente(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            message:
                'Os campos nome, dataDeIncorporacao e cargo são obrigatórios para atualizar um agente.',
        });
    }

    if (!dateFormatIsValid(dataDeIncorporacao)) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
        });
    }
    const data = new Date(dataDeIncorporacao);
    if (isNaN(data.getTime())) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
        });
    }
    if (new Date(dataDeIncorporacao) > new Date()) {
        return res.status(400).json({
            message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
        });
    }

    const updatedAgenteData = {
        nome,
        dataDeIncorporacao,
        cargo,
    };
    const updatedAgente = await agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

async function patchAgente(req, res) {
    if ('id' in req.body) {
        return res.status(400).json({
            message: "O campo 'id' não pode ser atualizado.",
        });
    }

    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (nome === undefined && dataDeIncorporacao === undefined && cargo === undefined) {
        return res.status(400).json({
            message: 'Deve haver pelo menos um campo para realizar a atualização de agente',
        });
    }

    if (dataDeIncorporacao !== undefined) {
        if (!dateFormatIsValid(dataDeIncorporacao)) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' deve estar no formato 'YYYY-MM-DD'.",
            });
        }
        const data = new Date(dataDeIncorporacao);
        if (isNaN(data.getTime())) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' deve ser uma data válida.",
            });
        }
        if (new Date(dataDeIncorporacao) > new Date()) {
            return res.status(400).json({
                message: "O campo 'dataDeIncorporacao' não pode ser uma data futura.",
            });
        }
    }

    const updatedAgenteData = {
        nome: nome ?? agente.nome,
        dataDeIncorporacao: dataDeIncorporacao ?? agente.dataDeIncorporacao,
        cargo: cargo ?? agente.cargo,
    };

    const updatedAgente = await agentesRepository.update(id, updatedAgenteData);
    res.status(200).json(updatedAgente);
}

async function deleteAgente(req, res) {
    const id = req.params.id;
    const agente = await agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({
            message: `Não foi possível encontrar o agente de Id: ${id}.`,
        });
    }

    await agentesRepository.remove(id);
    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    getCasosByAgente,
    postAgente,
    putAgente,
    patchAgente,
    deleteAgente,
};

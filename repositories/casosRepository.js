const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function findAll(filters = {}) {
    try {
        const casos = db('casos');
        if (filters.agente_id) {
            casos.where({ agente_id: filters.agente_id });
        }
        if (filters.status) {
            casos.where({ status: filters.status });
        }
        return await casos;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível buscar os casos.');
    }
}

async function findById(id) {
    try {
        const caso = await db('casos').where({ id: id }).first();
        return caso;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar o caso por Id');
    }
}

async function findByAgenteId(agente_id) {
    try {
        const [casos] = await db('casos').where({ agente_id: agente_id });
        if (!casos) {
            return null;
        }
        return casos;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar os casos por agente Id');
    }
}

async function create(caso) {
    try {
        const [createdCaso] = await db('casos').insert(caso, ['*']);
        return createdCaso;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível criar o caso');
    }
}

async function update(id, updatedCasoData) {
    try {
        const [updatedCaso] = await db('casos').where({ id: id }).update(updatedCasoData, ['*']);
        if (!updatedCaso) {
            return null;
        }
        return updatedCaso;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível atualizar o caso');
    }
}

async function remove(id) {
    try {
        const deletedCaso = await db('casos').where({ id: id }).del();
        return deletedCaso > 0;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível deletar o caso');
    }
}

async function search(q) {
    return await db('casos').where(function () {
        this.whereILike('titulo', `%${q}%`).orWhereILike('descricao', `%${q}%`);
    });
}

module.exports = {
    findAll,
    findById,
    findByAgenteId,
    create,
    update,
    remove,
    search,
};

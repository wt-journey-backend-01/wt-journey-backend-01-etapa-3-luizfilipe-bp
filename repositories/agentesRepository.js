const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function findAll(filters) {
    try {
        const query = db('agentes');
        if (filters.cargo) {
            query.where('cargo', filters.cargo);
        }

        if (filters.sort === 'dataDeIncorporacao') {
            query.orderBy('dataDeIncorporacao', 'asc');
        } else if (filters.sort === '-dataDeIncorporacao') {
            query.orderBy('dataDeIncorporacao', 'desc');
        }

        const agentes = await query;

        return agentes.map((agente) => ({
            ...agente,
            dataDeIncorporacao: agente.dataDeIncorporacao.toISOString().split('T')[0],
        }));
    } catch (err) {
        throw new ApiError(500, 'Não foi possivel buscar agentes');
    }
}

async function findById(id) {
    try {
        const agente = await db('agentes').where({ id: id }).first();
        if (!agente) {
            return null;
        }
        return {
            ...agente,
            dataDeIncorporacao: agente.dataDeIncorporacao.toISOString().split('T')[0],
        };
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar agente por Id');
    }
}

async function create(agente) {
    try {
        const [createdAgente] = await db('agentes').insert(agente, ['*']);
        return {
            ...createdAgente,
            dataDeIncorporacao: createdAgente.dataDeIncorporacao.toISOString().split('T')[0],
        };
    } catch (err) {
        throw new ApiError(500, 'Não foi possível criar agente');
    }
}

async function update(id, updatedAgenteData) {
    try {
        const [updatedAgente] = await db('agentes')
            .where({ id: id })
            .update(updatedAgenteData, ['*']);

        if (!updatedAgente) {
            return null;
        }
        return {
            ...updatedAgente,
            dataDeIncorporacao: updatedAgente.dataDeIncorporacao.toISOString().split('T')[0],
        };
    } catch (err) {
        throw new ApiError(500, 'Não foi possível atualizar agente');
    }
}

async function remove(id) {
    try {
        const deleted = await db('agentes').where({ id: id }).del();
        return deleted > 0;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível remover agente');
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};

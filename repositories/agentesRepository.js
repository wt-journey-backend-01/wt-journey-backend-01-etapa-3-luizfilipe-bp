const db = require('../db/db');

async function findAll(filters = {}, sort) {
    try {
        const query = db('agentes').select(
            '*',
            db.raw('to_char("dataDeIncorporacao", \'YYYY-MM-DD\') as "dataDeIncorporacao"')
        );
        if (filters.cargo) {
            query.where('cargo', filters.cargo);
        }
        if (sort) {
            const direction = sort.startsWith('-') ? 'desc' : 'asc';
            const column = sort.replace('-', '');
            query.orderBy(column, direction);
        }
        return await query;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findById(id) {
    try {
        const agente = await db('agentes')
            .select(
                '*',
                db.raw('to_char("dataDeIncorporacao", \'YYYY-MM-DD\') as "dataDeIncorporacao"')
            )
            .where({ id })
            .first();

        return agente ? agente : false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function create(agente) {
    try {
        const [createdAgente] = await db('agentes').insert(agente, ['*']);
        if (!createdAgente) {
            return false;
        }
        return {
            ...createdAgente,
            dataDeIncorporacao: createdAgente.dataDeIncorporacao.toISOString().split('T')[0],
        };
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function update(id, updatedAgenteData) {
    try {
        const updatedAgente = await db('agentes')
            .where({ id: id })
            .update(updatedAgenteData, ['*']);
        if (!updatedAgente || updatedAgente.length === 0) {
            return false;
        }
        return {
            ...updatedAgente[0],
            dataDeIncorporacao: updatedAgente[0].dataDeIncorporacao.toISOString().split('T')[0],
        };
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function remove(id) {
    try {
        const deleted = await db('agentes').where({ id: id }).del();
        return !deleted ? false : true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};

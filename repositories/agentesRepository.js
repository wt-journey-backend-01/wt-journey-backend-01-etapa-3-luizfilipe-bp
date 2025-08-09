const db = require('../db/db');

async function findAll() {
    try {
        return await db('agentes');
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findById(id) {
    try {
        const agente = await db('agentes').where({ id: id }).first();
        return agente ? agente : false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function create(agente) {
    try {
        const [created] = await db('agentes').insert(agente, ['*']);
        return created;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function update(id, updatedAgenteData) {
    try {
        const updated = await db('agentes').where({ id: id }).update(updatedAgenteData, ['*']);
        return !updated || updated.length === 0 ? false : updated[0];
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

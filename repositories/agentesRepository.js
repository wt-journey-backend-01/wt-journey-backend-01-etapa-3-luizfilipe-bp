const db = require('../db/db');

async function findAll() {
    try {
        const agentes = await db('agentes');
        return !agentes ? false : agentes;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findById(id) {
    try {
        const agente = await db('agentes').where({ id: id });
        console.log(agente);
        return !agente ? false : agente[0];
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
        return !updated ? false : updated[0];
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

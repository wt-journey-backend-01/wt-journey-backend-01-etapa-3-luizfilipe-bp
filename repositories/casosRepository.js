const db = require('../db/db');

async function findAll() {
    try {
        return await db('casos');
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findById(id) {
    try {
        const caso = await db('casos').where({ id: id }).first();
        return caso ? caso : false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findByAgenteId(agente_id) {
    try {
        const casos = await db('casos').where({ agente_id: agente_id });
        return !casos || casos.length === 0 ? false : casos;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function create(caso) {
    try {
        const [createdCaso] = await db('casos').insert(caso, ['*']);
        return createdCaso;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function update(id, updatedCasoData) {
    try {
        const updatedCaso = await db('casos').where({ id: id }).update(updatedCasoData, ['*']);
        return !updatedCaso || updatedCaso.length === 0 ? false : updatedCaso[0];
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function remove(id) {
    try {
        const deletedCaso = await db('casos').where({ id: id }).del();
        return !deletedCaso ? false : true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    findAll,
    findById,
    findByAgenteId,
    create,
    update,
    remove,
};

const db = require('../db/db');

async function findAll() {
    try {
        const casos = await db('casos');
        return !casos ? false : casos;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findById(id) {
    try {
        const caso = await db('casos').where({ id: id });
        return !caso ? false : caso[0];
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
        return !updatedCaso ? false : updatedCaso[0];
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function remove(id) {
    try {
        const deleted = await db('casos').where({ id: id }).del();
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('agentes').del();
    await knex('agentes').insert([
        {
            nome: 'Rommel Carneiro',
            dataDeIncorporacao: '1992-10-04',
            cargo: 'delegado',
        },
        {
            nome: 'Carlos Mendes',
            dataDeIncorporacao: '2010-01-22',
            cargo: 'inspetor',
        },
        {
            nome: 'Luciana Farias',
            dataDeIncorporacao: '2005-06-17',
            cargo: 'inspetor',
        },
        {
            nome: 'Luiz Filipe',
            dataDeIncorporacao: '2018-03-30',
            cargo: 'agente',
        },
    ]);
};

const { z } = require('zod');
const baseCasoSchema = z.object({
    titulo: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo título é obrigatório'
                    : 'O campo título deve ser uma string',
        })
        .min(1, 'O campo título é obrigatório'),
    descricao: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo descrição é obrigatório'
                    : 'O campo descrição deve ser uma string',
        })
        .min(1, 'O campo descrição é obrigatório'),
    status: z.enum(['aberto', 'solucionado'], {
        error: (issue) =>
            issue.input === undefined
                ? 'O campo status é obrigatório'
                : "O campo status deve ser 'aberto' ou 'solucionado'",
    }),

    agente_id: z
        .int({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo agente_id é obrigatório'
                    : 'O campo agente_id deve ser um número inteiro',
        })
        .positive('O campo agente_id deve ser positivo'),
});

const postCasoSchema = baseCasoSchema.strict();
const putCasoSchema = baseCasoSchema.strict();
const patchCasoSchema = baseCasoSchema.strict().partial();

module.exports = {
    postCasoSchema,
    putCasoSchema,
    patchCasoSchema,
};

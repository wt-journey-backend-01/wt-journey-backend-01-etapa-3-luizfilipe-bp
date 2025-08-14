const { z } = require('zod');
const baseAgenteSchema = z.object({
    nome: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo nome é obrigatório'
                    : 'O campo nome deve ser uma string',
        })
        .min(1, 'O campo nome é obrigatório'),
    dataDeIncorporacao: z
        .string('O campo dataDeIncorporacao é obrigatório')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'O campo dataDeIncorporacao deve estar no formato YYYY-MM-DD')
        .refine(
            (date) => {
                const parsed = new Date(date);
                return !isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
            },
            { error: 'O campo dataDeIncorporacao deve ser uma data válida' }
        )
        .refine(
            (dataValida) => {
                const today = new Date();
                const date = new Date(dataValida);
                return date <= today;
            },
            { error: 'A data de incorporação não pode ser futura' }
        ),
    cargo: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo cargo é obrigatório'
                    : 'O campo cargo deve ser uma string',
        })
        .min(1, 'O campo cargo é obrigatório'),
});

const postAgenteSchema = baseAgenteSchema.strict();
const putAgenteSchema = baseAgenteSchema.strict();
const patchAgenteSchema = baseAgenteSchema.strict().partial();

module.exports = {
    postAgenteSchema,
    putAgenteSchema,
    patchAgenteSchema,
};

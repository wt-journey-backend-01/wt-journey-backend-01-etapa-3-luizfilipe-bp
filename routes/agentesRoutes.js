const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const validateIDParam = require('../utils/validateIDParam');
const { validateSchema } = require('../utils/validateSchema');
const { postAgenteSchema, putAgenteSchema, patchAgenteSchema } = require('../utils/agentesSchema');

router.get('/:id/casos', validateIDParam, agentesController.getCasosByAgente);
router.get('/', agentesController.getAllAgentes);
router.get('/:id', validateIDParam, agentesController.getAgenteById);
router.post('/', validateSchema(postAgenteSchema), agentesController.postAgente);
router.put('/:id', validateIDParam, validateSchema(putAgenteSchema), agentesController.putAgente);
router.patch(
    '/:id',
    validateIDParam,
    validateSchema(patchAgenteSchema),
    agentesController.patchAgente
);
router.delete('/:id', validateIDParam, agentesController.deleteAgente);

module.exports = router;

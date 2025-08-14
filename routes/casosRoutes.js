const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateIDParam = require('../utils/validateIDParam');
const { validateSchema } = require('../utils/validateSchema');
const { postCasoSchema, putCasoSchema, patchCasoSchema } = require('../utils/casosSchema');

router.get('/search', casosController.searchCasos);
router.get('/:id/agente', validateIDParam, casosController.getAgenteByCaso);
router.get('/', casosController.getAllCasos);
router.get('/:id', validateIDParam, casosController.getCasoById);
router.post('/', validateSchema(postCasoSchema), casosController.postCaso);
router.put('/:id', validateIDParam, validateSchema(putCasoSchema), casosController.updateCaso);
router.patch('/:id', validateIDParam, validateSchema(patchCasoSchema), casosController.patchCaso);
router.delete('/:id', validateIDParam, casosController.deleteCaso);

module.exports = router;

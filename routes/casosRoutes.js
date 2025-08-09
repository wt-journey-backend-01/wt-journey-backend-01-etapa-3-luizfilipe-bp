const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const validateIDParam = require('../utils/validateIDParam');

router.get('/search', casosController.searchCasos);
router.get('/:id/agente', validateIDParam, casosController.getAgenteByCaso);
router.get('/', casosController.getAllCasos);
router.get('/:id', validateIDParam, casosController.getCasoById);
router.post('/', casosController.postCaso);
router.put('/:id', validateIDParam, casosController.updateCaso);
router.patch('/:id', validateIDParam, casosController.patchCaso);
router.delete('/:id', validateIDParam, casosController.deleteCaso);

module.exports = router;

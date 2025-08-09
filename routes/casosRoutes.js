const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/search', casosController.searchCasos);
router.get('/:id/agente', casosController.getAgenteByCaso);
router.get('/', casosController.getAllCasos);
router.get('/:id', casosController.getCasoById);
router.post('/', casosController.postCaso);
router.put('/:id', casosController.updateCaso);
router.patch('/:id', casosController.patchCaso);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;

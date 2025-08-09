const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const validateIDParam = require('../utils/validateIDParam');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', validateIDParam, agentesController.getAgenteById);
router.post('/', agentesController.postAgente);
router.put('/:id', validateIDParam, agentesController.putAgente);
router.patch('/:id', validateIDParam, agentesController.patchAgente);
router.delete('/:id', validateIDParam, agentesController.deleteAgente);

module.exports = router;

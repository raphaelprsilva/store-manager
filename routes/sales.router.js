const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/:id', salesController.update);

module.exports = router;

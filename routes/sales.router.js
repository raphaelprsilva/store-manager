const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.getAll);

module.exports = router;

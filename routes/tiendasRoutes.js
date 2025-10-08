// routes/tiendasRoutes.js
const express = require('express');
const router = express.Router();
const tiendasController = require('../controllers/tiendasController');

router.get('/', tiendasController.getAllTiendas);

module.exports = router;

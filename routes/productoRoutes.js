const express = require('express')
const router = express.Router()

const productoController = require('../controllers/productoController')

// Crear producto
router.post('/', productoController.crearProducto)

// Obtener todos los productos
router.get('/', productoController.obtenerProductos)

// Obtener producto por ID (nota el ':id')
router.get('/:id', productoController.obtenerProductosPorId)

router.put('/:id', productoController.actualizarProducto)

router.delete('/:id', productoController.eliminarProducto)

module.exports = router

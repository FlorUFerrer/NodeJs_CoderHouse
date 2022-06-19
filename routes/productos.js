const { Router } = require('express');

// Inicializo el Router
const router = Router();

// Métodos del controlador
const { productosGet, productoPost, productosGetById, productoUpdate, productoDelete } = require('../controllers/productos');

// Rutas
router.get( '/', productosGet ); // Trae todos los productos
router.get('/:id', productosGetById ); // Trae producto por ID
router.post( '/', productoPost ); // Guarda un producto (Predefinido en el método)
router.put('/:id', productoUpdate); // Actualiza el producto por ID
router.delete('/:id', productoDelete); // Elimino el producto por ID

module.exports = router;
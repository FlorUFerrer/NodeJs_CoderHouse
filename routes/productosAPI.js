require('dotenv').config();
const express = require('express');
const router = express.Router();
const Contenedor = require('../Contenedor');

const contenedor = new Contenedor('productos');
const isAdmin = process.env.ADMIN === "true";

router.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    res.json({
        productos
    })
})

router.get('/:id', async(req, res) => {
    if(typeof await contenedor.getById(req.params.id) == 'string'){
        return res.json({
            error: 'producto no encontrado'
        })
    }
    const productos = await contenedor.getAll();
    const productoSeleccionado = productos.filter(producto => producto.id == req.params.id);
    return res.json( {
        producto: productoSeleccionado
    });
})

router.post('/', async(req, res) => {
    if(!isAdmin) {
        return res.json({
            error: -1,
            descripcion: 'Perfil no autorizado'
        })
    }
    const productoIngresado = req.body;
    const productoGuardado = await contenedor.save(productoIngresado);
    return res.json({
        producto: productoGuardado
    })
})

router.put('/:id', async(req, res) => {
    if(!isAdmin) {
        return res.json({
            error: -1,
            descripcion: 'Perfil no autorizado'
        })
    }
    if(typeof await contenedor.getById(req.params.id) == 'string'){
        return res.json({
            error: 'producto no encontrado'
        })
    }
    const productoModificado = req.body;
    const productoAModificarId = req.params.id;
    const productoGuardado = await contenedor.updateById(productoModificado, productoAModificarId);
    res.json({
        producto: productoGuardado
    })
})

router.delete('/:id', async(req, res) => {
    if(!isAdmin) {
        return res.json({
            error: -1,
            descripcion: 'Perfil no autorizado'
        })
    }
    if(typeof await contenedor.getById(req.params.id) == 'string'){
        return res.json({
            error: 'producto no encontrado'
        })
    }
    const productoAEliminarId = req.params.id;
    await contenedor.deleteById(productoAEliminarId);
    res.json({
        msg: "Producto Eliminado"
    })
})

module.exports = router;
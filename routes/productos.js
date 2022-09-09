const express = require('express');
const router = express.Router();
const Contenedor = require('../Contenedor');

const contenedor = new Contenedor('productos');

router.get('/', async(req, res) => {
    const productosList = await contenedor.getAll();
    res.render('productoList',{
        productosList
    })
})

router.get('/form', async(req, res) => {
    res.render('productoForm');
})

router.post('/', async(req, res) => {
    await contenedor.save(req.body);
    res.render('productoForm');
})

module.exports = router;
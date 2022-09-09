const express = require('express');
const router = express.Router();

router.all('/', (req,res) => {
    res.json({
        error: 'Ruta no implementada'
    })
})

module.exports = router;
const { response, request } = require('express');
const fs = require('fs');

const db = './db/productos.txt';
const utf = 'utf-8'

const productosGet = async(req = request, res = response) => {

    const productos  = JSON.parse(fs.readFileSync(db, utf));

    res.json({
        productos
    });

}

const productosGetById = async(req = request, res = response) => {

    const productos  = JSON.parse(fs.readFileSync(db, utf));
    let productoEncontrado = productos.find(producto => producto.id === parseInt(req.params.id));

    if( !productoEncontrado ){
        
        return res.status(400).json({
            error : 'producto no encontrado'
        });

    }

    res.json({
        producto : productoEncontrado
    });

}

const productoPost = async(req = request, res = response) => {

    const { title, price, thumbnail } = req.body;
    const productos = JSON.parse(fs.readFileSync(db, utf));

    const productoNuevo = {
        id : parseInt(productos[productos.length - 1].id) + 1,
        title,
        price,
        thumbnail
    }

    productos.push(productoNuevo);

    fs.writeFileSync(db, JSON.stringify(productos) ,utf);

    res.json({
        productoNuevo
    });

}

const productoUpdate = async(req = request, res = response) => {

    // Leo la DB
    const productos = JSON.parse(fs.readFileSync(db, utf));

    // Leo el id del params
    const idProductoToModify = parseInt(req.params.id); 

    // Encuentro el producto que quiero modificar
    const productoToModify = productos.find(producto => producto.id === idProductoToModify);
    
    if( !productoToModify ){

        return res.status(400).json({
            error : 'producto no encontrado'
        });

    }

    // Obtener el indice en el array del objeto original para pisarlo con el nuevo
    const index = productos.findIndex(producto => producto === productoToModify);
    
    // Leer los datos de la request
    const { title, price, thumbnail } = req.body; 

    // Modificar el objeto
    productoToModify.title = title;
    productoToModify.price = price;
    productoToModify.thumbnail = thumbnail;

    // Cambiar el objeto en su posición
    productos.splice(index, 1, productoToModify);

    // Guardar el nuevo array
    fs.writeFileSync(db, JSON.stringify(productos) ,utf);

    // JSON devuelto
    res.json({
        msg: "Producto modificado con exito",
        productoToModify
    })

}

const productoDelete = async(req = request, res = response) => {

    // Leo la DB
    const productos = JSON.parse(fs.readFileSync(db, utf));

    // Leo el id del params
    const idProductoToDelete = parseInt(req.params.id); 

    // Encuentro el producto que quiero modificar
    const productoToDelete = productos.find(producto => producto.id === idProductoToDelete);

    if( !productoToDelete ){

        return res.status(400).json({
            error : 'producto no encontrado'
        });

    }
    
    // Obtener el indice en el array del objeto original para pisarlo con el nuevo
    const index = productos.findIndex(producto => producto === productoToDelete);

    // Elimino el objeto
    productos.splice(index, 1);

    // Guardar el nuevo array
    fs.writeFileSync(db, JSON.stringify(productos) ,utf);

    // JSON devuelto
    res.json({
        msg: "Producto eliminado con exito"
    })

}

module.exports = {
    productosGet,
    productoPost,
    productosGetById,
    productoUpdate,
    productoDelete
}
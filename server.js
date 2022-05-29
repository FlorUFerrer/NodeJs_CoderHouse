const express = require("express");


const app = express();


/********Mostrar productos*****************/
 const fs = require ("fs");
 const productsGet = (req , res ) => {
    fs.readFile('./productos.txt','utf-8', (error, data) => {
        if (error) throw error;
        const products  = JSON.parse(data);
        res.json({
            products
        });
    });
}
/****************************************/

/*********Producto random****************/


const random = (req , res ) => {
    fs.readFile('./productos.txt','utf-8', (error, data) => {
        if (error) throw error;
        const products  = JSON.parse(data);
        const productRandom = Math.floor(Math.random()*products.length)
        res.json({
            product: products[productRandom]
        });
    });
}
/****************************************/


app.get('/productos', productsGet)

app.get('/productoRandom', random )


const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Servidor HTTP escuchando en puerto http://localhost:${PORT}`)
});


server.on('error',(error)=> console.log(error));
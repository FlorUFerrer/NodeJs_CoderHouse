const express = require('express');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productosRoutePath = '/api/productos';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: false}));

        // Directorio Publico
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.productosRoutePath, require('../routes/productos') );

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;
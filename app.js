require('dotenv').config();
const express = require('express');
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const http = require('http');
const path = require('path');
const fs = require("fs");
const Contenedor = require("./Contenedor");

/* Routers */
const productosApiRouter = require('./routes/productosAPI');
const carritosApiRouter = require('./routes/carritosAPI');
const productosRouter = require('./routes/productos');
const indexRouter = require('./routes/index');
const errorRouter = require('./routes/error');

/* Base */
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const port = process.env.PORT;

/* Express Config */
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/* View Engine */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Routing */
app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/api/productos', productosApiRouter);
app.use('/api/carrito', carritosApiRouter);
app.use('/*', errorRouter);

/* Variables para socketIO*/
let mensajes = [];
const messages_db = './messages.txt';
const utf = 'utf-8';

(async() => {
    const contenedor = new Contenedor("messages");
    await contenedor.initialize();
})();

/* Socket IO */
io.on("connection", socket => {
    console.log("SocketIO Connected!");
    const messages = JSON.parse(fs.readFileSync(messages_db, utf));

    mensajes = messages;

    socket.emit("initial", messages);

    socket.on("sendMessage", (data) => {
        data.timestamp = (new Date).toLocaleString();
        mensajes.push(data);
        io.sockets.emit("shareMessages", mensajes);
        fs.writeFileSync(messages_db, JSON.stringify(mensajes), utf);
    });

    socket.on("product", () => {
        io.sockets.emit("refreshProducts");
    })

});

/* Server Init */
server.listen(port, () => {
    console.log("Server escuchando en puerto", port)
});
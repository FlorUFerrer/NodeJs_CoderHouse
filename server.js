const express = require ('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : true}))






const PORT = 8080
const server = app.listen(PORT, () =>{
console.log(`Servidor funcionando en http://localhost:8080`);
});
server.on('error', (err)=> console.log(err));
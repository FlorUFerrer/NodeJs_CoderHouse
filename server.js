const Contenedor = require('./contenedor');
const express = require ('express')
const {Router} = express;
const app = express();
const productos = Router();
const index = require ('./src/index')

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


/****************CONTENEDOR*************/
const contenedor = new Contenedor('productos.txt');



/****************PRODUCTOS GET***************/
const productosGet = async (req, res) =>{
    try{
      const productos = await contenedor.getAll()
      res.json({ 
                productos:productos
               });
    } catch (error) {
        res.send(`Error al obtener los productos: ${error}`)
    }
  }
/***************PRODUCTOS GET BY ID****************/
  const productoGetById = async (req, res) =>{
    try{
         let id = req.params.id
         const productoEncontrado = await contenedor.getById(id)
          if( !productoEncontrado ){
              return res.status(400).json({
                error : 'Producto no encontrado'
            });
          }
          res.json({producto:productoEncontrado });
        } catch (error) {
           return res.send(error)
    }
  }
/***************PRODUCTOS DELETE BY ID****************/
  const productoDelete = async (req, res) =>{
    try{
          let id = req.params.id
          const productoEliminado = contenedor.deleteById(id)
          res.json({producto: productoEliminado})
        }catch (error) {
              return res.send(error)
    }
  }

  /***************PRODUCTOS UPDATE****************/
  const productoPut = async (req, res) =>{
    try{
      let id = req.params.id 
      const { producto } = req.body;
      const productoActualizado = await contenedor.updateById(id , producto)
        
      res.json({producto: productoActualizado})
         
        }catch (error) {
              return res.send(error)
    }
  }

    /***************PRODUCTOS POST*****************/
    const productoPost = async (req, res) =>{
      try{
        const { title, price, thumbnail } = req.body;
           
        const productoNuevo = {
          title,
          price,
          thumbnail
        }  
        await contenedor.save(productoNuevo)  
        res.json({productos : productoNuevo})
          }catch (error) {
                return res.send(error)
      }
    }

 

// Rutas
productos.get( '/', productosGet ); // Trae todos los productos
productos.get('/:id', productoGetById ); // Trae producto por ID
productos.post( '/', productoPost ); // Guarda un producto (Predefinido en el método)
productos.put('/:id', productoPut); // Actualiza el producto por ID
productos.delete('/:id', productoDelete); // Elimino el producto por ID

app.use('/api/productos',productos);
app.use('/',index);




const PORT = 8080
const server = app.listen(PORT, () =>{
console.log(`Servidor funcionando en http://localhost:8080`);
});
server.on('error', (err)=> console.log(err));

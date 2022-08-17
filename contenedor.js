const {promises : fs} = require('fs');

class Contenedor {
    constructor (ruta){
        this.ruta = ruta
    }

    async save(obj){

       try {
            const objs = await this.getAll();
            let newId;
    
           if (objs.length == 0){ 
                 newId = 1;
           }else { 
             newId = objs[objs.length - 1].id + 1;
           }
           const newObj ={id: newId , ...obj}
           objs.push (newObj);
           await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
           return newId
        } 
        catch (error) {
            throw new Error (`Erros al guardar:${error}`);
        }
    }

    async getById(id) {
        try{
            const objs = await this.getAll();
            const obj = objs.find(x => x.id == id);
            return obj;
        }catch(error){
            throw new Error (`No se encontro el obejto`);
        }
    }

    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta,'utf-8');
            return JSON.parse(objs);
            
        } catch (error) {
            return []
        }
    } 
    async deleteById(id){
        try {
            let collection = []
            await fs.readFile(`./${this.ruta}`,'utf-8')
            .then( contenido => {
                let col = JSON.parse(contenido)
                for (const ob of col) {
                    if(ob.id != id) {
                        collection.push(ob)
                    }
                }
            })
            .catch( err => console.log(err));
            await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
            console.log('Objeto eliminado!');
            console.log('******************');
        } catch (error) {
            throw new Error (`No se puede eliminar el obejto`);
        }
    }
    
    async deleteAll(){
        try{
            await fs.writeFile(`./${this.ruta}`, '');
            console.log('Todos los objetos fueron eliminados');
        } catch (error) {
            throw new Error (`Algo fallo: ${error}`);    
        }
    }

   async updateById(id , updateProducto){

        try {
            const lista = await this.getAll();
            const producto =  await this.getById(id)
            const indiceObjeto = lista.findIndex( e => e.id == id);
            producto.title = updateProducto.title;
            producto.price = updateProducto.price;
            producto.thumbnail = updateProducto.thumbnail;
            lista.splice(indiceObjeto , 1 , producto)
            await this.deleteAll();
            await fs.writeFile(`./${this.ruta}`, JSON.stringify(lista));
           
           return producto

        } catch (error) {
            throw new Error (`No se puede actualizar: ${error}`);  
        }
   }
}

module.exports = Contenedor
const fsp = require('fs/promises');

class Contenedor {

    constructor(fileName){
        this.fileName = fileName + '.txt';
        this.encode = "utf-8";
    };

    async initialize() {
        const readedData = await fsp.readFile(`./${this.fileName}`, this.encode);
        if(readedData == "") {
            await fsp.writeFile(`./${this.fileName}`, '[]', this.encode);
        }
    }

    async save(element) {
        const listOfProducts = await this.getAll();
        element.id = listOfProducts[listOfProducts.length-1].id + 1;
        element.timestamp = Date.now();
        listOfProducts.push(element);
        await fsp.writeFile(`./${this.fileName}`, JSON.stringify(listOfProducts), this.encode);
        return element;
    };

    async getById(id) {
        const listOfProducts = await this.getAll();
        const foundProduct = listOfProducts.find(element => element.id == id);
        if(!foundProduct) return 'producto no encontrado';
        return foundProduct;
    };

    async getAll() {
        const readedData = await fsp.readFile(`./${this.fileName}`, this.encode);
        const firstChar = readedData.charAt(0);
        const lastChar = readedData.charAt(readedData.length - 1);
        if( firstChar != "[" || lastChar != "]")  await fsp.writeFile(`./${this.fileName}`, "[]", this.encode);
        return JSON.parse(await fsp.readFile(`./${this.fileName}`, this.encode));
    };

    async deleteById(id){
        const file = await this.getAll();
        const foundProduct = file.findIndex(element => element.id == id);
        if(foundProduct != -1){
            file.splice(foundProduct, 1);
            await this.deleteAll();
            await fsp.writeFile(`./${this.fileName}`, JSON.stringify(file), this.encode);
        }
        return `Deleted element with id ${id}`;
    };

    async deleteAll() {
        const emptyFile = JSON.stringify([]);
        await fsp.writeFile(`./${this.fileName}`, emptyFile, this.encode);
        return `All element were deleted`;
    };

    async updateById(newElement, id) {
        const file = await this.getAll();
        const foundProductIndex = file.findIndex(element => element.id == id );
        const oldProduct = await this.getById(id);
        oldProduct.timestamp = Date.now();
        oldProduct.nombre = newElement.nombre;
        oldProduct.descripcion = newElement.descripcion;
        oldProduct.codigo = newElement.codigo;
        oldProduct.foto = newElement.foto;
        oldProduct.precio = newElement.precio;
        oldProduct.stock = newElement.stock;
        file.splice(foundProductIndex, 1, oldProduct);
        await this.deleteAll();
        await fsp.writeFile(`./${this.fileName}`, JSON.stringify(file), this.encode);
        return oldProduct;
    }

};

module.exports = Contenedor;
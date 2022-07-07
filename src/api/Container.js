class Container{
    constructor(){
        this.elements = []
    }

    getAll(){
        return this.elements;
    }

    getId(id){

        const element = this.elements.find((e)=> e.id == id)

        return element
    }

    save(element){
        element.id = this.elements.length === 0 ? 1 : this.elements[this.elements.length - 1].id + 1;
    
        this.elements.push(element)

        return element
    }

    updateById(id , newProducto){
        const elementIndex = this.elements.findIndex((e)=> e.id == id)
        if(elementIndex === -1) return {error:'producto no encontrado'}

        this.element[elementIndex] = {
            ...this.elements[elementIndex],
            ...newProducto
        };

        return this.elements[elementIndex];
    }


    deleteById(id){

        const elementIndex = this.elements.findIndex((e)=> e.id == id)
        if(elementIndex === -1) return {error:'true'}
           
        this.elements = this.elements.filter((e)=> e.id != id)

        return {error: false};
    }
}

export {Container};
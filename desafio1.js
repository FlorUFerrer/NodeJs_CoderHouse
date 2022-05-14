class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
 
    //Retorna el nombre completo del usuario
    getFullName() { 
        return `${this.nombre} ${this.apellido}`; 
    }

    //Recibe el nombre de mascota y lo agrega al arrya
    addMascota(nombre) { 
        this.mascotas.push(nombre); 
    }

    //Retorna la cantidad de mascotas que tiene el usuario
    countMascotas() { 
        return this.mascotas.length; 
    }

    //Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    addBook(nombre, autor) { 
        this.libros.push({nombre, autor}); 
    }

    //Retorna un array con sólo los nombres del array de libros del usuario
    getBookNames() { 
        return this.libros.map(libro => libro.nombre); 
    }

}

//Usuario nuevo
let usuario = new Usuario("Flor", "Ferrer", [], []);

//Agrego mascota 
usuario.addMascota("Perro"); 
usuario.addMascota("Cobayo"); 

//Agrego libro
usuario.addBook("El señor de las moscas", "William Golding"); 
usuario.addBook("Fundacion", "Isaac Asimov"); 

//Muestro por consola (Crtl+Alt+N)
console.log("El usuario es: ",usuario); 
console.log("Cantidad de mascotas: ", usuario.countMascotas());
console.log("Nombre de libros: ", usuario.getBookNames()); 
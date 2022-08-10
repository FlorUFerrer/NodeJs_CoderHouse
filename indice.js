const Contenedor = require('./contenedor');




const p1 =    {
    "title": "Lápiz",
    "price": 200,
    "id": 1
  }
 const p2 =    {
    "title": "Regla",
    "price": 250,
    "id": 2
}
  
  const p3 =   {
    "title": "Goma",
    "price": 100,
    "id": 3
  }

  const p4 = {
    "title": "Resma",
    "price": 1000,
    "id": 4
  }
    





async function main (){

     const contenedor = new Contenedor('./productos.txt');

     console.log("Mostrando Productos")
     let objs =  await contenedor.getAll();
     console.log(objs)
     console.log('******************');

     console.log("GUARDO PRODUCTO 1")
     let idp1 = await contenedor.save(p1)
     console.log("id de p1:" ,idp1)
     console.log('******************');

     console.log("GUARDO PRODUCTO 2")
     let idp2 = await contenedor.save(p2)
     console.log("id de p2:" ,idp2)
     console.log('******************');
   
     console.log("GUARDO PRODUCTO 3")
     let idp3 = await contenedor.save(p3);
     console.log("id de p3:" ,idp3)
     console.log('******************');

     console.log("Mostrando Productos")
     objs =  await contenedor.getAll();
     console.log(objs)
     console.log('******************');

      console.log("BUSCANDO POR ID")
      const res = await contenedor.getById(idp1);   
      console.log("res",res);
      console.log('******************');

      console.log("ELIMINANDO POR ID")
      objs =  await contenedor.deleteById(1);
      console.log('******************');

     console.log("ELIMINANDO TODO")
     objs =  await contenedor.deleteAll();
     console.log('******************');
}

main ()
# PROGRAMACION BACKEND
# Comisión #31830 


## Desafio 4


### Consigna:
- Cada producto estará representado por un objeto con el siguiente formato:
```python
{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}

```

- Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.


- Para el caso de que un producto no exista, se devolverá el objeto:{ error : 'producto no encontrado' }
- Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
- Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
- Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
- El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

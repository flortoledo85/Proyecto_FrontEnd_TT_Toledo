Descripción:

Optic Choices es una página e-commerce sencilla para la venta de armazones y anteojos de sol.
La funcionalidad actual es limitada: catálogo de productos, carrito persistente en localStorage, sección de reseñas, medidas y formulario de contacto (envío mediante Formspree).


Funcionalidades principales:

Catálogo de productos (21 items al momento). Cada producto incluye imagen, nombre, descripción y precio.

Las imágenes del producto se abren en nueva pestaña al hacer click.

Botón Agregar al carrito añade el producto una sola vez al carrito (lista guardada en localStorage).

Carrito: lista de ítems, botón para vaciar el carrito y botón para calcular el total.

Sección Medidas: abre un diagrama de medidas en una pestaña nueva.

Sección Reseñas: muestra opiniones de clientes.

Sección Contacto: enlaces a redes, teléfono, mapa incrustado y formulario (Formspree).


Estructura del Proyecto:

index.html — página principal

style.css — estilos

script.js — lógica de interacción (fetch, carrito, listeners)

productos.json — listado de productos

pictures/ — imágenes (productos y reseñas)

README.md — documentación


Consideraciones: 

Todas las imágenes incluyen alt para accesibilidad.

El formulario de contacto usa Formspree para gestión de envíos.

Menú “hamburguesa” responsive implementado con CSS (sin JS).

Imagenes guardadas con tamaño reducido, y preload metadata en el video. 

En dispositivos el video no está disponible para su visualización.


Mejoras a realizar: 

Manejo de cantidad por producto en carrito (actualmente agrega solo 1 por producto).

Posibilidad de eliminar un producto.

Calculo de total de forma automatica al agregar al carrito. 

Etc, etc, etc... 
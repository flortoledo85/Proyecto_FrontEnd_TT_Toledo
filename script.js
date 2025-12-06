// FUNCIONES DE MI PROGRAMA

let listaCarrito = [];

const productos = [];
//JSON
/**
 * Funcion asincronica para traer los objetos de JSON
 * @returns {Promise<Array<Object>>}
 */

async function cargarProductosApi() {
    try {
        const respuesta = await fetch("./productos.json");
        if(!respuesta.ok) {
            throw new Error(`Error al ;obtener los datos ${respuesta.status} - ${respuesta.statusText}`);
        }
        const productosArray = await respuesta.json();
        return productosArray;
    }
    catch (error) {
        console.error("Fallo en la carga de datos: ", error);
        const listaUL = document.querySelector("#productos .catalogo");
        listaUL.innerHTML = `<li id="mensaje-error"> Error al cargar el catalogo.</li>`
    }
}

function crearProducto(idProd, nameProd, descriptionProd, pathProducto, amountProd) {
    const nuevoProducto = {
        id: idProd,
        name: nameProd,
        description: descriptionProd,
        pathimg: pathProducto,
        amount: amountProd
    };
    return nuevoProducto;
}

function mostrarCatalogo1(productos) {
    for (let j = 0; j < productos.length; j++) {
        console.log(`ID: ${productos[j].id} | Producto: ${productos[j].name} | Precio: ${productos[j].amount}`);
    };
}

function copiaListaProductos(lista) {
    return [...lista];
}

function mostrarCatalogo2(catalogo) {
    for (const { id, name, amount } of catalogo) {
        console.log(` ID: ${id} | Nombre: ${name} | Precio: ${amount.toFixed(2)}`);
    };
}

function calcularTotal(productos) {
    let total = 0;
    for (let i = 0; i < productos.lenght; i++) {
        total += productos[i].amount;
    }
    return total;
}

function buscarEnLista(catalogo, idBuscado) {
    for (const { id } of catalogo) {
        if (id === idBuscado) {
            return id
        }
    }
    return -1;
}

function buscarProductoID(catalogo, idBuscado) {
    for (const item of catalogo) {
        if (item.id === idBuscado) {
            const { description, ...resto } = item;
            return resto;
        }
    }
    return -1;
}


function agregarProducto(catalogo, nuevoProducto) {
    const catalogoActualizado = [...catalogo, nuevoProducto];
    return catalogoActualizado
}

function insertarProducto(listaNueva) {
    // const listaProductos = copiaListaProductos(listaNueva);
    const contenedorProductos = document.querySelector("#productos .catalogo");
    // console.log(contenedorProductos);

    for (let c = 0; c < listaNueva.length; c++) {
        // console.log(c)
        const productoActual = listaNueva[c];
        const nuevoElemento = document.createElement("article");
        nuevoElemento.className = "producto";
        const precio = productoActual.amount
        nuevoElemento.innerHTML = `
            <a href="${productoActual.pathimg}" target="_blank">
            <img src="${productoActual.pathimg}" alt="${productoActual.description}"></a>
            <h3>${productoActual.name}</h3>
            <p>
                <a class="description_product" href="#." data-descripcion="${productoActual.description}"> 
                Ver descripción</a>
            </p>
            <div class="contenedor_descripcion">
            </div> 
            <p class= "precio">
                Precio = ${precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}<br>
            </p>
            <button 
                type="button" 
                data-id="${productoActual.id}"
                data-nombre="${productoActual.name}"
                data-precio="${precio}">
                Agregar al Carrito
            </button>`
        contenedorProductos.appendChild(nuevoElemento);
    }
}

function insertarProductoHTML(producto) {
    const listaCarrito = document.querySelector("#carrito .list-group");
    const liProducto = document.createElement("li");
    console.log("Producto recibido:", producto);
    console.log("Tiene amount?", producto.amount);
    console.log("Tiene precio?", producto.precio);
    liProducto.textContent = `${producto.name} ${producto.amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`;
    liProducto.className = "list-group-item";
    listaCarrito.appendChild(liProducto);
}

function actualizaContador() {
    const contenedorNumero = document.querySelector("#carrito .contador_compra");
    contenedorNumero.textContent = listaCarrito.length;
}

function guardarCarritoEnStorage(listaCarrito) {
    const carritoJSON = JSON.stringify(listaCarrito);
    localStorage.setItem("listaCarrito", carritoJSON);
}

function vaciarCarritoHTML() {
    const listaVaciar = document.querySelector("#carrito .list-group");
    listaVaciar.innerHTML = "";
}

function mostrarDescripcion(evento) {
    const elementoEvento = evento.target.tagName;
    if (elementoEvento === "A") {
        const elementoClickeado = evento.target;
        const descripcionProducto = elementoClickeado.dataset.descripcion;
        // console.log(descripcionProducto)
        const divProducto = elementoClickeado.closest(".producto");
        const divDescrip = divProducto.querySelector(".contenedor_descripcion");
        // console.log(divDescrip);
        if (divDescrip.children.length == 0) {
            const elementoDescrip = document.createElement("p");
            elementoDescrip.textContent = descripcionProducto;
            divDescrip.appendChild(elementoDescrip);
            elementoClickeado.textContent = "Ocultar descripcion";
        }
        else {
            elementoClickeado.textContent = "Ver descripcion";
            divDescrip.innerHTML = "";
        }
    }
}


function agregarAlCarrito(evento) {

    if (evento.target.tagName === "BUTTON") {
        const idProducto = parseInt(evento.target.dataset.id);
        const idEncontrado = buscarEnLista(listaCarrito, idProducto);

        if (idEncontrado === -1) {
            const productoEncontrado = buscarProductoID(listaNueva, idProducto);
            listaCarrito.push(productoEncontrado);
            insertarProductoHTML(productoEncontrado);
            actualizaContador();
            guardarCarritoEnStorage(listaCarrito);
        }
    }
}

function cargarCarritoStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    console.log(carritoJSON);
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    else {
        return [];
    }
}


function eliminarCarritoEnStorage() {
    localStorage.removeItem("listaCarrito");
    listaCarrito = [];
    actualizaContador();
    vaciarCarritoHTML();
}

// EJECUCION DE MI PROGRAMA

// const lista = generarProductos();
// const nuevo = crearProducto(5, "Rayban Polarizado", "Anteojos de Sol. RayBan P. Polarizados Color: Negro. Medidas: ancho total 139.7 mm. Largo patilla: 145 mm. Alto lente: 55 mm. DIP 55 a 70 mm.", "./pictures/rayban_p.jpg", 220000.00)
// const listaNueva = agregarProducto(productos, nuevo)

// mostrarCatalogo1(lista);
// console.log("--------------------");
// mostrarCatalogo2(listaNueva);
// console.log("--------------------");
// const listaCopiada = copiaListaProductos(listaNueva);
// console.log(listaCopiada)
// console.log("--------------------");
insertarProducto(listaNueva)

listaCarrito = cargarCarritoStorage();

if (listaCarrito.length != 0) {
    for (const producto of listaCarrito) {
        console.log(producto.amount);
        insertarProductoHTML(producto);
    }
    actualizaContador();
}
const contenedorProducto = document.querySelector("#productos .catalogo");
// console.log(contenedorProducto);
contenedorProducto.addEventListener("click", mostrarDescripcion);
contenedorProducto.addEventListener("click", agregarAlCarrito);

const vaciarCarrito = document.querySelector("#carrito .vaciarCarrito");
vaciarCarrito.addEventListener("click", eliminarCarritoEnStorage);
// FUNCIONES DE MI PROGRAMA

let listaCarrito = [];

let productos = [];
//JSON
/**
 * Funcion asincronica para traer los objetos de JSON
 * @returns {Promise<Array<Object>>}
 */

async function cargarProductosApi() {
    try {
        const respuesta = await fetch("./productos.json");
        if (!respuesta.ok) {
            throw new Error(`Error al obtener los datos ${respuesta.status} - ${respuesta.statusText}`);
        }
        const productosArray = await respuesta.json();
        return productosArray;
    }
    catch (datosError) {
        console.error("Fallo en la carga de datos: ", datosError);
        const contenedor = document.querySelector("#productos .catalogo");
        contenedor.innerHTML = `<p id="mensaje-error"> Error al cargar el catalogo.</p>`
    }
}

function crearProducto(idProd, nameProd, descriptionProd, pathProducto, amountProd) {
    const nuevoProducto = {
        id: idProd,
        name: nameProd,
        description: descriptionProd,
        pathimg: pathProducto,
        price: amountProd
    };
    return nuevoProducto;
}

function mostrarCatalogo1(productos) {
    for (let j = 0; j < productos.length; j++) {
        console.log(`ID: ${productos[j].id} | Producto: ${productos[j].name} | Precio: ${productos[j].price}`);
    };
}

function copiaListaProductos(lista) {
    return [...lista];
}

function mostrarCatalogo2(catalogo) {
    for (const { id, name, price } of catalogo) {
        console.log(` ID: ${id} | Nombre: ${name} | Precio: ${price.toFixed(2)}`);
    };
}

function calcularTotal(productos) {
    let total = 0;
    for (let i = 0; i < productos.length; i++) {
        total += productos[i].price;
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
}


function agregarProducto(catalogo, nuevoProducto) {
    const catalogoActualizado = [...catalogo, nuevoProducto];
    return catalogoActualizado
}

function insertarProducto(productos) {
    // const listaProductos = copiaListaProductos(listaNueva);
    const contenedorProductos = document.querySelector("#productos .catalogo");
    // console.log(contenedorProductos);

    for (let c = 0; c < productos.length; c++) {
        // console.log(c)
        const productoActual = productos[c];
        const nuevoElemento = document.createElement("article");
        nuevoElemento.className = "producto";
        const precio = productoActual.price
        nuevoElemento.innerHTML = `
            <a href="${productoActual.pathimg}" target="_blank">
            <img src="${productoActual.pathimg}" alt="${productoActual.description}"></a>
            <h3>${productoActual.name}</h3>
            <p>
                <a class="description_product" href="#." data-descripcion="${productoActual.description}"> 
                Descripción &#xFF0B;</a>
            </p>
            <div class="contenedor_descripcion">
            </div> 
            <p class= "precio">
                Precio = ${precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}<br>
            </p>
            <button
                class="btn-primary-custom"
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
    const listaCarritoHTML = document.querySelector("#carrito .list-group");
    const liProducto = document.createElement("li");
    liProducto.textContent = `${producto.name} ${producto.price.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`;
    liProducto.className = "list-group-item";
    listaCarritoHTML.appendChild(liProducto);
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
    const divTotal = document.querySelector(".montoTotal");
    divTotal.textContent = "$0,00";
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
            elementoClickeado.textContent = "Descripción \u2212";
        }
        else {
            elementoClickeado.textContent = "Descripción \uFF0B";
            divDescrip.innerHTML = "";
        }
    }
}


function agregarAlCarrito(evento) {

    if (evento.target.tagName === "BUTTON") {
        const idProducto = parseInt(evento.target.dataset.id);
        const idEncontrado = buscarEnLista(listaCarrito, idProducto);

        if (idEncontrado === -1) {
            const productoEncontrado = buscarProductoID(productos, idProducto);
            listaCarrito.push(productoEncontrado);
            insertarProductoHTML(productoEncontrado);
            actualizaContador();
            guardarCarritoEnStorage(listaCarrito);
        }
    }
}

function cargarCarritoStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    // console.log(carritoJSON);
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

function calcularMontoTotal(evento) {
    const carrito = cargarCarritoStorage();
    if (carrito) {
        const total = calcularTotal(carrito);
        const elementoTotal = evento.target;
        // console.log(elementoTotal);
        const divMonto = elementoTotal.closest(".total");
        // console.log(divMonto);
        const divTotal = divMonto.querySelector(".montoTotal");
        divTotal.textContent = total.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
    }
}

async function main() {
    productos = await cargarProductosApi();

    if(productos && productos.length > 0){
        insertarProducto(productos);
    }
    else {
        alert("No se pueden cargar los productos. Intente mas tarde")
    }


    const contenedorProducto = document.querySelector("#productos .catalogo");
    // console.log(contenedorProducto);
    contenedorProducto.addEventListener("click", mostrarDescripcion);
    contenedorProducto.addEventListener("click", agregarAlCarrito);

    const vaciarCarrito = document.querySelector("#carrito .vaciarCarrito");
    vaciarCarrito.addEventListener("click", eliminarCarritoEnStorage);

    const calcularPrecioTotal = document.querySelector("#carrito .calcularMontoTotal");
    calcularPrecioTotal.addEventListener("click", calcularMontoTotal)

    listaCarrito = cargarCarritoStorage();

    if (listaCarrito.length != 0) {
        for (const producto of listaCarrito) {
            insertarProductoHTML(producto);
        }
        actualizaContador();
    }

}

function validarFormulario(evento) {
    evento.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    if (nombre === "" || email === "") {
        alert("Los campos son obligatorios");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Por favor ingrese un mail valido");
        return;
    }

    console.log("Formulario correcto");
    evento.target.submit();
    evento.target.reset();

}



// EJECUCION DE MI PROGRAMA

main();
const validacionForm = document.querySelector("#contact .formulario");
// console.log(validacionForm)
validacionForm.addEventListener("submit", validarFormulario);
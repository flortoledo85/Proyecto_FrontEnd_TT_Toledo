
// CARRITO

const carrito = {
    productos: [],
    agregar: function (producto) {
        this.productos.push(producto);
        console.log(`"${producto.name}" fue agregado al carrito`);
    },
    obtenerTotal: function () {
        const total = calcularTotal(this.productos);
        console.log("El monto total es : $" + total);
        return total;
    }
}

// FUNCIONES DE MI PROGRAMA


function calcularTotal(productos) {
    let total = 0;
    for (let i = 0; i < productos.lenght; i++) {
        total += productos[i].amount;
    }
    return total;
}


function generarProductos() {
    const productos = [
        {
            id: 1,
            name: "PinkLove",
            description: "Armazon de acetato transparante. Color: Rosa. Medidas: ancho total 139.7 mm.Largo patilla: 145 mm. Alto lente: 44 mm.Ancho: 53 mm.DIP: 61 a 85 mm.",
            pathimg: "./pictures/pink_love.jpg",
            amount: 90000
        },
        {
            id: 2,
            name: "Cristal",
            description: "Armazon de acetato transparante. Color: transparante. Medidas: ancho total 142.5 mm. Largo patilla: 147 mm. Alto lente: 45 mm. Ancho: 56 mm. DIP: 61 a 85 mm.",
            pathimg: "./pictures/sunglasses.jpg",
            amount: 120000
        },
        {
            id: 3,
            name: "Sol Bordo",
            description: "Anteojos de Sol. Color: Bordo. Medidas: ancho total 139.7 mm. Largo patilla: 145 mm. Alto lente: 44 mm. Ancho: 53 mm. DIP: 61 a 85 mm.",
            pathimg: "./pictures/cristal.jpg",
            amount: 198000
        },
        {
            id: 4,
            name: "Jaspeado",
            description: "Armazon marron jaspeado. Color: Bordo. Medidas: ancho total 141.5 mm. Largo patilla: 152 mm. Alto lente: 46 mm. Ancho: 53 mm. DIP: 61 a 85 mm.",
            pathimg: "./pictures/jaspeado.jpg",
            amount: 118000
        }
    ];
    return productos;
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

function agregarProducto(catalogo, nuevoProducto) {
    const catalogoActualizado = [...catalogo, nuevoProducto];
    return catalogoActualizado
}

function insertarProducto(listaNueva) {
    const listaProductos = copiaListaProductos(listaNueva);
    const contenedorProductos = document.querySelector("#productos .catalogo");
    // console.log(contenedorProductos);

    for (let c = 0; c < listaNueva.length; c++) {
        // console.log(c)
        const productoActual = listaNueva[c];

        const nuevoElemento = document.createElement("article");
        nuevoElemento.className = "producto";
        const precio = new Intl.NumberFormat(navigator.language, {
            style: "currency",
            currency: "ARS"
        }).format(productoActual.amount);
        nuevoElemento.innerHTML = `
            <a href=${productoActual.pathimg} target="_blank">
            <img src=${productoActual.pathimg}></a>
            <h3>${productoActual.name}</h3>
            <p>
                <a class="description_product" href="#." data-descripcion="${productoActual.description}"> 
                Ver descripción</a>
            </p>
            <div class="contenedor_descripcion">

            </div> 
            <p>
                Precio = ${precio}<br>
            </p>
            <button 
                type="button" 
                data-id="${productoActual.id}"
                data-nombre="${productoActual.name}"
                data-precio="${precio}"
                >
                Agregar al Carrito
            </button>`
        contenedorProductos.appendChild(nuevoElemento);
    }
}

function mostrarDescripcion(evento) {
    // console.log(evento.target.tagName);
    const elementoClickeado = evento.target;
    console.log(evento.target.dataset)
    const descripcionProducto = elementoClickeado.dataset.descripcion
    console.log(descripcionProducto)
    const divProducto = elementoClickeado.closest(".producto");
    const divDescrip = divProducto.querySelector(".contenedor_descripcion");
    console.log(divDescrip);
    if (divDescrip.children.length == 0){
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

// EJECUCION DE MI PROGRAMA

const lista = generarProductos();
const nuevo = crearProducto(5, "Rayban Polarizado", "Anteojos de Sol. RayBan P. Armazon negro. Medidas: ancho total 139.7 mm. Largo patilla: 145 mm.", "./pictures/rayban_p.jpg", 220000,)
const listaNueva = agregarProducto(lista, nuevo)

mostrarCatalogo1(lista);
console.log("--------------------");
mostrarCatalogo2(listaNueva);
console.log("--------------------");
const listaCopiada = copiaListaProductos(listaNueva);
console.log(listaCopiada)
console.log("--------------------");
insertarProducto(listaCopiada)

const contenedorProducto = document.querySelector("#productos .catalogo");
console.log(contenedorProducto);
contenedorProducto.addEventListener("click", mostrarDescripcion);

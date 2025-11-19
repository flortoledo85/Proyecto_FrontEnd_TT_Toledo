
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

function mostrarCatalogo2(catalogo) {
    for (const { id, name, amount } of catalogo) {
        console.log(` ID: ${id} | Nombre: ${name} | Precio: ${amount.toFixed(2)}`);
    };
}

function agregarProducto(catalogo, nuevoProducto) {
    const catalogoActualizado = [...catalogo, nuevoProducto];
    return catalogoActualizado
}

const lista = generarProductos();
const nuevo = crearProducto(5, "rayban_p", "Anteojos de Sol. RayBan P. Armazon negro. Medidas: ancho total 139.7 mm. Largo patilla: 145 mm.", "./pictures/rayban_p.jpg",  220000,)
const listaNueva = agregarProducto(lista, nuevo)

mostrarCatalogo1(lista);
console.log("--------------------");
mostrarCatalogo2(listaNueva);
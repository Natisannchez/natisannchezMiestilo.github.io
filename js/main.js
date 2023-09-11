// PRODUCTOS
const productos = [
    // CARTERAS
    {
        id: "Cartera 01",
        titulo: "Crossbody Bag",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "CARTERAS",
            id: "carteras"
        },
        precio: 1000
    },
    {
        id: "Cartera 02",
        titulo: "CHANEL",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "CARTERAS",
            id: "carteras"
        },
        precio: 1000
    },
    {
        id: "Cartera 03",
        titulo: "Prada",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "CARTERAS",
            id: "carteras"
        },
        precio: 1000
    },
    {
        id: "Cartera 04",
        titulo: "MOCHILA EVERYDAY",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "CARTERAS",
            id: "carteras"
        },
        precio: 1000
    },
    
    // Promos 
    {
        id: "Promo 01",
        titulo: "Mini Letter Graphic Flap Saddle Bag",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "PROMOCIONES",
            id: "promos"
        },
        precio: 1000
    },
    {
        id: "Promo 02",
        titulo: "Metal Decor Flap Square Bag",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "PROMOCIONES",
            id: "promos"
        },
        precio: 1000
    },
    {
        id: "Promo 03",
        titulo: "look fly 3",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "PROMOCIONES",
            id: "promos"
        },
        precio: 1000
    },
    {
        id: "Promo 04",
        titulo: "look fly 4",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "PROMOCIONES",
            id: "promos"
        },
        precio: 1000
    },
    {
        id: "Promo 05",
        titulo: "look fly 5",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "PROMOCIONES ",
            id: "promos"
        },
        precio: 1000
    },
    
    // Accesorios 
    {
        id: "Accesorio 01",
        titulo: "ACCESORIO 1",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre:"ACCESORIOS",
            id: "accesorios"
        },
        precio: 1000
    },
    {
        id: "Accesorio 02",
        titulo: "ACCESORIO 2",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "ACCESORIOS",
            id: "accesorios"
        },
        precio: 1000
    },
    {
        id: "Accesorio 03",
        titulo: "ACCESORIO 3",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "accesorios"
        },
        precio: 1000
    },
    {
        id: "Accesorio 04",
        titulo: "ACCESORIO 4",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "accesorios"
        },
        precio: 1000
    },
    {
        id: "Accesorio  05",
        titulo: "A5",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "accesorios"
        },
        precio: 1000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



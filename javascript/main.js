document.addEventListener("DOMContentLoaded", () => {
    const articulosStore = document.getElementById("articulos");
    const verCarrito = document.getElementById("carrito");
    const modalContainer = document.getElementById("modalContainer");

    let carrito = [];

    const productos = [
        {
            id: 1,
            nombre: "Remeras",
            precio: "5000",
            img: "https://wildroadweb.com/wp-content/uploads/2020/11/DSCN1361-scaled.jpg"
        },
        {
            id: 2,
            nombre: "Anteojos",
            precio: 3500,
            img: "https://cdn.pixabay.com/photo/2017/08/06/19/33/eyewear-2595549_1280.jpg"
        },
        {
            id: 3,
            nombre: "Gorras",
            precio: 4000,
            img: "https://i.pinimg.com/564x/c2/0d/9c/c20d9c603681f6384a3e4711db79d14c.jpg"
        },
        {
            id: 4,
            nombre: "Zapatillas",
            precio: 15000,
            img: "https://i.pinimg.com/564x/e7/4a/70/e74a704bdca1ff65c00bb732cd330619.jpg"
        }
    ];

    function displayProductos(productos) {
        productos.forEach((product) => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
            <img src="${product.img}">
            <h2>${product.nombre}</h2>
            <p class="price">${product.precio} $</p>
            `;

            articulosStore.append(content);

            let comprar = document.createElement("button");
            comprar.innerText = "Comprar";
            comprar.className = "comprar";

            content.append(comprar);

            comprar.addEventListener("click", () => {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio
                });
                console.log(carrito);
                updateLocalStorage();
            });
        });
    }

    verCarrito.addEventListener("click", () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalHeader = document.createElement("div");
        modalHeader.className = "modalH";
        modalHeader.innerHTML = `
        <h2 class="modalTitulo">Carrito</h2>
        `;
        modalContainer.append(modalHeader);
        const modalButton = document.createElement("h3");
        modalButton.innerText = "x";
        modalButton.className = "modalHbutton";
        modalButton.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });

        modalHeader.append(modalButton);

        carrito.forEach((product, index) => {
            let carritoContent = document.createElement("div");
            carritoContent.className = "modalContent"
            carritoContent.innerHTML = `
            <img src=${product.img}>
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="eliminar" data-index="${index}">X</span>
            `;
            modalContainer.append(carritoContent);
        });

        const total = carrito.reduce((acc, el) => acc + parseFloat(el.precio), 0);

        const totalApagar = document.createElement("div");
        totalApagar.className = "totalContent";
        totalApagar.innerHTML = `Total a pagar: ${total} $`
        modalContainer.append(totalApagar);

    
        const eliminarBotones = document.querySelectorAll(".eliminar");
        eliminarBotones.forEach((eliminarBoton) => {
            eliminarBoton.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (index !== null) {
                    carrito.splice(index, 1);
                    updateLocalStorage();
                    verCarrito.click();
                }
            });
        });
    });


    function updateLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }


    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
        carrito = JSON.parse(storedCarrito);
    }
    displayProductos(productos);
});

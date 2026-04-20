let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const lista = document.getElementById("cart-items");
const totalTexto = document.getElementById("cart-total");
const contador = document.getElementById("cart-count");

// Función para formatear precios en pesos chilenos
function formatearPrecioCLP(precio) {
    // Convertir a número entero para evitar decimales
    const precioNum = Math.round(Number(precio));
    
    // Convertir a string y agregar puntos como separadores de miles
    const precioStr = precioNum.toString();
    const precioConPuntos = precioStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return '$' + precioConPuntos;
}

function normalizarPrecio(item) {
    const precioNum = Number(item.precio);
    if (!isNaN(precioNum)) {
        if (precioNum > 0 && precioNum < 100) {
            item.precio = precioNum * 1000;
        } else {
            item.precio = precioNum;
        }
    } else {
        item.precio = 0;
    }
}

function actualizarCarrito() {
    lista.innerHTML = "";
    let total = 0;
    let totalCantidad = 0;

    carrito.forEach((item, index) => {
        normalizarPrecio(item);
        const li = document.createElement("li");
        li.className = "cart-item";
        const imagenSrc = item.imagen || 'img/carne.jpg'; // Usar carne.jpg como placeholder por defecto
        li.innerHTML = `
            <div class="cart-item-image">
                <img src="${imagenSrc}" alt="${item.nombre}" onerror="this.src='img/carne.jpg'">
            </div>
            <div class="cart-item-details">
                <span class="cart-item-name">${item.nombre}</span>
                <span class="cart-item-price">${formatearPrecioCLP(item.precio)}</span>
                <div class="quantity-controls">
                    <button class="btn-quantity" data-action="decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.cantidad}</span>
                    <button class="btn-quantity" data-action="increase" data-index="${index}">+</button>
                </div>
                <span class="item-total">${formatearPrecioCLP(item.precio * item.cantidad)}</span>
                <button class="btn-remove" data-index="${index}">Eliminar</button>
            </div>
        `;
        lista.appendChild(li);
        total += item.precio * item.cantidad;
        totalCantidad += item.cantidad;
    });

    totalTexto.textContent = formatearPrecioCLP(total);
    contador.textContent = totalCantidad;
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Agregar eventos de eliminar
    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });

    // Agregar eventos de cantidad
    document.querySelectorAll(".btn-quantity").forEach(btn => {
        btn.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            const action = this.getAttribute("data-action");
            
            if (action === "increase") {
                carrito[index].cantidad++;
            } else if (action === "decrease") {
                carrito[index].cantidad--;
                if (carrito[index].cantidad <= 0) {
                    carrito.splice(index, 1);
                }
            }
            actualizarCarrito();
        });
    });
}

window.mostrarPago = function () {
    document.getElementById("pago").style.display = "block";
};

window.finalizarCompra = function () {
    // Limpiar el carrito
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    
    // Ocultar el formulario y mostrar mensaje de éxito
    document.querySelector('#pago form').style.display = 'none';
    document.getElementById('mensaje-exito').style.display = 'block';
    
    // Opcional: ocultar el mensaje después de unos segundos
    setTimeout(function() {
        document.getElementById('mensaje-exito').style.display = 'none';
        document.getElementById('pago').style.display = 'none';
    }, 5000);
};

document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
});
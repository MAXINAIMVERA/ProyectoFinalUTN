import { getProductsCards, getProduct, getProduct2 } from "./firebase.js";

// SELECTORS
const cardSelector = document.querySelector(".productsContainer");
const cartSelector = document.querySelector(".cart-container");
const emptyCartSelector = document.querySelector("#empty-cart");
const confirmPurchase = document.querySelector("#confirm-buy");
const totalSelector = document.querySelector("#total");
const repeatedSelector = document.querySelector(".repeated");


//GLOBAL VARIABLES DECLARATION
let cart = [];
let total = 0;


// GET
getProductsCards(cardSelector);


// RENDER FUNCTIONS
export async function buildCards(obj, node) {

    const card = document.createElement("div");

    card.classList.add("col-sm-6", "col-md-4", "col-lg-2","card","my-4", "mx-5", "d-flex", "align-items-centre" );

    card.innerHTML = `
    <img src="${obj.data().img}" class="card-img-top" alt="zapatillas">
    <div class="card-body">
    <h4 class="card-title">${obj.data().Marca}, </h4>
    <h5 class="card-title"> ${obj.data().Modelo} </h5>
    <h6 class="card-title">Precio: $${obj.data().Precio}</h6>
    <a href="#" class="btn btn-primary buyButton" id="${obj.id}">COMPRAR</a>
    </div>
    `;
    node.append(card);
}

const renderCart = async () => {

    const row = document.createElement("div");

    row.innerHTML = "";

    cart.forEach(product => {

        row.classList.add("row", "d-flex", "align-items-center", "py-3", "cart-item")

        row.innerHTML = `
            <img src="${product.data().img}" >
            <div >
                <h5>${product.data().Marca}, ${product.data().Modelo}</h5>
                <h6 class="subtotal">SUBTOTAL: $${product.data().Precio}</h6>
            </div>
            <hr>
        `;

        cartSelector.append(row);
    })
}


// FUNCTIONS
const updateTotal = async (id) => {

    const product = await getProduct(id);

    total += product.Precio;

    totalSelector.innerHTML = `${total}`;

};

const checkCart = (id) => cart.some(product => product.id === id);

const checkRepeated = (Modelo) => repeatedCart.some(product.Modelo === Modelo);

const addToCart = async (e) => {
    const quantitySelector = document.querySelectorAll(".quantity");
    
    const productToCart = await getProduct2(e.target.id);

    updateTotal(e.target.id);

    if (checkCart(productToCart.id)) {

        cart.push(productToCart);
        
        repeatedSelector.innerHTML = "Hay articulos repetidos"
        
    } else {

        cart.push(productToCart);

        renderCart(cart);


        // aca tendria que ponerle a los 2 un push pq igual se pushea pero en este se imprime y el otro nao
    };
};

const emptyCart = async () => {

    total = 0;
    
    totalSelector.textContent = total;

    cart.length = 0;

    totalSelector.innerHTML = "";

    cartSelector.innerHTML = "";
    
    repeatedSelector.innerHTML = "";
}


// EVENTS FUNCTIONS

const addEventBuy = async () => {
    Swal.fire({
        title: '¿Desea confirmar su compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar compra'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡COMPRA EXITOSA!',
            'Su compra se ha concretado exitosamente',
            'success'
          )
        }
        emptyCart()
      })
}

const addEventEmpty = async () => {
    Swal.fire({
        title: '¿Desea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar Carrito'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'CARRITO VACIO',
            'El carrito se ha vaciado',
            'success'
          )
        }
        emptyCart()
      })
}

export async function addEvent() {

    const buyButtons = document.querySelectorAll(".buyButton");

    buyButtons.forEach(buyBtn => {
        buyBtn.addEventListener('click', addToCart);
    });
}

emptyCartSelector.addEventListener('click', addEventEmpty);
confirmPurchase.addEventListener('click', addEventBuy);

let cartWrap = document.querySelector("#cart-wrapper-item");
let cartItemList = document.querySelector("#cart-wrapper");
let showCart = document.querySelector(".cart");
import products from "./data.js";
let cartCount = document.querySelector("#cart-counter");
let totalWrap = document.querySelector(".cart-footer-text");

function slide(){
    let headerSlide = document.querySelector("#header>img");
    let imageUrlArray = [
        "/assets/images/slide-1.png",
        "/assets/images/slide-2.png",
        "/assets/images/slide-3.png",
        "/assets/images/slide-4.png",
        "/assets/images/slide-5.png",
    ]
    let random = Math.floor(Math.random()*imageUrlArray.length) + 1
 
    headerSlide.setAttribute("src", `/assets/images/slide-${random}.png`)

}

setInterval(()=>{
    slide()
}, 10000);

showCart.addEventListener("click", ()=>{
    cartItemList.classList.toggle("show")
})

// TO DISPLAY THE PTODUCTS ON THE UI
function getProducts(){
    let productItem = document.querySelector("#shop");
    products.forEach((product)=>{
            productItem.innerHTML += `<div class="product-item" data-product-id= ${product.product_id}>
                                        <div class="product-item-image">
                                            <img src=${product.product_image} alt=${product.product_name}>
                                        </div>
                                        <h3>${product.product_name} </h3>
                                        <small>${product.product_description} </small>
                                        <span>${product.product_stock} in stock</span>
                                        <span>$${product.product_price} </span>
                                        <div class="product-item-btn">
                                            <button class="cart-btn" data-product-id= ${product.product_id} > Add To Cart </button>    
                                        </div>
                                    </div>`
    
    })
    // ADDS EVENT HANDLER TO THE ADD TO CART BUTTON OF EACH PRODUCT 
    // usingthe getAttribute to get the custom attribute set to the button, the value of this data-product-id was set to the product-id from the data array
    let cartBtn = document.querySelectorAll('.cart-btn');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click', (event)=>{
            let productId = event.target.getAttribute("data-product-id")
            addToCart(productId)
            console.log(productId)
        })
    
    })
        
}

getProducts()

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

function addToCart(id){
    let numberOfUnits = 1;
    if(cart.some((item) => item.product_id == id)){
        products.filter((product)=>{
            if(product.product_id == id){
                changeNumberOfUnit("plus", product.product_id);
            
            }
        });
        

    }else{
        let list = products.find((product)=>product.product_id == id);
        cart.push({
            ...list,
            numberOfUnits,
        });
        console.log(cart)
    }
    updateCart()
}

function updateCart(){
    renderCartItems()
    renderSubTotal()

    // save cart to localStorage
    localStorage.setItem("CART", JSON.stringify(cart));

}

function renderCartItems(){
    cartWrap.innerHTML = ""
    if(cart.length == 0){
        cartWrap.innerHTML = "<p class='cart-message'>Your cart is empty! Start shopping </p>"
    }
    cart.forEach((item)=>{
        cartWrap.innerHTML += `<div id="cart-item">
                            <div class="cart-item-thumbnail">
                                <img src=${item.product_image} alt="product name">
                            </div>

                            <span class="cart-item-name">
                                ${item.product_name}
                            </span>

                            <div class="cart-item-count">
                                <button id="increment" class="plain-btn" data-product-id = ${item.product_id}> &plus; </button>
                                <span>${item.numberOfUnits} </span>
                                <button id="decrement" class="plain-btn" data-product-id = ${item.product_id}> &minus; </button>
                            </div>

                            <span class="cart-item-price">
                                $${item.product_price}
                            </span>
                            <button class="remove-item" data-product-id = ${item.product_id}> + </button>
                        </div>`

        let incDecBtn = document.querySelectorAll(".plain-btn");
        let removeItem = document.querySelectorAll(".remove-item");

        incDecBtn.forEach((btn)=>{
            btn.addEventListener("click", (event)=>{
                let prodId = event.target.getAttribute("data-product-id")
                prodId = Number(prodId)
                if(event.target.id == "increment"){
                    changeNumberOfUnit("plus", prodId)
                    console.log(event.target.id, prodId)
                }else if(event.target.id == "decrement"){
                    changeNumberOfUnit("minus", prodId)
                    console.log(event.target.id, prodId)
                }
            
            })
        
        })
        
        // event listener to remove an item from cart
        removeItem.forEach((btn)=>{
            btn.addEventListener("click", (event)=>{
                let prodId = event.target.getAttribute("data-product-id")
                prodId = Number(prodId)
                removeFromCart(prodId);
            })
        
        })
    })
}

function changeNumberOfUnit(action, id){
    cart = cart.map((prod)=>{
        let numberOfUnits = prod.numberOfUnits;
        if(prod.product_id == id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
                
            }else if (action === "plus" && numberOfUnits < prod.product_stock) {
                numberOfUnits++;
            }
        }
        return {
            ...prod,
            numberOfUnits,
        };
    });
    
    updateCart()
}
// since i used the strictly not equal it is advisable to covert the prodId from data-product-id to number first or use the loose equality
function removeFromCart(id){
    cart = cart.filter((item)=> item.product_id !== id)
    updateCart()
}

function renderSubTotal(){
    let subtotal = 0;
    let total = 0;
    
    cart.forEach((item)=>{
        subtotal += item.product_price * item.numberOfUnits;
        total += item.numberOfUnits;
    })

    cartCount.innerHTML = total;
    totalWrap.innerHTML = `Subtotal: (${total} items) : $${subtotal.toFixed(2)} `
}


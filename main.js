let headerSlide = document.querySelector("#header>img");
let productItem = document.querySelector("#shop");
const products = [
    {
        product_id: 1,
        product_name: "Jacket by Rogue",
        product_image: "./assets/products/image-1.png",
        product_description: "lovely jacket made with quality and durable material",
        product_price: 2000,
        product_stock: 5,

    },
    {
        product_id: 2,
        product_name: "Winter Jacket",
        product_image: "./assets/products/image-2.png",
        product_description: "lovely winter jacket made with quality and durable material",
        product_price: 200,
        product_stock: 50,

    },
    {
        product_id: 3,
        product_name: "Jean pant",
        product_image: "./assets/products/image-3.png",
        product_description: "lovely pant made with quality and durable material",
        product_price: 100,
        product_stock: 15,

    },
    {
        product_id: 4,
        product_name: "Jacket",
        product_image: "./assets/products/image-4.png",
        product_description: "lovely jacket made with quality and durable material",
        product_price: 1200,
        product_stock: 15,

    },



]

function slide(){
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

function getProducts(){
    products.forEach((product)=>{
            productItem.innerHTML += `<div class="product-item">
                                        <div class="product-item-image">
                                            <img src=${product.product_image} alt=${product.product_name}>
                                        </div>
                                        <h3>${product.product_name} </h3>
                                        <small>${product.product_description} </small>
                                        <span>$${product.product_stock} in stock</span>
                                        <span>$${product.product_price} </span>
                                        <div class="product-item-btn">
                                            <button id="cart-btn"> Add To Cart </button>    
                                        </div>
                                    </div>`
    
    })

}
getProducts()
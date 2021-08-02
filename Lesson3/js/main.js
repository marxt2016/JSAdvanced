'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//Promise Task1
// function makeGETRequest(url) {
//     return new Promise(function (resolve, reject) {
//         let xhr;
//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(xhr.responseText);
//                 } else {
//                     setTimeout(() => { reject(new Error("Something went wrong")) }, 4000);
//                 }
//             }
//         }
//         xhr.open('GET', url, true);
//         xhr.send();
//     });
// };

/**
   * describes base class for product 
   */
class Product {
    constructor(item) {
        this.id_product = item.id_product || 0;
        this.product_name = item.product_name || "default";
        this.price = item.price || 0;
        this.img = item.img || 'https://picsum.photos/100';
    }
    /**
       * creates markup for individual product items on the main page
       */
    renderGood() {
        return `<div class="goods-item" >
                <img src = ${this.img} alt='nice'>
                <h3 >${this.product_name}</h3>
                <p class="price">$${this.price}</p>
                <button class =".to_cart" data-id ="${this.id_product}">Add to cart</button>
              </div>`;
    }
}

/**
   * describes base class for products List
   */
class ProductList {
    constructor() {
        this.incomingList = [];
        this.resultList = [];
        this.totalPrice = 0;
        this.elem = document.querySelector('.goods-list');
        this.fetchGoods()
            .then(data => this.manageData(data))
            .then(list => {
                this.totalPrice = this.calculateSum(list);
            });

    }
    /**
   * Gets product items from json
   * @returns {Promise<any | never>}
   */
    fetchGoods() {
        return fetch(`${API}/catalogData.json`)
            .then(res => res.json());
    }

    /**
     * Assign json data to Incoming list, render product items
     * @param json objects
     */
    manageData(data) {
        this.incomingList = data;
        this.renderGoods();
        //console.log(this.resultList);
    }

    /**
       * Create list of final products on the page, add them to markup
       */
    renderGoods() {
        console.log(this.incomingList);
        for (let item of this.incomingList) {
            const productItem = new Product(item);
            this.resultList.push(productItem);
            this.elem.insertAdjacentHTML('beforeend', productItem.renderGood())
        }
    }

    /**
       * Calculate total sum for products on the page from resulting list
       */
    calculateSum() {
        return this.resultList.reduce((sum, item) => sum += item.price, 0);
    }

}

/**
   * describes class for Cart Item
   */
class ShoppingCartItem extends Product {
    constructor(item) {
        super(item);
        this.qty = 1;
    }
    /**
       * creates markup for individual items inside shopping cart
       */
    renderCartItem() {
        let cartRow = `
        <div class="table_row" data-id="${this.id_product}">
            <div>${this.product_name}</div>
            <div>
                <span class="items_quantity" data-id="${this.id_product}">${this.qty}</span>
            </div>
            <div>$${this.price}</div>
            <div>
                $<span class="items_price" data-id="${this.id_product}">${this.price}</span>
            </div>
            <button class="trash" data-id="${this.id_product}"><i data-id="${this.id_product}" class="fa fa-trash"></i></button>
        </div>
    `;
        const totalCart = document.querySelector('.total_cart');
        totalCart.insertAdjacentHTML("beforebegin", cartRow);
    }
}
/**
   * describes class for Shopping Cart
   */
class ShoppingCart {
    constructor() {
        this.cartItems = [];
        this.init();
    }
    /**
       * Initialise Event listeners for displaying shopping cart conntent, Add item to cart, Delete item from cart
       */
    init() {
        const cart = document.querySelector('.cart');
        const shoppingcart = document.querySelector('.shoppingcart');
        cart.addEventListener('click', function () {
            shoppingcart.classList.toggle('none');
        })
        document.querySelector('.goods-list').addEventListener('click', e => {
            if (e.target.classList.contains('.to_cart')) {
                this.addItem(e.target);
            }
        });

        document.querySelector('.shoppingcart').addEventListener('click', e => {
            if (e.target.classList.contains('trash') || e.target.classList.contains('fa-trash')) {
                this.removeItem(e.target);
            }
        })
    }
    /**
     * Calls API for add to basket and if success: 
     * checks if some item is in the Cart already - increase quantity and update markup field with new value;
     *else: creates New Shoping cart Item and adds in markup for Shopping cart;
     * @param element elemen, that should be evaluated;
     */
    addItem(element) {
        fetch(`${API}/addToBasket.json`)
            .then(res => res.json())
            .then(data => {
                if (data.result === 1) {

                    let productId = element.dataset['id'];
                    let product = productList.resultList.find(product => product.id_product === +productId);
                    let itemInCart = this.cartItems.filter(item => item.id_product === +productId);
                    let isItemInCart = itemInCart.length > 0;

                    if (!isItemInCart) {
                        let cartItem = new ShoppingCartItem(product);
                        cartItem.renderCartItem();
                        this.cartItems.push({ ...cartItem, qty: 1 });
                        this.recalculateTotal(this.cartItems);
                        this.recalculateQty(this.cartItems)
                    } else {
                        itemInCart[0].qty++;
                        this.updateCartItem(product, itemInCart)
                        this.recalculateTotal(this.cartItems);
                        this.recalculateQty(this.cartItems)
                    }
                    product.qty = 1;

                }
            }
            );

    }
    /**
       * Calls API for delete to basket and if success:
       * deletes entire row with shopping cart item;
       * TODO: add check if moore than 1 exists - reduce qty;
       * @param element element for deletion;
       */
    removeItem(element) {
        fetch(`${API}/deleteFromBasket.json`)
            .then(res => res.json())
            .then(data => {
                if (data.result === 1) {
                    let productId = element.dataset['id'];
                    let itemInCart = this.cartItems.find(item => item.id_product === +productId);
                    this.cartItems.splice(this.cartItems.indexOf(itemInCart), 1);
                    let elemRow = document.querySelector(`.table_row[data-id="${itemInCart.id_product}"]`);
                    elemRow.remove();
                    this.recalculateTotal(this.cartItems);
                    this.recalculateQty(this.cartItems);
                }
            }
            );

    }
    /**
        * Update markup of the shopping cart with new calculated values for 
        * quantity and total price in row for each item;
        * @param product product to use id for selecting element on the page;
        * @param cartItem cart item to manipulate with qty and total price;
        */
    updateCartItem(product, itemInCart) {
        let elemQty = document.querySelector(`.items_quantity[data-id="${product.id_product}"]`);
        elemQty.textContent = `${itemInCart[0].qty}`;
        let elemPrice = document.querySelector(`.items_price[data-id="${product.id_product}"]`);
        elemPrice.textContent = `${itemInCart[0].qty * product.price}`;
    }
    /**
        * Recalculate total Cart Value after adding or removing cart Item
        * @param itemsList used for getting price and qty for each item;
        */
    recalculateTotal(itemsList) {
        let totalSum = 0;
        const counterTotal = document.querySelector('.counter_total');
        for (let i = 0; i < itemsList.length; i++) {
            totalSum += itemsList[i].price * itemsList[i].qty;
        }
        counterTotal.textContent = totalSum.toFixed(1);

    }
    /**
        * Recalculate total number of items to show on the Cart Circle counter
        * @param itemsList used for getting price and qty for each item;
        */
    recalculateQty(itemsList) {
        let totalQty = 0;
        const counterQty = document.querySelector('.circle');
        for (let i = 0; i < itemsList.length; i++) {
            totalQty += itemsList[i].qty;
        }
        counterQty.textContent = totalQty;

    }

}

let productList = new ProductList();
let shoppingCart = new ShoppingCart();




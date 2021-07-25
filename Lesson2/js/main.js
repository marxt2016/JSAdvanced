'use strict';

const cart = document.querySelector('.cart');
const shoppingcart = document.querySelector('.shoppingcart');
const totalCart = document.querySelector('.total_cart');
cart.addEventListener('click', function () {
    shoppingcart.classList.toggle('none');
})

class Product {
    constructor(item) {
        this.id = item.id || 0;
        this.title = item.title || "default";
        this.price = item.price || 0;
        this.img = item.img;
    }
    renderGood() {
        return `<div class="goods-item" data-id ="${this.id}">
                <img src = ${this.img} alt='nice'>
                <h3 >${this.title}</h3>
                <p class="price">$${this.price}</p>
                <button>Add to cart</button>
              </div>`;
    }
}

class ProductList {
    constructor() {
        this.incomingList = [];
        this.resultList = [];
        this.totalPrice = 0;
        this.elem = document.querySelector('.goods-list');
        this.fetchGoods();
        this.renderGoods();
    }

    fetchGoods() {
        this.incomingList = [
            { id: 1, title: 'Notebook', price: 1000, img: "https://picsum.photos/100?random=1" },
            { id: 2, price: 100, img: "https://picsum.photos/100?random=2" },
            { id: 3, title: 'Keyboard', price: 250, img: "https://picsum.photos/100?random=3" },
            { id: 4, title: 'Gamepad', img: "https://picsum.photos/100?random=4" },
        ];
    }
    renderGoods() {
        for (let item of this.incomingList) {
            const productItem = new Product(item);
            this.resultList.push(productItem);
            this.elem.insertAdjacentHTML('beforeend', productItem.renderGood())
        }
    }
    calculateSum() {
        for (let item of this.resultList) {
            this.totalPrice += item.price;
        }
        return this.totalPrice;
    }
}

class ShoppingCartItem extends Product {
    constructor(item, qty = 1) {
        super(item);
        this.qty = qty;
    }
    renderCartItem() {
        let cartRow = `
        <div class="table_row">
            <div>${this.title}</div>
            <div>
                <span class="items_quantity" data-id="${this.id}">${this.qty}</span>
            </div>
            <div>$${this.price}</div>
            <div>
                $<span class="items_price" data-id="${this.id}">${this.price}</span>
            </div>
        </div>
    `;
        totalCart.insertAdjacentHTML("beforebegin", cartRow);
    }


}
class ShoppingCart {
    constructor() {
        this.itemsList = [];
    }

    addItem(item, qty) {
        this.itemsList.push(new ShoppingCartItem(
            item,
            qty,
        ));
    }

    renderCart() {

    }

    deleteFromCart() {

    }
    calculateRowTotal() {

    }
    calculateTotalCartPrice() {

    }
    changeProductQuantity() {

    }
}



let productList = new ProductList();
console.log(productList.calculateSum());


// let shoppingCartItem = new ShoppingCartItem({ id: 1, title: 'Notebook', price: 1000, img: "https://picsum.photos/100?random=1" });
// shoppingCartItem.renderCartItem();
// let shoppingCart = new ShoppingCart();
// shoppingCart.addItem({ id: 1, title: 'Notebook', price: 1000, img: "https://picsum.photos/100?random=1" }, 1);
// console.log(shoppingCart);




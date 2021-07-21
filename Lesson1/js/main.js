'use strict';
const goods = [
    { id: 1, title: 'Notebook', price: 1000, img: "https://picsum.photos/100?random=1" },
    { id: 2, price: 100, img: "https://picsum.photos/100?random=2" },
    { id: 3, title: 'Keyboard', price: 250, img: "https://picsum.photos/100?random=3" },
    { id: 4, title: 'Gamepad', img: "https://picsum.photos/100?random=4" },
];

const renderGood = (title = 'default', price = 100, img) => {
    return `<div class="goods-item">
                <h3 >${title}</h3>
                <p class="price">$${price}</p>
                <img src = ${img} alt='nice'>
                <button>Add to cart</button>
              </div>`;
}

const renderGoods = (list) => {
    const goodsList = list.map((item) => {
        return renderGood(item.title, item.price, item.img);
    });

    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}

renderGoods(goods);


//Second approach with insert elements
let elem = document.querySelector('.goods-list');
/**
 * @param {goods[]} goods goods array
 * @param {HTMLDivElement} elem element to insert product item inside 
 */
function insertCardItems(goods, elem) {
    let productCard = '';
    goods.forEach((item) => {
        productCard += renderGood(item.title, item.price, item.img)
    });

    elem.insertAdjacentHTML('afterbegin', productCard);
}

insertCardItems(goods, elem);

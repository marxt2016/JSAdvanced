
function makeGETRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    setTimeout(() => { reject(new Error("Something went wrong")) }, 4000);
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
};




class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return new Promise((resolve) => {
            setTimeout(() => {
                makeGETRequest(`${API_URL}/catalogData.json`)
                    .then(goods => {
                        this.goods = JSON.parse(goods);
                        console.log('Fetch:', this.goods);
                        resolve(goods);
                    })
                    .catch(alert)
                    .finally(console.log("Finally is always completed."));

            }, 4000);
        })
    }

    render() {
        let listHtml = '';
        console.log("render = ", this.goods);
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods().then(() => list.render());


'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        goodsList: [],
        cartItems: [],
        searchLine: '',
        show: false,
        imgCatalog: 'https://picsum.photos/100'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addToCart(itemToAdd) {
            let itemInCart = this.cartItems.filter(item => item.id_product === itemToAdd.id_product);
            let isItemInCart = itemInCart.length > 0;
            if (!isItemInCart) {
                this.cartItems.push({ ...itemToAdd, qty: 1 });
            } else {
                itemInCart[0].qty++;
            }
            itemToAdd.qty = 1;
        },
        deleteItem(itemToDelete) {
            let itemInCart = this.cartItems.filter(item => item.id_product === itemToDelete.id_product);
            console.log(itemInCart[0]);
            if (itemInCart[0].qty > 1) {
                itemInCart[0].qty--;
            } else {
                this.cartItems.splice(itemInCart[0], 1);
            }


        }
    },

    computed: {
        search() {
            return this.goodsList.filter(good => {
                return good.product_name.toLowerCase().includes(this.searchLine.toLowerCase())
            });
        },

        totalPrice() {
            let totalPrice = 0;
            this.cartItems.forEach(item => {
                totalPrice += (item.price * item.qty);
            });
            return totalPrice;
        },
        totalQty() {
            let total = 0;
            this.cartItems.forEach(item => {
                total += (item.qty);
            });
            return total;
        },

    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.goodsList = data;
            });
    },
    // beforeCreated() {

    // },
    // beforeMount() {

    // },
    // mounted() {

    // },
    // beforeUpdate() {

    // },
    // updated() {

    // },
    // beforeDestroy() {

    // },
    // destroyed() {

    // },
});

'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        goodsList: [],
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
        addProduct(good) {
            console.log(good);
        }
    },

    computed: {
        search() {
            return this.goodsList.filter(good => {
                return good.product_name.toLowerCase().includes(this.searchLine.toLowerCase())
            });
        },

        Total() {
            let total = 0;

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

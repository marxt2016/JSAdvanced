const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responsesр';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.error.setError();
                })
        },
    },
    mounted() {
        console.log(this);
    }
});


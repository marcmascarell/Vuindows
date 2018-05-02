import Vue from 'vue';
import App from './App.vue';
import store from './store'

// Will be used for translations. Just a dummy method for now.
Vue.prototype.$t = key => key;

Vue.config.devtools = true;

new Vue({
    el: '#app',
    store,
    components: {
        App
    }
});

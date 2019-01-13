
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueImg from 'v-img';
import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource';
import Slider from './components/Slider.vue';
import Contact from './components/Contact.vue';

Vue.use(VueImg);
Vue.use(VeeValidate);
Vue.use(VueResource);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    components: { 
        "slider": Slider,
        "contact": Contact
    },
    mounted: function() {
        
    },
});
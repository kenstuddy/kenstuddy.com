/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import { createApp } from 'vue';
import 'vee-validate';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = createApp();

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan the components directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => {
    const name = key.split('/').pop().split('.')[0];
    app.component(name, files(key).default);
});

/**
 * Finally, we bind our Vue application instance to the HTML element with id app.
 * This allows our application to benefit from the interactivity provided by Vue.
 */
app.mount("#app");
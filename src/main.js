import { createApp } from 'vue';
import App from './App.vue';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#app');

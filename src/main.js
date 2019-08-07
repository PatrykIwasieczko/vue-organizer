import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFirestore from "vue-firestore";
import { fb } from "./firebase";
require("firebase/firestore");
import vuetify from "./plugins/vuetify";

import Swal from "sweetalert2";

window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;

Vue.use(VueFirestore, {
    key: "id", // the name of the property. Default is '.key'.
    enumerable: true //  whether it is enumerable or not. Default is true.
});

Vue.use(VueFirestore);

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            vuetify,
            render: h => h(App)
        }).$mount("#app");
    }
});

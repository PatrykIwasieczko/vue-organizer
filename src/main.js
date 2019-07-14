import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import VueFirestore from "vue-firestore";
import { fb } from "./firebase";
require("firebase/firestore");

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
            render: h => h(App)
        }).$mount("#app");
    }
});

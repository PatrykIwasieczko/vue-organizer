import Vue from "vue";
import Vuetify from "vuetify/lib";
//import "vuetify/src/stylus/app.styl";
import "vuetify/src/styles/main.sass";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "md",
        theme: {
            primary: "#9652ff",
            success: "#3cd1c2",
            info: "#ffaa2c",
            error: "#f83e70"
        }
    }
});

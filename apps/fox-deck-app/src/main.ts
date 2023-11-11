import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import VueFeather from "vue-feather";
import { InlineSvgPlugin } from "vue-inline-svg";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(InlineSvgPlugin);
app.use(createPinia());
app.use(router);
app.component(VueFeather.name, VueFeather);

app.mount("#app");

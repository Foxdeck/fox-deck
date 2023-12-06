import "./assets/main.css";
import {createApp} from "vue";
import {createPinia} from "pinia";
import VueFeather from "vue-feather";
import {InlineSvgPlugin} from "vue-inline-svg";
import {createI18n} from "vue-i18n";

import App from "./App.vue";
import router from "./router";
import {de} from "@/i18n/de";
import {en} from "@/i18n/en";
import Vue3Lottie from "vue3-lottie";

const app = createApp(App);

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    de
  },
  legacy: false
})

app.use(InlineSvgPlugin);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Vue3Lottie);
app.component(VueFeather.name, VueFeather);

app.mount("#app");

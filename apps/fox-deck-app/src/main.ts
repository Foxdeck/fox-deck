import "./assets/main.css";
import {createPinia} from "pinia";
import {createApp} from "vue";
import VueFeather from "vue-feather";
import {createI18n} from "vue-i18n";
import {InlineSvgPlugin} from "vue-inline-svg";

import {de} from "@/i18n/de";
import {en} from "@/i18n/en";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    de
  },
  legacy: false
});

app.use(InlineSvgPlugin);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.component(VueFeather.name, VueFeather);

app.mount("#app");

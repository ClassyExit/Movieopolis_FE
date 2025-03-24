import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/tailwind.css";
import "@/assets/main.css";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { vue3Debounce } from "vue-debounce";

// Iconify
import { Icon } from "@iconify/vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.directive("debounce", vue3Debounce({ lock: true }));
app.use(router);
app.use(pinia);
app.component("Icon", Icon);

app.mount("#app");

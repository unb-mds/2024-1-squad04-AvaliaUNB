// main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index.js";

createApp(App).use(router).mount("#app"); // monta o app

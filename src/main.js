import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Parent from "./Parent.vue";

createApp(App).mount("#app");
createApp(Parent).mount("#test");

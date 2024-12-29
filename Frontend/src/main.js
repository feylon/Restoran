import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "../Pages";
import naive from "naive-ui";
import { createPinia } from 'pinia'

import url from "../url"
import {fetchAdmin} from "../http"
// Developer settings
window.url = url;
window.fetchAdmin = fetchAdmin;
console.log(window.url)
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import all icons
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/vue-fontawesome

// Add all icons to the library
const solidIconValues = Object.values(solidIcons).filter(
  (icon) => icon.iconName
); // Filter valid icons
const regularIconValues = Object.values(regularIcons).filter(
  (icon) => icon.iconName
);
const brandIconValues = Object.values(brandIcons).filter(
  (icon) => icon.iconName
);

library.add(...solidIconValues, ...regularIconValues, ...brandIconValues);
const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(naive);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");


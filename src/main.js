import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import 'ant-design-vue/dist/reset.css';
import "./assets/main.css";
import './css/global.css';
const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.mount("#app");
app.use(Antd).mount('#app');

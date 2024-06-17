import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import ItemView from "../views/ItemView.vue";
import CartView from "../views/CartView.vue";
import AdministratorHomepage from "../views/AdministratorHomepage.vue";
import login from "../views/login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
      meta: { hideHeader: false },
    },
    {
      path: "/item/:id",
      name: "item",
      component: ItemView,
      meta: { hideHeader: false },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: { hideHeader: false },
    },
    {
      path: "/ad_homepage",
      name: "ad_homepage",
      component: AdministratorHomepage,
      meta: { hideHeader: true },
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { hideHeader: true },
    }
  ]
})

export default router;

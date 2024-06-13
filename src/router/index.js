import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import ItemView from "../views/ItemView.vue";
import CartView from "../views/CartView.vue";
import AdministratorHomepage from "../views/AdministratorHomepage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/item/:id",
      name: "item",
      component: ItemView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/ad_homepage",
      name: "ad_homepage",
      component: AdministratorHomepage,
      meta: { hideHeader: true },
    }
  ]
})

export default router;

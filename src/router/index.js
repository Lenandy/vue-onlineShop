import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import ItemView from "../views/ItemView.vue";
import CartView from "../views/CartView.vue";
import AdministratorHomepage from "../views/AdministratorHomepage.vue";
import DashBoard from "../views/DashBoard.vue";
import login from "../views/login.vue";
import MyOrder from "@/views/myorder.vue";
import FinishOrder from "@/views/FinishOrder.vue";
import ContactUs from '../components/ContactUs.vue'; // 引入新组件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/shop",
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
      path: "/dash",
      name: "dash",
      component: DashBoard,
      meta: { hideHeader: true },
    },
    {
      path: "/",
      name: "login",
      component: login,
      meta: { hideHeader: true },
    },
    {
      path: "/myorder",
      name: "myorder",
      component: MyOrder,
      meta: { hideHeader: false },
    },
    {
      path: "/finish_order",
      name: "finishorder",
      component: FinishOrder,
      meta: { hideHeader: false },
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs,
    }
  ]
})

export default router;

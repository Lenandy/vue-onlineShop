<script setup>
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";
import { UserOutlined, OrderedListOutlined } from '@ant-design/icons-vue';
const shop = useShopStore();
</script>

 template
<template>
  <!-- 导航栏容器，使用Flex布局确保元素水平居中并垂直对齐 -->
  <div class="flex justify-between items-center">
    <!-- 主页链接，使用SVG图标增强视觉效果 -->
    <RouterLink class="text-3xl" to="/shop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </RouterLink>
    <!-- 用户中心链接，使用Outline图标增强视觉效果 -->
    <RouterLink class="icon" to="/person">
      <UserOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>
    <!-- 购物车链接，显示购物车数量，使用Bag图标增强视觉效果 -->
    <RouterLink class="flex gap-2 text-gray-500 hover:text-black" to="/cart">
      <ShoppingBagIcon class="h-6 w-6" />
      <span class="text-black">{{ shop.cartQuantity }}</span>
    </RouterLink>
    <!-- 我的订单链接，使用Outline图标增强视觉效果 -->
    <RouterLink class="icon" to="/myorder">
      <OrderedListOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>
    <!-- 联系我们链接，不使用RouterLink，仅为普通链接 -->
    <router-link to="/contact-us">联系我们</router-link>
  </div>
</template>


<style scoped>
.icons-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 调整间距以使图标靠近，根据需要可以减小这个值 */
}
.icon {
  width: 24px !important; /* 确保所有图标大小一致，如果有需要也可以调整高度 */
  height: 24px !important;
}
</style>
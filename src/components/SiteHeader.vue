<script setup>
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";
import { UserOutlined, OrderedListOutlined } from '@ant-design/icons-vue';
const shop = useShopStore();
</script>

<template>
  <div class="flex justify-between items-center">
    <RouterLink class="text-3xl" to="/shop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </RouterLink>

    <RouterLink class="icon" to="/user">
      <UserOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>

    <RouterLink class="flex gap-2 text-gray-500 hover:text-black" to="/cart">
      <ShoppingBagIcon class="h-6 w-6" />
      <span class="text-black">{{ shop.cartQuantity }}</span>
    </RouterLink>

    <RouterLink class="icon" to="/myorder">
      <OrderedListOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>

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
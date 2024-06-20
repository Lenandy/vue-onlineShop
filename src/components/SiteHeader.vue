<script setup>
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";
import { UserOutlined, OrderedListOutlined, SendOutlined } from '@ant-design/icons-vue';
const shop = useShopStore();
</script>

<template>
  <div class="flex justify-between items-center">
    <!-- 商店首页链接，使用svg图标表示 -->
    <RouterLink class="text-3xl" to="/shop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </RouterLink>

    <!-- 用户中心链接，使用UserOutlined图标表示 -->
    <RouterLink class="icon" to="/user">
      <UserOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>

    <!-- 购物车链接，显示购物车数量，使用ShoppingBagIcon图标表示 -->
    <RouterLink class="flex gap-2 text-gray-500 hover:text-black" to="/cart">
      <ShoppingBagIcon class="h-6 w-6" />
      <span class="text-black">{{ shop.cartQuantity }}</span>
    </RouterLink>

    <!-- 我的订单链接，使用OrderedListOutlined图标表示 -->
    <RouterLink class="icon" to="/myorder">
      <OrderedListOutlined class="h-6 w-6" style="transform: scale(1.2);"/>
    </RouterLink>

    <!-- 联系我们链接，使用SendOutlined图标表示 -->
    <RouterLink class="icon contact-icon" to="/contact-us">
      <SendOutlined />
    </RouterLink>
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
.contact-icon { /* 添加一个特定类名以针对'联系我们'图标设置样式 */
  width: 24px;
  height: 24px;
  color: inherit; /* 使图标颜色继承父元素的文字颜色 */
  transition: transform 0.3s ease; /* 平滑的过渡效果，当鼠标悬停或其他交互时可考虑添加 */
}
.contact-icon:hover {
  transform: translateY(-2px); /* 示例：轻微上移，增加立体感或点击感 */
  cursor: pointer;
}
</style>
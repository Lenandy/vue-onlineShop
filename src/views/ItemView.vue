<script setup>
import { useRoute } from "vue-router";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

// 使用vue-router的useRoute钩子获取当前路由信息
const route = useRoute();

// 使用shop store的钩子来获取商店状态和操作
const shop = useShopStore();

/**
 * 根据当前路由参数id，在商店的促销商品列表中查找对应的商品。
 * 这样做是为了在页面加载时，自动选中对应的促销商品，提高用户体验。
 */
const item = shop.forSale.find((item) => item.id === route.params.id);

/**
 * 点击添加到购物车按钮时的处理函数。
 * 该函数将当前选中的商品添加到购物车中，促进购买行为。
 */
const addToCart = () => {
  shop.addToCart(item);
};
</script>


<template>
  <div class="flex flex-col md:flex-row gap-6">
    <!-- 展示商品图片 -->
    <img class="rounded-xl bg-beige" :src="item.photo" />

    <div class="flex flex-col gap-6 md:gap-8">
      <!-- 商品详情描述 -->
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold">{{ item.title }}</h2>
        <!-- 商品价格 -->
        <div class="text-2xl">${{ item.price / 100 }}</div>
        <!-- 商品描述 -->
        <div>{{ item.description }}</div>
      </div>

      <!-- 添加到购物车按钮 -->
      <button
        class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
        @click="addToCart"
      >
        <transition mode="out-in">
          <!-- 根据购物车状态显示不同消息 -->
          <div v-if="shop.addedMessageShown" class="flex gap-2">
            <CheckIcon class="w-6 h-6" />
            已经加入购物车！
          </div>
          <div v-else>加入购物车</div>
        </transition>
      </button>
    </div>
  </div>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

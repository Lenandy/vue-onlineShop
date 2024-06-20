<script setup>
import { RouterLink } from "vue-router";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
</script>

 template
<template>
  <!-- 使用网格布局以适应不同屏幕尺寸，展示商品列表 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-items-center">
    <!-- 遍历商店中上架的商品 -->
    <RouterLink
      class="w-56 flex flex-col gap-2"
      v-for="item in shop.forSale"
      :to="`/item/${item.id}`"
    >
      <!-- 展示商品的主图 -->
      <img
        class="rounded-md bg-beige"
        :src="item.photo"
        alt="280 by 320 pixel placeholder"
      />
      <!-- 显示商品的标题和价格 -->
      <div class="flex justify-between">
        <div>{{ item.title }}</div>
        <div class="font-bold">${{ item.price / 100 }}</div>
      </div>
    </RouterLink>
  </div>
</template>


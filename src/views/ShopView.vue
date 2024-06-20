<script setup>
import { RouterLink } from "vue-router";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
</script>

<template>
  <!-- 使用CSS Grid布局，根据屏幕尺寸调整列数，保证元素间距，居中显示 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-items-center">
    <!-- 遍历商店中上架的商品 -->
    <RouterLink
      class="w-56 flex flex-col gap-2"
      v-for="item in shop.forSale"
      :to="`/item/${item.id}`"
    >
      <!-- 商品图片，使用圆角矩形边框，背景色为米色 -->
      <img
        class="rounded-md bg-beige"
        :src="item.photo"
        alt="280 by 320 pixel placeholder"
      />
      <!-- 显示商品标题和价格 -->
      <div class="flex justify-between">
        <div>{{ item.title }}</div>
        <!-- 商品价格，使用粗体显示，单位为美元 -->
        <div class="font-bold">${{ item.price / 100 }}</div>
      </div>
    </RouterLink>
  </div>
</template>

 template
<script setup>
import { useRoute } from "vue-router";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

// 使用vue-router的useRoute钩子获取当前路由信息
const route = useRoute();

// 使用shop store钩子来获取和操作商店相关数据
const shop = useShopStore();

/**
 * 根据当前路由参数id，查找并获取正在销售的商品项
 *
 * 说明：
 * 使用shop.store中的forSale数组，查找与当前路由参数id匹配的商品项。
 * 这样做的目的是为了在页面上显示与路由相关联的具体商品详情。
 */
const item = shop.forSale.find((item) => item.id === route.params.id);

/**
 * 将当前商品添加到购物车
 *
 * 该方法被用于将当前显示的商品添加到用户的购物车中。
 * 它通过调用shop.store的addToCart方法，并传入当前商品item来实现。
 */
const addToCart = () => {
  shop.addToCart(item);
};
</script>


<template>
  <!-- 产品展示容器，使用Flex布局以适应不同屏幕尺寸 -->
  <div class="flex flex-col md:flex-row gap-6">
    <!-- 产品照片，使用圆形边框和特定背景色突出显示 -->
    <img class="rounded-xl bg-beige" :src="item.photo" />

    <!-- 产品详细信息容器，在大屏幕下与照片并排显示 -->
    <div class="flex flex-col gap-6 md:gap-8">
      <!-- 产品标题、价格和描述的容器 -->
      <div class="flex flex-col gap-2">
        <!-- 产品标题，使用加粗字体突出 -->
        <h2 class="text-2xl font-bold">{{ item.title }}</h2>
        <!-- 产品价格，使用特定字体大小显示 -->
        <div class="text-2xl">${{ item.price / 100 }}</div>
        <!-- 产品描述，提供产品详细信息 -->
        <div>{{ item.description }}</div>
      </div>
      <!-- 加入购物车按钮，使用Indigo颜色主题和动态过渡效果 -->
      <button
        class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
        @click="addToCart"
      >
        <!-- 根据购物车状态显示不同消息，使用过渡动画平滑切换 -->
        <transition mode="out-in">
          <div v-if="shop.addedMessageShown" class="flex gap-2">
            <!-- 加入购物车成功的图标，使用CheckIcon组件 -->
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

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 使用useShopStore钩子获取商店相关的状态和方法
const shop = useShopStore();

/**
 * 跳转到完成页面
 *
 * 该函数用于在用户完成购物车中的购买操作后，引导他们进入支付流程。
 * 它通过调用Vue Router的push方法来实现页面的无刷新跳转。
 */
const proceedToPayment = () => {
  router.push('/finish_order'); // 使用router.push进行页面跳转
};
</script>

<template>
  <div>
    <!-- 购物车页面标题 -->
    <h2 class="text-2xl">购物车</h2>

    <!-- 当购物车中有商品时，显示购物车内容和订单总览 -->
    <div v-if="shop.cartQuantity > 0" class="flex flex-col lg:flex-row lg:gap-6">
      <!-- 展示购物车中的商品列表 -->
      <div class="divide-y divide-gray-300 lg:w-2/3">
        <div v-for="item in shop.cart" :key="item.id" class="py-6 flex gap-4">
          <!-- 商品图片 -->
          <img class="w-32 bg-beige rounded-md" :src="item.photo" />
          <!-- 商品详情，包括名称和价格 -->
          <div class="flex justify-between w-full">
            <div class="w-9">
              <div>{{ item.title }}</div>
              <div class="text-sm">${{ item.price / 100 }}</div>
            </div>
            <!-- 商品数量选择器 -->
            <div>
              <select
                class="bg-white border border-gray-300 rounded px-2 py-1"
                v-model.number="item.quantity"
              >
                <option v-for="i in item.quantity > 10 ? item.quantity : 10">
                  {{ i }}
                </option>
              </select>
            </div>
            <!-- 删除商品按钮 -->
            <div>
              <XMarkIcon
                class="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
                @click="shop.removeItem(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 订单总览，包括订单金额和其他费用 -->
      <div class="bg-gray-100 rounded-md p-6 lg:w-1/3 flex flex-col gap-6">
        <h3 class="text-lg">金额总览</h3>
        <div class="divide-y divide-gray-300">
          <!-- 展示商品总价 -->
          <div class="py-3 flex justify-between">
            <div>价钱</div>
            <div>${{ shop.cartSubtotal / 100 }}</div>
          </div>
          <!-- 展示运费 -->
          <div class="py-3 flex justify-between">
            <div>运费</div>
            <div>${{ shop.cartShipping / 100 }}</div>
          </div>
          <!-- 展示服务费 -->
          <div class="py-3 flex justify-between">
            <div>服务费</div>
            <div>${{ (shop.cartTax / 100).toFixed(2) }}</div>
          </div>
          <!-- 展示订单总金额 -->
          <div class="py-3 flex justify-between font-bold">
            <div>订单总金额</div>
            <div>${{ (shop.cartTotal / 100).toFixed(2) }}</div>
          </div>
        </div>
        <!-- 结算按钮 -->
        <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3 w-full"
          @click="proceedToPayment"
        >
          付款
        </button>
      </div>
    </div>
    <!-- 当购物车中没有商品时，显示空购物车提示 -->
    <div v-else class="mt-10">
      <a-empty />
    </div>
  </div>
</template>


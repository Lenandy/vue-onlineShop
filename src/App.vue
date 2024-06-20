<template>
  <div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
    <!-- 根据shouldHideHeader的值决定是否渲染SiteHeader组件 -->
    <SiteHeader v-if="!shouldHideHeader" />
    <!-- 路由视图，用于渲染路由对应的组件 -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import SiteHeader from './components/SiteHeader.vue';

// 使用useRoute钩子获取当前路由信息
const route = useRoute();
// 初始化控制头部是否隐藏的ref
const shouldHideHeader = ref(false);

/**
 * 更新shouldHideHeader的值。
 * 根据当前路由的meta信息中是否包含hideHeader来决定是否隐藏头部。
 */
const updateShouldHideHeader = () => {
  shouldHideHeader.value = route.meta?.hideHeader ?? false;
  console.log('shouldHideHeader updated:', shouldHideHeader.value);
};

// 监视路由变化，路由变化时更新shouldHideHeader的值
watchEffect(() => {
  updateShouldHideHeader();
});
</script>

<template>
  <div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
    <SiteHeader v-if="!shouldHideHeader" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue'; // 导入Vue的响应式API和副作用函数
import SiteHeader from './components/SiteHeader.vue';

const route = useRoute();
const shouldHideHeader = ref(false); // 使用ref定义响应式数据

const updateShouldHideHeader = () => {
  shouldHideHeader.value = route.meta?.hideHeader ?? false;
  console.log('shouldHideHeader updated:', shouldHideHeader.value);
};

watchEffect(() => {
  updateShouldHideHeader();
});
</script>
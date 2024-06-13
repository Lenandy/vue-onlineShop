<template>
  <div class="container mx-auto p-5 md:p-10 flex flex-col gap-10">
    <SiteHeader v-if="!shouldHideHeader" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
const route = useRoute();
const shouldHideHeader = route.meta.hideHeader
console.log('shouldHideHeader:', shouldHideHeader);
</script>



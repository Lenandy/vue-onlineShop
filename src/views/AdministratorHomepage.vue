<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="onMenuSelect">
        <a-menu-item key="1">数据统计</a-menu-item>
        <a-menu-item key="2">类型管理</a-menu-item>
        <a-menu-item key="3">商品管理</a-menu-item>
        <a-menu-item key="4">订单管理</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', minWidth: '500px', overflowY: 'auto' }">
          <DashBoard v-if="activeTab === 'dash'" />
          <type-management-table v-if="activeTab === 'type'" />
          <commodity-management v-if="activeTab === 'commodity'" />
          <order-management v-if="activeTab === 'order'" />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Man What Can I Say Hahaha ©2024 Created by Lenandy
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import DashBoard from './DashBoard.vue';
import TypeManagementTable from './TypeManagementTable.vue';
import CommodityManagement from './CommodityManagement.vue';
import OrderManagement from './OrderManagement.vue';

const activeTab = ref('dash'); // 初始激活的表格类型
const collapsed = ref(false);
const selectedKeys = ref(['1']);

const onMenuSelect = (event: any) => {
  const key = event.key;
  switch (key) {
    case '1':
      activeTab.value = 'dash';
      break;
    case '2':
      activeTab.value = 'type';
      break;
    case '3':
      activeTab.value = 'commodity';
      break;
    case '4':
      activeTab.value = 'order';
      break;
    default:
      break;
  }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.table-container {
  /* 设定表格容器的最大宽度和高度 */
  max-width: 100%; /* 使容器宽度不超过其父元素宽度 */
  height: 300px; /* 根据需要设定一个固定高度，或使用max-height来限制最大高度 */
  overflow-y: auto; /* 超出内容时显示垂直滚动条 */
}

.type-management-table {
  /* 示例：确保表格100%填充容器宽度 */
  width: 100%;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.ant-layout-header {
  height: auto !important; /* 或者设置为您想要的具体高度 */
  padding: 0; /* 如果需要移除原有的内边距 */
}

</style>
<style scoped>
:deep(.md\:p-10) {
  @media (min-width: 768px) {
    padding: 0 !important;
  }
}
:deep(.p-5) {
  @media (min-width: 768px) {
    padding: 0 !important;
  }
}
:deep(.css-dev-only-do-not-override-19iuou).ant-table-wrapper table {
  width: 1200px;
  text-align: start;
  border-radius: 8px 8px 0 0;
  border-collapse: separate;
  border-spacing: 0;
}

</style>
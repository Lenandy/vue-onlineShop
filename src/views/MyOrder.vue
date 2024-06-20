<template>
  <div class="order-list">
    <a-card title="我的订单">
      <a-table :columns="columns" :data-source="orders" bordered :pagination="paginationConfig">
        <template #bodyCell="{ column, text, record }">
          <!-- 对于非操作列，如果text为空，则显示'-' -->
          <div
            v-if="['name', 'age', 'address'].indexOf(column.dataIndex) && !text"
            class="editable-cell-text-wrapper"
          >
            {{ '-' }}
          </div>

          <!-- 特别处理操作列，直接展示删除按钮 -->
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <a-popconfirm
                title="确定删除这条记录吗？"
                ok-text="删除"
                cancel-text="取消"
                @confirm="() => onDelete(record.key)"
              >
                <a href="javascript:;" class="delete-link">删除</a>
              </a-popconfirm>
            </div>
          </template>

          <!-- 如果是其他列且有文本内容，正常显示文本 -->
          <div v-else class="editable-cell-text-wrapper">
            {{ text }}
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { paginationConfig } from "ant-design-vue/es/pagination";
const generateOrderId = () => {
  const timestamp = new Date().getTime(); // 获取当前时间的时间戳
  const randomNum = Math.floor(Math.random() * 1000); // 生成0-999之间的随机数
  return `${timestamp}-${randomNum}`; // 结合时间戳和随机数生成订单号
};
const columns = [
  {
    title: '订单号',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '总价',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: '下单时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];

const orders = ref([
  {
    key: generateOrderId(),
    productName: '牛仔裤',
    totalPrice: '399元',
    createdAt: '2023-04-03',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    productName: '运动鞋',
    totalPrice: '499元',
    createdAt: '2023-04-05',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    productName: '皮夹克',
    totalPrice: '899元',
    createdAt: '2023-04-07',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '连衣裙',
    totalPrice: '599元',
    createdAt: '2023-04-10',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '卫衣',
    totalPrice: '349元',
    createdAt: '2023-04-12',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '休闲裤',
    totalPrice: '249元',
    createdAt: '2023-04-15',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '羽绒服',
    totalPrice: '999元',
    createdAt: '2023-04-18',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '短袖衬衫',
    totalPrice: '199元',
    createdAt: '2023-04-20',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    productName: '运动背包',
    totalPrice: '149元',
    createdAt: '2023-04-22',
    operation: '删除'

  },
  {
    key: generateOrderId(),
    productName: '棒球帽',
    totalPrice: '99元',
    createdAt: '2023-04-25',
    operation: '删除'

  },
]);

const pagination = {
  pageSize: 5,
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20'],
  operation: '删除'

};


const onDelete = (key: string) => {
  orders.value = orders.value.filter(item => item.key !== key);
};
</script>

<style lang="less" scoped>
.order-list {
  margin-top: 24px;
}
</style>
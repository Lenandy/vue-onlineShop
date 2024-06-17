<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" bordered :pagination="paginationConfig">
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
// 定义列，移除了编辑列
const columns = [
  {
    title: 'Id',
    dataIndex: 'key',
    width: '30%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'num',
  },
  {
    title: 'Amount',
    dataIndex: 'money',
  },
  // 移除了操作列的编辑链接，仅保留删除
  {
    title: 'Operation',
    dataIndex: 'operation',
  },
];

// 初始化数据源
const dataSource = ref([
  {
    key: generateOrderId(),
    name: '华为手机',
    num: '3',
    money: '$1000',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '苹果iPad',
    num: '2',
    money: '$800',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '小米电视',
    num: '1',
    money: '$500',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '索尼耳机',
    num: '5',
    money: '$200',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '联想笔记本',
    num: '1',
    money: '$1200',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '三星智能手表',
    num: '4',
    money: '$300',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '佳能相机',
    num: '1',
    money: '$700',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '戴森吹风机',
    num: '2',
    money: '$150',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '博朗剃须刀',
    num: '3',
    money: '$60',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: 'GoPro运动相机',
    num: '1',
    money: '$400',
    operation: '删除'
  },
]);

// 删除行
const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};

</script>

<style lang="less" scoped>
// 保留原有样式，未做改动
.editable-row-operations a {
  margin-right: 50px;
}
.editable-cell {
  position: relative;
  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

}
</style>
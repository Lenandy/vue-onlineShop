<template>
  <div>
    <!-- 使用Ant Design Vue的表格组件展示数据，包括列定义、数据源和分页配置 -->
    <a-table :columns="columns" :data-source="dataSource" bordered :pagination="paginationConfig">
      <!-- 定义表格单元格的自定义渲染 -->
      <template #bodyCell="{ column, text, record }">
        <!-- 对于特定列（name、num、money），如果文本为空，则显示'-' -->
        <!-- 对于非操作列，如果text为空，则显示'-' -->
        <div
          v-if="['name', 'num', 'money'].indexOf(column.dataIndex) && !text"
          class="editable-cell-text-wrapper"
        >
          {{ '-' }}
        </div>

        <!-- 对于操作列，显示删除按钮，通过弹出确认框确认删除操作 -->
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

        <!-- 对于其他列，正常显示文本内容 -->
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

/**
 * 生成唯一的订单号
 *
 * 该函数通过结合当前时间戳和一个随机数来生成一个唯一的订单号。
 * 时间戳保证了每个订单号在时间上的唯一性，而随机数则确保了在相同时间戳下也能产生不同的订单号。
 * 这种方法适用于简单场景下对订单号唯一性要求不高的应用。
 *
 * @returns {string} 由时间戳和随机数组成的唯一订单号
 */
const generateOrderId = () => {
  // 获取当前时间的时间戳，用于订单号的生成，确保时间上的唯一性
  const timestamp = new Date().getTime();
  // 生成一个0到999之间的随机数，用于在相同时间戳下增加订单号的唯一性
  const randomNum = Math.floor(Math.random() * 1000);
  // 将时间戳和随机数结合，形成最终的订单号
  // 返回`${timestamp}-${randomNum}`; // 结合时间戳和随机数生成订单号
  return `${timestamp}-${randomNum}`;
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
    name: '经典牛仔夹克',
    num: '3',
    money: '$100',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '运动跑步鞋',
    num: '2',
    money: '$150',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '休闲连帽衫',
    num: '1',
    money: '$80',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '高腰直筒牛仔裤',
    num: '5',
    money: '$70',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '轻薄羽绒服',
    num: '1',
    money: '$200',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '复古圆领T恤',
    num: '4',
    money: '$30',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '商务休闲裤',
    num: '1',
    money: '$90',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '时尚棒球帽',
    num: '2',
    money: '$20',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '运动束脚裤',
    num: '3',
    money: '$50',
    operation: '删除'
  },
  {
    key: generateOrderId(),
    name: '女士丝绸围巾',
    num: '1',
    money: '$60',
    operation: '删除'
  },
]);

/**
 * 删除列表中特定项的函数。
 *
 * 该函数通过过滤数据源数组，移除具有特定键值的项，从而实现从列表中删除该项的功能。
 * 它不直接修改原数组，而是创建一个新数组，新数组不包含被删除的项。
 *
 * @param {string} key - 要删除的项的键值。键值唯一标识列表中的每一项。
 * @returns {void} 该函数没有返回值，但它通过修改 `dataSource` 的值来产生效果。
 */
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
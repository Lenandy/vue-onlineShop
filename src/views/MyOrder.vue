<template>
  <div class="order-list">
    <!-- 使用Ant Design Vue的Card组件展示我的订单信息 -->
    <a-card title="我的订单">
      <!-- 使用Ant Design Vue的Table组件展示订单列表数据 -->
      <!-- columns定义表格的列，dataSource定义数据源，bordered设置表格边框，pagination设置分页配置 -->
      <a-table :columns="columns" :data-source="orders" bordered :pagination="paginationConfig">
        <!-- 使用template定义表格单元格的自定义渲染 -->
        <!-- #bodyCell表示定义表格主体内容的单元格渲染逻辑 -->
        <template #bodyCell="{ column, text, record }">
          <!-- 对于特定列（productName, totalPrice, createdAt），如果文本为空，则显示'-' -->
          <!-- 使用v-if进行条件判断，判断当前列是否为指定列且文本为空 -->
          <!-- editable-cell-text-wrapper用于样式控制 -->
          <div
            v-if="['productName', 'totalPrice', 'createdAt'].indexOf(column.dataIndex) >= 0 && !text"
            class="editable-cell-text-wrapper"
          >
            {{ '-' }}
          </div>

          <!-- 特殊处理操作列，显示删除按钮 -->
          <!-- 使用v-else-if进行条件判断，判断当前列是否为操作列 -->
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <!-- 使用a-popconfirm组件实现删除确认对话框 -->
              <!-- 点击删除链接触发onDelete方法，传入当前行的key作为参数 -->
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

          <!-- 对于其他列，正常显示文本 -->
          <!-- 使用v-else进行剩余情况的处理 -->
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

/**
 * 分页配置对象
 *
 * 该对象用于配置分页组件的属性，以满足特定的分页需求。
 * 下面是对象属性的详细说明：
 *
 * @property {number} pageSize - 每页显示的条目数量。默认为5条。
 * @property {boolean} showSizeChanger - 是否显示每页条数选择框。默认为true，即显示。
 * @property {Array<string>} pageSizeOptions - 可选的每页条数选项。默认提供['5', '10', '20']三个选项。
 * @property {string} operation - 分页操作按钮的文字内容。默认为'删除'。
 */
const pagination = {
  pageSize: 5,
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20'],
  operation: '删除'

};



/**
 * 删除订单项
 *
 * 该函数用于从订单列表中移除特定的订单项。它通过比较订单项的键值（key）与传入的键值来确定要删除的订单项，
 * 并更新订单列表以反映删除操作的结果。
 *
 * @param {string} key - 要删除的订单项的键值。键值是用于唯一标识订单项的字符串。
 * @returns {void} 该函数没有返回值，但它通过修改`orders`状态来间接影响应用程序的状态。
 */
const onDelete = (key: string) => {
  // 过滤掉键值不等于传入键值的订单项，从而实现删除特定订单项的效果
  orders.value = orders.value.filter(item => item.key !== key);
};

</script>

<style lang="less" scoped>
.order-list {
  margin-top: 24px;
}
</style>
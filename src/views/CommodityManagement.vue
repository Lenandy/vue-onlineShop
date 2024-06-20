<template>
  <div>
    <!-- 点击按钮以添加新的行数据 -->
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">
      增加
    </a-button>
    <!-- 表格展示编辑前的数据，支持新增、编辑和删除操作 -->
    <a-table :columns="columns" :data-source="dataSource"  bordered :pagination="paginationConfig">
      <!-- 定义表格单元格的模板，以支持编辑功能 -->
      <template #bodyCell="{ column, text, record }">
        <!-- 当列索引为'name', 'num', 'address'时，显示编辑框 -->
        <template v-if="[ 'name', 'num', 'address' ].indexOf(column.dataIndex) !== -1">
          <div class="editable-cell">
            <!-- 当单元格处于编辑状态时 -->
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <!-- 使用input字段编辑单元格内容，按下回车键保存 -->
              <a-input
                v-model:value="editableData[record.key][column.dataIndex]"
                @pressEnter="save(record.key)"
              />
              <!-- 点击复选标记保存编辑内容 -->
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <!-- 当单元格未处于编辑状态时 -->
            <div v-else class="editable-cell-text-wrapper">
              <!-- 显示单元格的文本内容，如果没有则显示空格 -->
              {{ text || ' ' }}
              <!-- 点击笔形图标进入编辑状态 -->
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>
        <!-- 当列索引为'operation'时，显示操作列 -->
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <!-- 当单元格处于编辑状态时，显示保存和取消编辑的选项 -->
            <span v-if="editableData[record.key]">
              <!-- 点击保存直接保存编辑内容 -->
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <!-- 点击取消弹出确认框，确认后保存编辑内容 -->
              <a-popconfirm title="确认保存更改吗？" ok-text="确认" cancel-text="取消" :show-cancel-button="true" @confirm="save(record.key)" @cancel="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <!-- 当单元格未处于编辑状态时，显示编辑和删除的选项 -->
            <span v-else>
              <!-- 点击编辑进入编辑状态 -->
              <a @click="edit(record.key)">编辑</a>
              <!-- 点击删除弹出确认框，确认后删除当前行数据 -->
              <a-popconfirm title="确定删除这条记录吗？" ok-text="删除" cancel-text="取消" @confirm="onDelete(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { paginationConfig } from "ant-design-vue/es/pagination";

// 定义列
const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '仓库地址',
    dataIndex: 'address',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

// 初始化数据源
const dataSource = ref<DataItem[]>([]);
for (let i = 0; i < 10; i++) {
  dataSource.value.push({
    key: i.toString(),
    name: `服装 ${i}`,
    num: 88,
    address: '村民家里',
  });
}

/**
 * 可编辑数据的存储对象，键值对形式，用于存放即将被编辑的数据。
 * @type {Record<string, any>}
 */
const editableData: Record<string, any> = reactive({});

/**
 * 将数据源中的特定项标记为可编辑状态。
 * @param {string} key - 需要编辑的数据项的键。
 *
 * 此函数的目的是从数据源中找到特定的项，并将其复制到`editableData`中，
 * 以便用户可以编辑这个项。通过复制，我们可以保持数据源的原始状态，
 * 并在用户完成编辑后，选择是否将更改应用回数据源。
 */
const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.find(item => key === item.key));
};

/**
 * 保存编辑后的数据。
 *
 * 此函数用于处理特定键值的数据显示状态从可编辑到不可编辑的转变，
 * 它会将当前编辑中的数据合并到原始数据源中，并清除编辑状态。
 * 这确保了数据的更新并保持了界面显示的一致性。
 *
 * @param {string} key - 需要保存的数据项的键值。
 */
const save = (key: string) => {
  // 在数据源中查找与给定键相匹配的记录。
  const record = dataSource.value.find(item => key === item.key);
  // 如果找到了匹配的记录，则将编辑后的数据合并到该记录中，并清除编辑状态。
  if (record) {
    Object.assign(record, editableData[key]);
    delete editableData[key];
  }
};


// 取消编辑
const cancel = (key: string) => {
  delete editableData[key];
};

// 删除行
const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};

// 添加新行
const handleAdd = () => {
  const newKey = `${dataSource.value.length}`;
  const newData: DataItem = {
    key: newKey,
    name: `服装 ${newKey}`,
    num: 88,
    address: '村民家里',
  };
  dataSource.value.push(newData);
};

// 类型定义
interface DataItem {
  key: string;
  name: string;
  num: number;
  address: string;
}
</script>

<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 50px;
}
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
</style>
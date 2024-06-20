 template
<template>
  <div>
    <!-- 点击按钮增加一行数据 -->
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">
      增加
    </a-button>

    <!-- 使用表格展示数据，包括编辑和分页功能 -->
    <!-- 表格组件，整合编辑和分页功能 -->
    <a-table :columns="columns" :data-source="dataSource"  bordered :pagination="paginationConfig">
      <!-- 自定义单元格内容，以支持编辑功能 -->
      <!-- 自定义单元格内容 -->
      <template #bodyCell="{ column, text, record }">
        <!-- 对于指定的可编辑列 -->
        <!-- 对于可编辑的列 -->
        <template v-if="[ 'name', 'num', 'address' ].indexOf(column.dataIndex) !== -1">
          <div class="editable-cell">
            <!-- 当单元格处于编辑状态时 -->
            <!-- 编辑模式 -->
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input
                v-model:value="editableData[record.key][column.dataIndex]"
                @pressEnter="save(record.key)"
              />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <!-- 当单元格处于非编辑状态时 -->
            <!-- 非编辑模式 -->
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>
        <!-- 操作列，提供编辑和删除功能 -->
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <!-- 保存当前行的编辑 -->
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <!-- 确认保存更改的弹窗 -->
              <!-- 修改了弹窗文案和按钮文案，确保逻辑清晰 -->
              <a-popconfirm title="确认保存更改吗？" ok-text="确认" cancel-text="取消" :show-cancel-button="true" @confirm="save(record.key)" @cancel="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <!-- 开始编辑当前行 -->
              <a @click="edit(record.key)">编辑</a>
              <!-- 确认删除当前行的弹窗 -->
              <!-- 确保删除操作的文案和逻辑清晰 -->
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
import { computed, reactive, ref } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { paginationConfig } from "ant-design-vue/es/pagination";

// 定义列
const columns = [
  {
    title: '种类名称',
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
for (let i = 0; i < 5; i++) {
  dataSource.value.push({
    key: i.toString(),
    name: `服装种类 ${i}`,
    num: 66,
    address: `虚空`,
  });
}

// 编辑数据的存储
const editableData: Record<string, any> = reactive({});

// 编辑行
const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.find(item => key === item.key));
};

// 保存编辑
const save = (key: string) => {
  const record = dataSource.value.find(item => key === item.key);
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

// 确认对话框的确认操作

// 添加新行
const handleAdd = () => {
  const newKey = `${dataSource.value.length}`;
  const newData: DataItem = {
    key: newKey,
    name: `服装种类 ${newKey}`,
    num: 32,
    address: '虚空',
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
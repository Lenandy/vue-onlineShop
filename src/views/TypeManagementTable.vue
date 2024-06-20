<template>
  <div>
    <!-- 点击按钮以添加新的行数据 -->
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">
      增加
    </a-button>

    <!-- 表格展示编辑前的数据，支持新增、编辑和删除操作 -->
    <a-table :columns="columns" :data-source="dataSource"  bordered :pagination="paginationConfig">
      <template #bodyCell="{ column, text, record }">
        <!-- 判断列是否可编辑 -->
        <template v-if="[ 'name', 'num', 'address' ].indexOf(column.dataIndex) !== -1">
          <div class="editable-cell">
            <!-- 当前单元格处于编辑状态时的显示 -->
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input
                v-model:value="editableData[record.key][column.dataIndex]"
                @pressEnter="save(record.key)"
              />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <!-- 当前单元格处于查看状态时的显示 -->
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>
        <!-- 操作列，提供编辑和删除按钮 -->
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <!-- 当前行处于编辑状态时的操作 -->
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <a-popconfirm title="确认保存更改吗？" ok-text="确认" cancel-text="取消" :show-cancel-button="true" @confirm="save(record.key)" @cancel="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <!-- 当前行处于查看状态时的操作 -->
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
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

// 定义表格的列配置
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

/**
 * 可编辑的数据对象，用于存储数据源中的项在编辑状态下的副本。
 */
const editableData: Record<string, any> = reactive({});

/**
 * 开始编辑指定键对应的项。
 * @param {string} key 需要进入编辑状态的项的键。
 */
const edit = (key: string) => {
  // 复制数据源中对应键的项到editableData，以便在不修改原始数据的情况下进行编辑。
  editableData[key] = cloneDeep(dataSource.value.find(item => key === item.key));
};

/**
 * 保存编辑后的项回数据源。
 * @param {string} key 编辑项的键。
 */
const save = (key: string) => {
  // 查找数据源中对应键的项。
  const record = dataSource.value.find(item => key === item.key);
  if (record) {
    // 将editableData中编辑后的数据合并到原始记录中，完成保存。
    // 同时，删除editableData中对应的项，因为编辑已经完成。
    Object.assign(record, editableData[key]);
    delete editableData[key];
  }
};


/**
 * 删除指定键对应的可编辑数据项。
 * @param {string} key - 要删除的数据项的键。
 */
const cancel = (key: string) => {
  delete editableData[key];
};

/**
 * 从数据源中移除指定键的数据项。
 * @param {string} key - 要移除的数据项的键。
 */
const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};

/**
 * 添加一个新的数据项到数据源中。
 */
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



/**
 * DataItem 接口定义了数据对象的结构。
 *
 * @property {string} key - 数据项的唯一标识符。
 * @property {string} name - 数据项的名称。
 * @property {number} num - 数据项的数值，用于统计或排序。
 * @property {string} address - 数据项的地址信息。
 */
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
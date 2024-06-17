<template>
    <div>
        <div ref="pieChartRef" class="chart" />
        <div ref="lineChartRef" class="chart" />
        <a-table :dataSource="tableData" :columns="columns" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Pie, Line } from '@antv/g2plot';

const pieChartRef = ref(null);
const lineChartRef = ref(null);

const pieData = [
    { genre: '手机', sold: 101 },
    { genre: '平板', sold: 82 },
    { genre: '电脑', sold: 91 },
    { genre: '显卡', sold: 114 },
    { genre: '处理器', sold: 103 },
    { genre: '原石', sold: 95 },
    { genre: '鼠标', sold: 115 },
];

const tableData = [
    { name: '手机', orders: 2425, earnings: '$24,456' },
    { name: '平板', orders: 1232, earnings: '$43,212' },
    { name: '电脑', orders: 2552, earnings: '$21,213' },
    { name: '显卡', orders: 4222, earnings: '$13,2213' },
    { name: '处理器', orders: 4332, earnings: '$44,2514' },
    { name: '原石', orders: 369, earnings: '$43,2218' },
    { name: '鼠标', orders: 1145, earnings: '$23,219' },
    // ...更多数据
];


const lineData = [
    { date: 'Mon', sold: 1232 },
    { date: 'Tue', sold: 1332 },
    { date: 'Wed', sold: 643 },
    { date: 'Thu', sold: 854 },
    { date: 'Fri', sold: 345 },
    { date: 'Sat', sold: 666 },
    { date: 'Sun', sold: 1827 },
// 更多数据
];
onMounted(() => {
    createCharts();
});

function createCharts() {
    // 创建饼图实例
    const piePlot = new Pie(pieChartRef.value, {
        data: pieData,
        radius: 0.8,
        angleField: 'sold',
        colorField: 'genre',
        label: {
            content: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
        },
        interactions: [{ type: 'element-active' }],
    });
    piePlot.render();

    // 注意：直接在模板中使用ElTable显示表格，无需在此处创建实例

    // 创建时间序列图实例
    const linePlot = new Line(lineChartRef.value, {
        data: lineData,
        xField: 'date',
        yField: 'sold',
        smooth: true,
        point: {
            visible: true,
        },
    });
    linePlot.render();
}
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 180,
        align: 'center',
    },
    {
        title: 'Orders',
        dataIndex: 'orders',
        width: 180,
        align: 'center',
    },
    {
        title: 'Earnings',
        dataIndex: 'earnings',
        align: 'center',
    },
];
</script>

<style scoped>
.chart {
    display: inline-block;
    width: 300px;
    height: 300px;
    margin-right: 300px;
}


</style>
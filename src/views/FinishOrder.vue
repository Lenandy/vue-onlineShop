<template>
  <div>
    <a-steps
      progress-dot
      :current="1"
      :items="[
        {
          title: '待付款',
          description: 'ing...',
        },
        {
          title: '已付款',
          description: 'ing...',
        },
        {
          title: '快递中',
          description: 'ing...',
        },
        {
          title: '已收货',
          description: 'ing...',
        },
      ]"
    ></a-steps>
    <a-divider />
    <a-steps
      progress-dot
      :current="3"
      direction="vertical"
      :items="[
        {
          title: '已付款',
          description: '请您耐心等待',
        },
        {
          title: '正在生成订单',
          description: '请您耐心等待',
        },
        {
          title: '订单已到达商家',
          description: '请您耐心等待',
        },
        {
          title: '正在移交快递',
          description: '请您耐心等待',
        },
        {
          title: '成功移交快递',
          description: '请您耐心等待',
        },
      ]"
    ></a-steps>
  </div>
</template>

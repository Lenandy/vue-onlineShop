<template>
  <div class="contact-us">
    <!-- 联系我们页面标题 -->
    <h1>Contact Us</h1>
    <!-- 页面描述，引导用户如何联系我们 -->
    <p>有任何问题或建议，请随时联系我们。</p>

    <!-- 联系方式区域，展示公司的联系电话、邮箱和地址 -->
    <section class="contact-info">
      <h2>12312341234</h2>
      <p>电话: 000-123-4567</p>
      <p>Email: 123123123@qq.com</p>
      <p>地址: 123 麻涌镇, 东莞市, </p>
    </section>

    <!-- 联系表单，用户可以输入姓名、邮箱和消息，然后提交表单 -->
    <form @submit.prevent="submitForm" class="contact-form">
      <!-- 姓名输入框 -->
      <input v-model="name" type="text" placeholder="姓名" required/>
      <!-- 邮箱输入框 -->
      <input v-model="email" type="email" placeholder="邮箱" required/>
      <!-- 消息输入框 -->
      <textarea v-model="message" placeholder="您的消息" required></textarea>
      <!-- 提交按钮 -->
      <button type="submit">提交</button>
    </form>
  </div>
</template>


 template
<script>
import { ref } from 'vue';

export default {
  setup() {
    // 使用ref创建三个响应式变量，分别用于存储姓名、电子邮件和消息
    const name = ref('');
    const email = ref('');
    const message = ref('');

    /**
     * 提交表单时被调用的函数。
     * 目前该函数仅打印表单数据到控制台，并清空表单字段。
     * 在实际应用中，这里可以添加逻辑来发送表单数据到服务器。
     */
    const submitForm = () => {
      // 打印表单数据到控制台
      console.log('表单提交:', { name: name.value, email: email.value, message: message.value });
      // 清空表单
      name.value = '';
      email.value = '';
      message.value = '';
    };

    // 返回包含表单字段和提交函数的对象
    return { name, email, message, submitForm };
  },
};
</script>


<style scoped>
.contact-us {
  /* 页面基本样式 */
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0
}

.contact-us h1, .contact-us h2 {
  text-align: center;
  color: #333;
}

.contact-info {
  /* 联系方式区域样式 */
  margin-bottom: 30px;
}

.contact-info p {
  line-height: 1.5;
}

.contact-form {
  /* 表单区域样式 */
  display: flex;
  flex-direction: column;
}

.contact-form input, .contact-form textarea {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  resize: none;
}

.contact-form button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
}

.contact-form button:hover {
  background-color: #0056b3;
}
</style>
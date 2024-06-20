<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <p>有任何问题或建议，请随时联系我们。</p>

    <!-- 联系方式展示区域 -->
    <section class="contact-info">
      <h2>12312341234</h2>
      <p>电话: 000-123-4567</p>
      <p>Email: 123123123@qq.com</p>
      <p>地址: 123 麻涌镇, 东莞市, </p>
    </section>

    <!-- 联系表单 -->
    <form @submit.prevent="submitForm" class="contact-form">
      <input v-model="name" type="text" placeholder="姓名" required/>
      <input v-model="email" type="email" placeholder="邮箱" required/>
      <textarea v-model="message" placeholder="您的消息" required></textarea>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const submitForm = () => {
      // 这里可以添加逻辑来处理表单提交，比如发送数据到后端服务器
      console.log('表单提交:', { name: name.value, email: email.value, message: message.value });
      // 清空表单
      name.value = '';
      email.value = '';
      message.value = '';
    };

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
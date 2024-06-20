<template>
  <!-- 联系我们页面的容器 -->
  <div class="contact-us">
    <!-- 页面标题 -->
    <h1>Contact Us</h1>
    <!-- 介绍性文字 -->
    <p>有任何问题或建议，请随时联系我们。</p>

    <!-- 显示联系方式的部分 -->
    <section class="contact-info">
      <!-- 示例电话号码 -->
      <h2>12312341234</h2>
      <p>电话: 000-123-4567</p>
      <p>Email: 123123123@qq.com</p>
      <p>地址: 123 麻涌镇, 东莞市, </p>
    </section>

    <!-- 用户提交信息的表单 -->
    <form @submit.prevent="submitForm" class="contact-form">
      <!-- 姓名输入框 -->
      <input v-model="name" type="text" placeholder="姓名" required/>
      <!-- 邮箱输入框，包含实时验证 -->
      <input v-model="email" type="email" placeholder="邮箱" @input="validateEmail" :class="{ 'has-error': emailError }" required/>
      <!-- 留言文本域 -->
      <textarea v-model="message" placeholder="您的消息" required></textarea>
      <!-- 提交按钮 -->
      <button type="submit">提交</button>
    </form>

    <!-- 提交成功或失败的反馈信息 -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 定义响应式数据
    const name = ref(''); // 用户名
    const email = ref(''); // 用户邮箱
    const message = ref(''); // 用户留言
    const emailError = ref(false); // 邮箱输入错误状态
    const emailErrorMsg = ref(''); // 邮箱错误信息提示
    const successMessage = ref(''); // 提交成功信息
    const errorMessage = ref(''); // 提交失败信息

    // 验证邮箱格式的方法
    const validateEmail = () => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!regex.test(email.value)) {
        emailError.value = true; // 设置错误状态为true
        emailErrorMsg.value = '请输入有效的邮箱地址'; // 设置错误信息
      } else {
        emailError.value = false; // 重置错误状态为false
        emailErrorMsg.value = ''; // 清空错误信息
      }
    };

    // 表单提交处理方法
    const submitForm = async () => {
      try {
        // 模拟异步提交表单，实际应用中需替换为API调用
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 提交成功后的处理
        successMessage.value = '表单提交成功！'; // 显示成功信息
        errorMessage.value = ''; // 清空错误信息
        // 清空表单
        name.value = '';
        email.value = '';
        message.value = '';
        emailError.value = false; // 重置邮箱错误状态
      } catch (error) {
        // 提交失败的处理
        errorMessage.value = '表单提交失败，请重试。'; // 显示错误信息
        successMessage.value = ''; // 清空成功信息
      }
    };

    // 返回所有响应式数据和方法，供模板使用
    return { name, email, message, submitForm, emailError, emailErrorMsg, validateEmail, successMessage, errorMessage };
  },
};
</script>

<style scoped>
/* 页面整体样式 */
.contact-us {
  max-width: 800px; /* 最大宽度限制 */
  margin: 50px auto; /* 自动水平居中 */
  padding: 20px; /* 内边距 */
  background-color: #f8f9fa; /* 背景 */
  border-radius: 5px; /* 圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 盒阴影，添加轻微阴影效果 */
}

/* 标题和子标题样式 */
.contact-us h1, .contact-us h2 {
  text-align: center; /* 文字居中 */
  color: #333; /* 深灰字体颜色 */
}

/* 联系信息区域样式 */
.contact-info {
  margin-bottom: 30px; /* 下边距 */
}

/* 联系信息区域内的段落样式 */
.contact-info p {
  line-height: 1.5; /* 行高 */
}

/* 表单区域样式 */
.contact-form {
  display: flex;
  flex-direction: column; /* 垂直排列表单元素 */
}

/* 表单输入框和文本域通用样式 */
.contact-form input, .contact-form textarea {
  margin-bottom: 15px; /* 下边距 */
  padding: 10px; /* 内边距 */
  border: 1px solid #dee2e6; /* 边框 */
  border-radius: 3px; /* 圆角 */
  background-color: #fff;  /* 纯白背景 */
  transition: border-color 0.3s ease; /* 输入框边框过渡效果 */
  outline: none; /* 移除焦点边框 */
  resize: none; /* 禁止调整文本域大小 */
}

.contact-form input:focus, .contact-form textarea:focus {
  border-color: #007bff; /* 集中时边框变蓝，吸引注意力 */
}

/* 提交按钮样式 */
.contact-form button {
  padding: 10px 20px; /* 内边距 */
  background-color: #007BFF; /* 蓝色背景 */
  color: white; /* 白色文字 */
  border: none; /* 无边框 */
  cursor: pointer; /* 鼠标指针为手型 */
  border-radius: 3px; /* 圆角 */
  text-transform: uppercase; /* 文字转大写 */
  font-weight: bold; /* 加粗 */
  background-color: #007bff; /* 主题色按钮 */
  transition: background-color 0.3s ease; /* 按钮颜色过渡 */
}

/* 按钮悬停样式 */
.contact-form button:hover {
  background-color: #0056b3; /* 悬停时加深颜色 */
}

/* 邮箱输入错误样式 */
.has-error {
  border-color: red; /* 边框变红 */
}

/* 成功和错误消息的通用样式 */
.success-message,
.error-message {
  margin-top: 10px; /* 上边距 */
  padding: 10px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
}

/* 成功消息样式 */
.success-message {
  color: green; /* 绿色文字 */
  background-color: #f2fff2; /* 浅绿色背景 */
}

/* 错误消息样式 */
.error-message {
  color: red; /* 红色文字 */
  background-color: #ffebee; /* 浅红色背景 */
}
</style>
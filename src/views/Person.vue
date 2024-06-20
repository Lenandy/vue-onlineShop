<template>  
  <!-- 个人信息的容器 -->  
  <div class="personal-info">  
    <!-- 标题 -->  
    <h2>个人信息</h2>  
  
    <!-- 姓名输入部分 -->  
    <div>  
      <label for="name">姓名:</label>  
      <input type="text" id="name" v-model="userInfo.name" placeholder="请输入姓名">  
    </div>  
  
    <!-- 年龄输入部分，使用v-model.number确保输入的是数字 -->  
    <div>  
      <label for="age">年龄:</label>  
      <input type="number" id="age" v-model.number="userInfo.age" placeholder="请输入年龄">  
    </div>  
  
    <!-- 邮箱输入部分 -->  
    <div>  
      <label for="email">邮箱:</label>  
      <input type="email" id="email" v-model="userInfo.email" placeholder="请输入邮箱">  
    </div>  
  
    <!-- 电话输入部分 -->  
    <div>  
      <label for="phone">电话:</label>  
      <input type="tel" id="phone" v-model="userInfo.phone" placeholder="请输入电话">  
    </div>  
  
    <!-- 保存按钮，点击后触发saveInfo方法 -->  
    <button @click="saveInfo">保存信息</button>  
  
    <!-- 消息显示，当message有值时显示 -->  
    <p v-if="message">{{ message }}</p>  
  </div>  
</template>  
  
<script>  
export default {  
  // 组件的数据  
  data() {  
    return {  
      // 用户信息的对象  
      userInfo: {  
        name: '',       // 姓名  
        age: null,      // 年龄，初始化为null  
        email: '',      // 邮箱  
        phone: ''       // 电话  
      },  
      // 显示的消息，用于反馈保存操作的结果  
      message: ''  
    };  
  },  
  // 组件的方法  
  methods: {  
    // 保存信息的方法  
    saveInfo() {  
      // 显示一个消息。  
      this.message = '信息已保存！';  
     
    }  
  }  
};  
</script>  
  
<style scoped>  
/* 个人信息容器的样式 */  
.personal-info {  
  padding: 20px;  
  border: 1px solid #ccc;  
  border-radius: 5px;  
}  
  
/* 个人信息容器内的输入框样式 */  
.personal-info input {  
  margin-bottom: 10px;  
  padding: 5px;  
  width: 200px;  
}  
  
/* 个人信息容器内的按钮样式 */  
.personal-info button {  
  padding: 5px 10px;  
  margin-top: 10px;  
}  
</style>
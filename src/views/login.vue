<template>
    <div class="login">
        <form ref="loginForm" @submit.prevent="onSubmit">
            <div class="form">
                <h2>登入</h2>
                <div class="form-field">
                    <label for="login-mail"><i class="fa fa-user"></i></label>
                    <input id="login-mail" type="text" name="mail" placeholder="账号" required>
                    <svg>
                        <use href="#svg-check" />
                    </svg>
                </div>
                <div class="form-field">
                    <label for="login-password"><i class="fa fa-lock"></i></label>
                    <input id="login-password" type="password" name="password" placeholder="密码" pattern=".{6,}" required>
                    <svg>
                        <use href="#svg-check" />
                    </svg>
                </div>
                <button type="submit" class="button">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN IN</p>
                </button>
            </div>
            <div class="finished">
                <svg>
                    <use href="#svg-check" />
                </svg>
            </div>
        </form>
        <svg style="display:none;">
            <symbol id="svg-check" viewBox="0 0 130.2 130.2">
                <polyline points="100.2,40.2 51.5,88.8 29.8,67.5"/>
            </symbol>
        </svg>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    mounted() {
        document.body.style.background = "linear-gradient(135deg, #4D4E63, #333342)";
    },
    setup() {
        const loginForm = ref(null);

        const onSubmit = (event) => {
            event.preventDefault(); // 阻止表单默认提交行为

            // 固定的账号密码组合
            const fixedAccounts = [
                { username: 'user', password: 'user123', role: 'user', redirect: '/shop' },
                { username: 'admin', password: 'admin123', role: 'admin', redirect: '/ad_homepage' },
            ];

            const enteredMail = event.target.mail.value;
            const enteredPassword = event.target.password.value;

            // 验证账号密码
            const matchedAccount = fixedAccounts.find(account =>
                account.username === enteredMail && account.password === enteredPassword
            );

            if (matchedAccount) {
                // 账号匹配成功，根据角色跳转页面
                setTimeout(() => {
                    loginForm.value.classList.add('loading');
                }, 200);

                setTimeout(() => {
                    loginForm.value.classList.add('active');
                    navigateTo(matchedAccount.redirect);
                }, 220); // 直接等待2.2秒后执行跳转，简化了之前的延迟逻辑
            } else {
                alert('账号或密码错误！');
            }
        };

        const navigateTo = (route) => {
            window.location.href = route;
        };

        return {
            loginForm,
            onSubmit,
        };
    }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300);

body {
  background: linear-gradient(135deg, #4D4E63, #333342);  /* 背景使用135度的线性渐变，由#4D4E63到#333342颜色 */
  height: 100vh;  /* 高度占满整个视窗 */
  font-family: 'Roboto', sans-serif;  /* 字体系列为'Roboto'，若不可用则使用sans-serif */
  font-size: 16px;  /* 字体大小为16像素 */

}

.login {
  width: 420px;  /* 宽度为420px */
  background: #ffffff;  /* 背景颜色为白色 */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);  /* 设置阴影效果，阴影偏移为0 20px，模糊度为50px，颜色为rgba(0, 0, 0, 0.1) */
  border-radius: 12px;  /* 设置元素的圆角半径为12px */
  overflow: hidden;  /* 隐藏溢出内容 */
  position: absolute;  /* 绝对定位 */
  top: 50%;  /* 上边界相对于视口的垂直距离为50% */
  left: 50%;  /* 左边界相对于视口的水平距离为50% */
  transform: translate(-50%, -50%);  /* 将元素在水平和垂直方向上平移(-50%, -50%)，使元素居中显示 */

}

.login:before {
  content: "";  /* 禁止元素生成任何内容 */
  position: absolute;  /* 将元素定位为绝对定位 */
  background: transparent;  /* 设置元素的背景色为透明 */
  bottom: 45px;  /* 将元素的底部与视窗底部之间的距离设置为45px */
  right: 40px;  /* 将元素的右侧与视窗右侧之间的距离设置为40px */
  width: 55px;  /* 设置元素的宽度为55px */
  height: 55px;  /* 设置元素的高度为55px */
  z-index: 5;  /* 设置元素的堆叠顺序为5 */
  transition: all .6s ease-in-out, background 0s ease;  /* 设置元素的所有属性在0.6秒内渐变过渡，背景色在0秒内立即渐变过渡 */

}

.login .form {
  display: block; /* 设置登录表单元素为块级元素 */
  position: relative; /* 设置登录表单元素的定位为相对定位 */
}

.login .form h2 {
  background: #f5f5fa; /* 设置标题的背景颜色为#f5f5fa */
  display: block; /* 设置标题元素为块级元素 */
  box-sizing: border-box; /* 设置标题元素的盒模型为border-box */
  width: 100%; /* 设置标题元素的宽度为100% */
  margin: 0 0 30px 0; /* 设置标题元素的上下外边距为0，下内边距为30px */
  padding: 40px; /* 设置标题元素的内边距为40px */
  font-weight: 200; /* 设置标题的字体粗细为200 */
  color: #9596A2; /* 设置标题的颜色为#9596A2 */
  font-size: 19px; /* 设置标题的字体大小为19px */
}


.login .form .form-field {
  display: flex;  /* 设置显示为弹性布局 */
  align-items: center;  /* 垂直居中对齐子元素 */
  height: 55px;  /* 设置高度为55px */
  margin: 0 40px 30px 40px;  /* 设置外边距 */
  border-bottom: 1px solid #9596A2;  /* 设置底部边框为1px的实线边框，颜色为#9596A2 */
}

.login .form .form-field label {
  width: 10px;  /* 设置宽度为10px */
  padding: 0 15px 0 0;  /* 设置内边距，左侧为0，右侧为15px，上下为0 */
  color: #9596A2;  /* 设置文本颜色为#9596A2 */
}

.login .form .form-field input {
  width: 100%;  /* 设置宽度为100% */
  background: transparent;  /* 设置背景透明 */
  color: #9596A2;  /* 设置文本颜色为#9596A2 */
  padding: 15px;  /* 设置内边距为15px */
  border: 0;  /* 设置边框为0 */
  margin: 0;  /* 设置外边距为0 */
}


.login .form .form-field input+svg { /* 登录页面表单字段内输入框后面的svg元素 */
  width: 35px; /* 设置宽度为35px */
  width: 35px; /* 设置宽度为35px */
  fill: none; /* 不填充颜色 */
  stroke: #00FCD1; /* 设置边框颜色为蓝色 */
  stroke-width: 7; /* 设置边框宽度为7px */
  stroke-linecap: round; /* 设置边框圆角 */
  stroke-dasharray: 1000; /* 设置边框虚线长度为1000 */
  stroke-dashoffset: -100; /* 设置边框虚线初始偏移量为-100 */
  transition: all .3s ease-in-out; /* 设置所有属性过渡效果为0.3秒，缓动效果为缓入缓出 */
}

.login .form .form-field input:valid+svg { /* 当输入框为有效时，设置svg元素的边框虚线偏移量为0 */
  stroke-dashoffset: 0;
}

.login .form .form-field input:focus { /* 当输入框获得焦点时，取消边框 */
  outline: none;
}

.login .form .form-field *::placeholder { /* 登录页面表单字段内输入框的占位文本 */
  color: #9596A2; /* 设置占位文本颜色为灰色 */
}

.login .form .button {
  width: 100%; /* 宽度占满父元素的宽度 */
  position: relative; /* 将元素作为其子元素的相对基准 */
  cursor: pointer; /* 鼠标指针形状为手型，表示可点击 */
  box-sizing: border-box; /* 元素的宽度和高度包括边框和内边距 */
  padding: 0 40px 45px 40px; /* 上下左右的内边距 */
  margin: 0; /* 不设置外边距和内边距 */
  border: 0; /* 不设置边框 */
  background: transparent; /* 背景透明 */
  outline: none; /* 取消边框 */
}

.login .form .button .arrow-wrapper {
  transition: all 0.45s ease-in-out; /* 过渡效果时间0.45秒，缓动函数为缓入缓出 */
  position: relative; /* 坐标定位方式为相对定位 */
  margin: 0; /* 去除上下左右的外边距 */
  width: 100%; /* 宽度为父元素的宽度 */
  height: 55px; /* 高度为55像素 */
  right: 0; /* 将元素右边界与父元素的右边界对齐 */
  float: right; /* 将元素浮动到右边 */
  background: linear-gradient(90deg, #04DFBD, #00FCD1); /* 背景线性渐变，从左到右，颜色从#04DFBD渐变到#00FCD1 */
  box-shadow: 0 3px 20px rgba(0, 252, 209, 0.4); /* 阴影效果，距离为0，模糊度为3像素，颜色为rgba(0, 252, 209, 0.4) */
  border-radius: 12px; /* 元素的四个角进行圆角处理，半径为12像素 */
}

.login .form .button .arrow-wrapper .arrow {
  /* 箭头元素的样式 */
  position: absolute; /* 坐标定位为绝对定位 */
  top: 50%; /* 水平垂直居中 */
  margin: auto; /* 元素上下左右距离相等 */
  transition: all 0.45s ease-in-out; /* 元素的属性值变化过渡效果 */
  right: 35px; /* 元素距离右边界35px */
  width: 15px; /* 元素的宽度为15px */
  height: 2px; /* 元素的高度为2px */
  background: none; /* 背景颜色为空 */
  transform: translateY(-50%); /* 垂直方向上移动50% */
}

.login .form .button .arrow-wrapper .arrow:before { /* 设置气泡的箭头样式 */
  position: absolute; /* 绝对定位 */
  content: ''; /* 内容为空 */
  top: -4px; /* 上边距 */
  right: 0; /* 右边距 */
  width: 8px; /* 宽度 */
  height: 8px; /* 高度 */
  border-top: 2px solid #fff; /* 上边框 */
  border-right: 2px solid #fff; /* 右边框 */
  transform: rotate(45deg); /* 旋转45度 */
}

.login .form .button .button-text { /* 设置按钮文本的样式 */
  transition: all 0.45s ease-in-out; /* 添加过渡效果 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 上边距 */
  left: 0; /* 左边距 */
  right: 0; /* 右边距 */
  padding: 0; /* 内边距 */
  margin: 0; /* 外边距 */
  color: #fff; /* 文本颜色 */
  line-height: 55px; /* 行高 */
  text-align: center; /* 文本居中对齐 */
  text-transform: uppercase; /* 文本转换为大写 */
}
.login .finished {
  position: absolute; /* 定位为绝对定位 */
  top: 50%; /* 上边距为50% */
  left: 50%; /* 左边距为50% */
  transform: translate(-50%, -50%); /* 水平和垂直方向平移50% */
  z-index: 7; /* 堆叠上下文的顺序为7 */
}

.login .finished svg {
  width: 100px; /* 元素宽度为100px */
  width: 100px; /* 确保元素宽度为100px */
  fill: none; /* 填充颜色为空 */
  stroke: #fff; /* 边框颜色为白色 */
  stroke-width: 7; /* 边框宽度为7 */
  stroke-linecap: round; /* 边框端点样式为圆形 */
  stroke-dasharray: 1000; /* 划线的长度为1000 */
  stroke-dashoffset: -100; /* 划线的偏移量为-100 */
  transition: all .3s ease-in-out .5s; /* 所有属性过渡效果为0.3秒，缓动函数为缓入缓出，延迟0.5秒开始生效 */
}
.login.loading .form .button .arrow-wrapper {   /* 当类名为.login并且类名为loading并且类名为.form并且类名为button并且类名为arrow-wrapper时 */
  width: 55px;   /* 设置宽度为55px */
  animation: sk-rotateplane 1.2s infinite ease-in-out .5s;   /* 动画效果为sk-rotateplane，持续时间为1.2秒，无限循环，延迟0.5秒开始 */
}

.login.loading .form .button .arrow-wrapper .arrow {   /* 当类名为.login并且类名为loading并且类名为.form并且类名为button并且类名为arrow-wrapper并且子元素名为arrow时 */
  background: #fff;   /* 背景颜色为白色 */
  transform: translate(15px, 0);   /* 平移15px, 0 */
  opacity: 0;   /* 透明度为0 */
  transition: opacity 0.3s ease-in-out .5s;   /* 透明度过渡效果为0.3秒，缓动效果为缓入缓出，延迟0.5秒开始 */
}

.login.loading .form .button .button-text {   /* 当类名为.login并且类名为loading并且类名为.form并且类名为button并且子元素名为button-text时 */
  color: #9596A2;   /* 文本颜色为#9596A2 */
}

.login.active:before {   /* 当元素拥有active类时，为其添加伪元素before，并设置以下样式 */
  bottom: 0;            /* 位置固定在元素的底部 */
  right: 0;             /* 位置固定在元素的右侧 */
  background: linear-gradient(90deg, #04DFBD, #00FCD1);   /* 背景为从左到右的线性渐变，颜色分别为#04DFBD和#00FCD1 */
  border-radius: 12px;   /* 上右下左四个角的圆角半径为12px */
  height: 100%;         /* 高度占元素100% */
  width: 100%;          /* 宽度占元素100% */
}
.login.active .form .button .arrow-wrapper { /* 当.login类处于活动状态时，.form下的.button下的.arrow-wrapper元素 */
  animation-iteration-count: 1; /* 动画播放次数为1次 */
}

.login.active .finished svg { /* 当.login类处于活动状态时，.finished下的svg元素 */
  stroke-dashoffset: 0; /* 动画的偏移量为0 */
}
@-webkit-keyframes sk-rotateplane {
  0% {   /* 动画开始，设置透视距离为120px*/
    transform: perspective(120px);
  }

  50% {   /* 动画进行到一半，将元素绕Y轴旋转180度*/
    transform: perspective(120px) rotateY(180deg);
  }

  100% {   /* 动画结束，将元素绕Y轴旋转180度，并绕X轴旋转180度*/
    transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}
</style>
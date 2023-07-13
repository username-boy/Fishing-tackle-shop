<template>
  <h3>欢迎注册钓鱼购物平台</h3>
  <!-- register form -->
  <div class="register">
    <van-form
      @submit="onsubmit"
      label-align="left"
      label-width="80px"
    >
      <van-cell-group inset>
        <van-field
          v-model="nickName"
          :clearable="true"
          label="昵称"
          required
          :rules="[{required: true,message: '请输入您的用户昵称'}]"
          placeholder="请输入用户昵称"
        />
        <van-field
          v-model="email"
          :clearable="true"
          label="邮箱"
          required
          :rules="[
            {required: true,message: '请输入您的邮箱'},
            {validator: emailValidator,message: '请输入正确的邮箱'}
          ]"
          placeholder="请输入邮箱地址"
        />
        <van-field
          v-model="tel"
          :clearable="true"
          label="手机号"
          required
          :rules="[
            {required: true,message: '请输入您的手机号'},
            {validator: phoneValidator, message: '请输入正确的手机号'}
          ]"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="password"
          :clearable="true"
          label="密码"
          required
          type="password"
          :rules="[
            {required: true, message: '请输入您的密码'},
            {validator: passwordValidator,message: '密码必须包含字母和数字'}
          ]"
          placeholder="请输入您账户的密码"
        />
        <van-field
          v-model="confirmPassword"
          :clearable="true"
          type="password"
          label="确认密码"
          required
          :rules="[
            {required: true,message: '请确认您的密码'},
            {validator: confirmValidator,message: '两次输入的密码不一致'}
          ]"
          placeholder="请再次输入您账户的密码"
        />
      </van-cell-group>
      <!-- button group -->
      <div class="button">
        <van-button
          type="primary"
          size="small"
          native-type="submit"
          :disabled="registerBtnIsDisable"
        >立即注册
        </van-button>
        <div class="login">已有账号?<span @click="loginHandler">立即登录</span></div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRouter} from "vue-router";
import {userRegisterApi} from "@/request/api";
import md5 from 'js-md5';
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()
let nickName = ref('') // 用户昵称
let email = ref('') // 用户邮箱
let tel = ref('') // 用户手机号
let password = ref('') // 用户密码
let confirmPassword = ref('') // 确认密码

const emailValidator = val => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val)
const phoneValidator = val => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)
const passwordValidator = val => /^(?![^a-zA-Z]+$)(?!\D+$)/.test(val)
const confirmValidator = val => val === password.value
const registerBtnIsDisable = computed(() => !nickName.value || !email.value || !tel.value || !password.value || !confirmPassword.value)

/**
 * @desc 立即注册按钮点击事件处理函数
 * */
const onsubmit = async () => {
  try {
    const encryptPassword = md5(password.value)
    const params = {
      user_nickname: nickName.value, // 用户昵称
      user_email: email.value, // 用户邮箱
      user_tel: tel.value, // 用户手机号
      user_pwd: encryptPassword, // 用户密码（加密）
    }
    const {data} = await userRegisterApi(params)
    if (data.rsCode === 1) {
      showSuccessToast('注册成功')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } else {
      showFailToast(data.rsCause) // 提示错误信息
    }
    // todo 校验用户注册接口
  } catch (e) {
  }
}

/**
 * @desc 已有账号 立即登录事件处理函数
 * */
const loginHandler = () => {
  router.push('/login')
}

</script>

<style lang="less" scoped>
h3 {
  margin-top: 130px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login {
    margin-top: 10px;
    font-size: 13px;

    span {
      display: inline-block;
      text-decoration: underline;
      margin-left: 5px;
      color: @main-color;
    }
  }

  /deep/ .van-button {
    width: 150px;
    padding: 5px 2px;
  }
}
</style>

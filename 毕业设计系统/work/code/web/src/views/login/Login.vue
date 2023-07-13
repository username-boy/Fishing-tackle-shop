<template>
    <h3>闲云野鹤渔具购物平台欢迎您</h3>
  <!-- login-form -->
    <div class="login">
        <van-form @submit="onsubmit">
            <!-- field -->
            <van-cell-group inset>
                <van-field
                        v-model="user_tel"
                        left-icon="phone-o"
                        :clearable="true"
                        label="手机号"
                        :rules="[{
            validator: phoneValidator,message: '请输入正确的手机号'
          }]"
                        placeholder="请输入用户手机号"
                />
                <van-field
                        v-model="user_pwd"
                        type="password"
                        left-icon="notes-o"
                        :rules="[{
            required: true,message: '请输入密码'
          }]"
                        :clearable="true"
                        label="密码"
                        placeholder="请输入密码"
                />
            </van-cell-group>
            <!-- button group -->
            <div class="button">
                <van-button
                        type="primary"
                        size="small"
                        :disabled="loginBtnIsDisable"
                        native-type="submit"
                >立即登录
                </van-button>
                <div class="register">还没有账号?<span @click="registerHandler">立即注册</span></div>
                <div class="back-home">
                    <van-button
                            type="primary"
                            size="small"
                            @click="goHomePage"
                    >回首页
                    </van-button>
                </div>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {userLoginApi} from "@/request/api"
// 引入md5
import md5 from 'js-md5';
import {showSuccessToast} from "vant";

const store = useStore()
const router = useRouter()

// 登录按钮是否禁用
const loginBtnIsDisable = computed(() => {
    return user_tel.value === '' || user_pwd.value === ''
})
let user_tel = ref('')
let user_pwd = ref('')

/**
 * @desc 点击立即注册的事件处理函数
 * */
const registerHandler = () => {
    router.push('/register')
}

/**
 * @desc 手机号表单校验函数
 * */
const phoneValidator = (val) => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)

/**
 * @desc 表单提交时的检验函数
 * */
const onsubmit = async () => {
    try {
        const params = {
            user_tel: user_tel.value, // 用户手机号
            user_pwd: md5(user_pwd.value)
        }
        const {data} = await userLoginApi(params)
        if (data.code === 1) {
            // 将用户登录成功之后的token存储到localStorage中
            window.localStorage.setItem('token', data.token)
            store.commit('updateUserInfo', data.data)
            store.commit('changeActive', 3)
            showSuccessToast('登录成功')
            setTimeout(() => {
                router.push('/mine')
            }, 1000)
        }
    } catch (e) {
        console.log('登录时出错', e)
    }
}

// 回首页按钮点击事件处理函数
const goHomePage = () => {
    router.push('/')
    store.commit('changeActive', 0)
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

  .register {
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

  .back-home {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;

    /deep/ .van-button {
      margin-top: 20px;
      width: 150px;
      padding: 5px 2px;
    }
  }
}
</style>

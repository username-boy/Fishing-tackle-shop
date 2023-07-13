<template>
    <div class="user-info">
        <NavBar title="用户信息" :left-arrow="true"/>
        <div class="info-box">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                            required
                            label="昵称"
                            v-model="userInfo.user_nickname"
                            :rules="[{required: true,message: '请输入用户昵称'}]"
                            right-icon="warning-o"
                    />
                    <van-field
                            required
                            label="邮箱"
                            v-model="userInfo.user_email"
                            right-icon="warning-o"
                            :rules="[{ validator: emailValidator, message: '请输入正确的邮箱' }]"
                    />
                    <van-field label="手机号" v-model="userInfo.user_tel" disabled/>
                    <van-field name="uploader" label="修改头像">
                        <template #input>
                            <van-uploader
                                    :after-read="afterRead"
                                    :max-size="500 * 1024"
                                    @oversize="onOversize"
                                    v-model="avatarUrlArr"
                                    multiple
                                    :max-count="1"
                            />
                        </template>
                    </van-field>
                </van-cell-group>
                <div class="tips">提示：昵称和邮箱3个月内只能修改一次</div>
                <div class="button">
                    <van-button type="primary" size="small" native-type="submit">提交修改</van-button>
                    <van-button type="danger" size="small" @click="logOut">退出登录</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {changeUserInfoApi, getUserInfoApi, updateUserAvatarApi, uploadAvatarApi} from "@/request/api";
import NavBar from "@/components/common/NavBar";
import {showSuccessToast, showToast} from "vant";
import {useStore} from "vuex";

const store = useStore()
const route = useRoute()
const router = useRouter()
onMounted(() => {
    getUserInfo()
})
let userInfo = ref({})
const getUserInfo = async () => {
    try {
        let params = {
            userId: route.params.userId
        }
        const {data} = await getUserInfoApi(params)
        if (data.rsCode === 1) {
            userInfo.value = data.data
            console.log('userInfo-->', userInfo.value)
        }
    } catch (e) {
    }
}

let emailValidator = val => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val)

/**
 * @desc 表单提交 修改用户信息
 * */
const onSubmit = async () => {
    console.log(userInfo.value)
    try {
        let params = {
            userId: userInfo.value.user_id,
            userNickname: userInfo.value.user_nickname,
            userEmail: userInfo.value.user_email
        }
        console.log('params-->', params)
        const {data} = await changeUserInfoApi(params)
        if (data.rsCode === 1) {
            // 如果用户上传了头像才更新，如果未上传头像则不做任何处理
            avatarUrl.value && store.commit("updateUserAvatar", avatarUrl.value);
            showSuccessToast('更改成功')
            let payload = {
                userName: data.data.user_nickname,
                userId: data.data.user_id
            }
            store.commit('updateUserInfo', payload)
            setTimeout(() => {
                router.push('/mine')
            }, 500)
        }
    } catch (e) {

    }
}

// 退出登录
const logOut = () => {
    store.commit('updateUserInfo', {})
    store.commit('changeActive', 0)
    router.push('/')
}

let avatarUrlArr = ref([])
let avatarUrl = ref('')
const afterRead = file => {
    let formData = new FormData();
    // FormData的使用：
    // 1.用一些键值对来模拟一系列表单控件：即把form中的所有表单元素的name与value组装成一个queryString
    // 2.异步上传二进制文件
    // 上传图片需要用到二进制，这里使用FormData
    formData.append("file", dataURLtoFileFun(file.content, file.file.name));
    // 这里的file表示给后台传的属性名字
    uploadAvatarApi(formData).then(res => {
        if (res.data.rsCode === 1) {
            let params = {
                userId: store.state.userInfo.userId,
                avatarUrl: res.data.data.path,
            };
            console.log("params-->", params);
            updateUserAvatarApi(params).then(res2 => {
                if (res2.data.rsCode === 1) {
                    showSuccessToast(res.data.rsCause);
                    avatarUrl.value = res.data.data.path;
                    console.log('avatarUrlArr-->', avatarUrlArr.value)
                    // 提交修改
                }
            });
        }
    });
};

// 超过上传限制的提示信息
const onOversize = file => {
    console.log(file);
    showToast("文件大小不能超过 500kb");
};

const dataURLtoFileFun = (dataUrl, filename) => {
    // 将base64转换为文件，dataUrl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
};
</script>

<style lang="less" scoped>
.user-info {
  width: 100%;

  .info-box {
    width: 100%;
    margin-top: 46px;

    .tips {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }

    .button {
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;

      /deep/ .van-button {
        width: 120px;
        margin: 10px;
      }
    }
  }
}
</style>

<template>
    <div class="mine">
        <!-- NavBar -->
        <NavBar title="我的"/>
        <div class="header-box">
            <!-- not login -->
            <template v-if="!store.getters.userIsLogin">
                <div class="user-avatar" @click="loginHandler">
                    <van-image
                            fit="cover"
                            round
                            width="100"
                            height="100"
                            :src="currentUserAvatar"/>
                    <span>请 登 录</span>
                </div>
            </template>
            <!-- already login -->
            <template v-else>
                <div class="user-avatar">
                    <van-image
                            @click="uploadAvatar"
                            fit="cover"
                            round
                            width="100"
                            height="100"
                            :src="BaseURL + currentUserAvatar"
                            v-if="store.state.userAvatar"/>
                    <div class="upload" v-else>
                        <van-uploader
                                :after-read="afterRead"
                                :max-size="500 * 1024"
                                @oversize="onOversize"/>
                    </div>
                    <span @click="showUserInfo">{{ store.state.userInfo.userName }}</span>
                </div>
            </template>
            <div class="vip-box">
                <div class="top">
                    <div class="top-left">
                        <van-icon name="gift-o"/>
                        会员特权
                    </div>
                    <div class="top-right" @click="openVipHandler">开通会员</div>
                </div>
                <div class="bottom">消费反积分，会员特权享不停</div>
            </div>
        </div>
        <div class="center-box">
            <div
                    class="item"
                    v-for="(item, idx) in iconList"
                    :key="idx"
                    @click="iconClickHandler(idx)">
                <div class="item-detail">
                    <van-icon :name="item.icon" size="30" color="#999"></van-icon>
                    <span class="name">{{ item.name }}</span>
                </div>
            </div>
        </div>

        <!-- 商城折叠面板 -->
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
                <template #title>
                    <div
                            style="
							display: flex;
							align-items: center;
							font-size: 14px;
							font-weight: bold;
						">
                        <van-icon name="goods-collect-o" size="24"/>
                        <span style="margin-left: 5px">商城</span>
                    </div>
                </template>
                <div class="inner-detail">
                    <div class="item" v-for="(item, idx) in orderList" :key="idx">
                        <div class="item-detail" @click="goOrderPage(idx)">
                            <van-icon :name="item.icon" size="20" color="#999"></van-icon>
                            <span class="name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>

        <!-- 设置折叠面板 -->
        <van-collapse v-model="settingNames">
            <van-collapse-item name="1">
                <template #title>
                    <div style="display: flex;align-items: center;font-size: 14px;font-weight: bold;">
                        <van-icon name="setting-o" size="24"/>
                        <span style="margin-left: 5px">设置</span>
                    </div>
                </template>
                <div class="inner-detail">
                    <div class="item" v-for="(item, idx) in settingList" :key="idx">
                        <div class="item-detail" @click="goMyAddressPage(item.name)">
                            <van-icon :name="item.icon" size="20" color="#999"></van-icon>
                            <span class="name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import {computed, ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {showFailToast, showSuccessToast, showToast} from "vant";
import axios from "axios";
import {
    updateUserAvatarApi,
    uploadAvatarApi,
    getUserInfoApi,
} from "@/request/api";

const store = useStore();
console.log("用户是否登录-->", store.getters.userIsLogin);

onMounted(async () => {
    if (store.getters.userIsLogin) {
        getUserInfo();
    }
});
const getUserInfo = async () => {
    try {
        let params = {
            userId: store.state.userInfo.userId,
        };
        const {data} = await getUserInfoApi(params);
        data.rsCode === 1 &&
        !!data.user_avatar &&
        store.commit("updateUserAvatar", data.user_avatar);
    } catch (e) {
    }
};

const router = useRouter();

let avatarUrl = ref("");

let BaseURL = ref("http://localhost:3000/avatar/");

const currentUserAvatar = computed(() => {
    return store.state.userAvatar;
});

const iconList = ref([
    {
        name: "钱包",
        icon: "balance-pay",
        path: "钱包的页面地址",
    },
    {
        name: "积分商城",
        icon: "points",
        path: "积分商城的页面地址",
    },
]);

const orderList = ref([
    {
        name: "我的订单",
        icon: "completed",
        path: "订单地址",
    },
    {
        name: "我的收藏",
        icon: "eye-o",
        path: "收藏地址",
    },
]);

const settingList = ref([
    {
        name: "授权设置",
        icon: "setting-o",
        path: "授权设置地址",
    },
    {
        name: "收货地址",
        icon: "logistics",
        path: "收货地址地址",
    },
    {
        name: "清除缓存",
        icon: "close",
        path: "清除缓存地址",
    },
]);

const activeNames = ref(["1"]); // 控制商城折叠面板
const settingNames = ref(["1"]); // 控制设置折叠面板
const loginHandler = () => {
    router.push("/login");
};

// 如果已经登录，就跳转到个人信息页面
const showUserInfo = () => {
    router.push(`/userinfo/${store.state.userInfo.userId}`);
};

// 点击订单跳转到我的订单页面
const goOrderPage = idx => {
    if (idx === 0) {
        // 跳转到我的订单
        if (!store.getters.userIsLogin) {
            showFailToast("请登录");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } else {
            router.push("/order");
        }
    } else {
        // 跳转到我的收藏
        if (!store.getters.userIsLogin) {
            showFailToast("请登录");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } else {
            router.push("/collect");
        }
    }
};

// 点击收货地址跳转到收货地址页面
const goMyAddressPage = name => {
    if (name === "清除缓存") {
        showSuccessToast("清除缓存成功");
    } else if (name === "授权设置") {
        showToast("敬请期待");
    } else if (name === "收货地址") {
        if (!store.getters.userIsLogin) {
            showFailToast("请登录");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } else {
            router.push("/my-address");
        }
    }
};

// 开通会员 点击事件处理函数
const openVipHandler = () => {
    showToast("敬请期待");
};

// 我的钱包 和 积分商城点击事件处理函数
const iconClickHandler = idx => {
    if (idx === 1) {
        showToast("敬请期待");
    } else {
        router.push("/wallet");
    }
};

// 用户点击头像框
const uploadAvatar = () => {
    if (!store.getters.userIsLogin) {
        showFailToast("请登录");
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    } else {
    }
};

// 点击上传头像的事件处理函数
// 注意：van-uploader 这里的数据格式是base64 而后端需要的是二进制数据，所以需要进行转化
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
                    setTimeout(() => {
                        avatarUrl.value = res.data.data.path;
                        store.commit("updateUserAvatar", avatarUrl.value);
                    }, 1000);
                }
            });
        }
    });
};

// 上传图片成功之后重新获取用户信息

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

// 超过上传限制的提示信息
const onOversize = file => {
    console.log(file);
    showToast("文件大小不能超过 500kb");
};
</script>

<style lang="less" scoped>
.mine {
  background-color: #f5f5f5;
  width: 100%;
  height: calc(100vh - 50px);
  margin-bottom: 51px;
  overflow-y: scroll;

  .header-box {
    width: 100%;
    margin-top: 45px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @main-color;
    position: relative;

    .user-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      span {
        display: inline-block;
        padding: 5px 0;
        font-size: 13px;
        color: #fff;
      }
    }

    .vip-box {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 330px;
      height: 55px;
      border-radius: 6px 6px 0 0;
      display: flex;
      flex-direction: column;
      background-color: #87d9ff;
      color: @main-color;

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top-left {
          margin-top: 5px;
          padding: 4px 10px;
          font-size: 16px;
          font-weight: 600;
        }

        .top-right {
          padding: 4px 10px;
          font-size: 13px;
          border: 1px solid @main-color;
          border-radius: 2px;
          margin-top: 5px;
          margin-right: 10px;
        }
      }

      .bottom {
        padding: 4px 0 0 10px;
      }
    }
  }

  .center-box {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-detail {
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          display: inline-block;
          padding: 2px 0;
          color: #999;
        }
      }
    }
  }

  /deep/ .inner-detail {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-detail {
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          display: inline-block;
          padding: 2px 0;
          color: #999;
        }
      }
    }
  }

  /deep/ .van-collapse-item__content {
    padding: 8px 16px 4px;
    display: flex;
    align-items: center;
  }

  /deep/ .van-collapse-item {
    margin-bottom: 10px;
  }
}
</style>

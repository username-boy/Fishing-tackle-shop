<template>
  <div class="tab-bar">
    <van-tabbar v-model="store.state.active" @change="tabbarChange">
      <template v-for="(item,idx) in tabbarList">
        <van-tabbar-item :icon="item.icon">{{ item.name }}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router"
import {useStore} from "vuex";

const router = useRouter()

const store = useStore()

// 声明tabbar选项卡数组
const tabbarList = ref([
  {
    name: '商城',
    path: '/',
    icon: 'bag-o'
  },
  {
    name: '分类',
    path: '/category',
    icon: 'qr-invalid'
  },
  {
    name: '购物车',
    path: '/shopcar',
    icon: 'cart-o',
  },
  {
    name: '我的',
    path: 'mine',
    icon: 'friends-o',
  }
])

const active = ref(0)

/**
 * @desc tabbar切换事件处理函数
 * @param {Number} idx 当前项的下标值
 * */
const tabbarChange = (idx) => {
  store.commit('changeActive',idx)
  // 使用编程式导航跳转路由
  router.push(tabbarList.value[idx].path)
}

</script>

<style lang="less" scoped>
.tab-bar {
  width: 100%;
}
</style>

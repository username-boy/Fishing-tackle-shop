<template>
  <!-- 商品详情页面 -->
  <div class="product-detail">
    <van-loading style="margin-top: 100px" size="24px" vertical v-if="showLoading">加载中...</van-loading>
    <!-- NavBar -->
    <NavBar title="商品详情" :left-arrow="true"/>
    <!-- Swiper -->
    <template v-if="!showLoading">
      <div class="swiper-box">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,idx) in productDetail.product_detail_img" :key="idx">
            <van-image width="375px" height="200px" :src="BaseURL + item" fit="cover"></van-image>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- content -->
      <div class="content">
        <div class="title">{{ productDetail.product_title }}</div>
        <div class="price">￥：{{ productDetail.product_price }}</div>
        <div class="sales">
          <div class="store">库存：<span>{{ productDetail.product_store }}</span></div>
          <div class="num">销量：<span>{{ productDetail.product_sales }}</span></div>
        </div>
      </div>
      <!-- detail -->
      <div class="detail">
        <div class="detail-title">-- 详情展示 --</div>
        <van-image
            v-for="(item,idx) in productDetail.product_detail_img"
            :key="idx"
            width="375px"
            height="375px"
            :src="BaseURL + item"
        />
      </div>
      <!-- ActionBar -->
      <div class="action-bar">
        <van-action-bar>
          <van-action-bar-icon icon="goods-collect-o" :text="isCollected ? '已收藏' : '收藏'" @click="addCollectHandler" :color="isCollected ? 'red' : ''"/>
          <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.getters.carNum > 0 ? store.getters.carNum : ''"
                               @click="goCarPage"/>
          <van-action-bar-button color="#1989fa" text="加入购物车" @click="addCarHandler"/>
          <van-action-bar-button type="danger" text="立即购买"/>
        </van-action-bar>
      </div>
    </template>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {addProductToCarApi, getProductDetailApi,checkCarApi} from "@/request/api"
import NavBar from "@/components/common/NavBar.vue";
import {showFailToast, showSuccessToast} from "vant";
let showLoading = ref(true)
let BaseURL = ref('http://localhost:3000/')

const router = useRouter()
const route = useRoute()
const store = useStore()

onMounted(() => {
  getProductDetail(route.params.id)
  setTimeout(() => {
    showLoading.value = false
  },1000)
})

/**
 * @desc 加入购物车按钮点击事件处理函数
 * */
const addCarHandler = async () => {
  try {
    console.log(store.state.userInfo)
    if(!!store.state.userInfo.userName){
      let params = {
        userId: store.state.userInfo.userId,
        productId: Number(route.params.id)
      }
      const {data} = await checkCarApi(params)
      if (data.rsCode === 2){
        showFailToast('该商品已加入购物车')
        return
      } else if(data.rsCode === 1){
        const {data} = await addProductToCarApi(params)
        if(data.rsCode === 1){
          showSuccessToast('加入购物车成功')
        }
      }
    } else {
      router.push('/login')
    }
  } catch (e) {

  }
}

/**
 * @desc 点击购物车图标时的事件处理函数：路由跳转到购物车页面
 * */
const goCarPage = () => {
  store.commit('changeActive', 2) // 将当前高亮TabBar设置为购物车
  router.push('/shopcar')
}

/**
 * @desc 页面挂载时获取商品详细数据
 * */
let productDetail = ref({})
const getProductDetail = async (id) => {
  try {
    if(isCollected){

    }
    let params = {
      productId: id
    }
    const {data} = await getProductDetailApi(params)
    console.log(data)
    if (data.rsCode === 1) {
      productDetail.value = data.data
      console.log('product-->', productDetail.value)
    }
  } catch (e) {

  }
}

// 收藏商品的事件处理函数
const addCollectHandler = async () => {
  try {
    if(isCollected.value){
      console.log('取消收藏')
      store.commit('removeCollect',Number(route.params.id))
      console.log('已收藏数组',store.state.collect)
    } else {
      let params = {
        productId: Number(route.params.id)
      }
      const {data} = await getProductDetailApi(params)
      console.log('result-->',data.data)
      if(data.rsCode === 1){
        store.commit('addCollect',data.data)
        showSuccessToast('收藏成功')
      }
    }
  } catch (e) {

  }
}

// 判断当前商品是否已收藏
const isCollected = computed(() => {
  return store.state.collect.some(item => item.product_id === Number(route.params.id))
})

</script>

<style lang="less" scoped>
.product-detail {
  width: 100%;
  height: calc(100vh - 96px);
  margin-top: 46px;
  margin-bottom: 50px;
  overflow-y: scroll;

  .swiper-box {
    min-height: 200px;
  }

  .content {
    padding: 4px 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
      font-size: 16px;
      color: #333;
    }

    .price {
      font-size: 14px;
      color: #d50000;
      margin: 5px 0;
    }

    .sales {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      color: #333;

      .store {
        margin-right: 10px;
      }
    }
  }

  .detail {
    width: 100%;

    .detail-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      font-size: 18px;
      font-weight: bold;
      color: @main-color;
      padding: 5px 0;
    }
  }
}
</style>

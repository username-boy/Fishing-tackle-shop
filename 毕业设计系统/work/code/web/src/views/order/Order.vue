<template>
  <!-- 订单页面 -->
  <div class="order">
    <NavBar title="我的订单" :left-arrow="true"/>
    <!-- 订单状态 -->
    <div class="order-status-box">
      <div
        class="status-item"
        v-for="item in statusList"
        :key="item.statusId"
        :class="activeIndex === item.statusId ? 'active-status-item' : ''"
        @click="changeActiveTab(item.statusId)"
      >
        {{ item.statusName }}
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list">
      <div class="no-data" v-if="orderData.length === 0">
        <van-empty description="暂无订单"></van-empty>
      </div>
      <ProductItem
        v-for="(item,idx) in orderData"
        :key="item.id"
        :title="item.product_title"
        :price="item.product_price"
        :sales="item.product_sales"
        :product-id="item.product_id"
        :cover="item.product_img"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {useStore} from "vuex";
import NavBar from "@/components/common/NavBar.vue"
import ProductItem from "@/views/product/modules/ProductItem.vue";
import {getOrderDataApi} from "@/request/api"

const store = useStore()

onMounted(() => {
  getOrderData()
})

let statusList = ref([
  {
    statusId: 1,
    statusName: '全部订单'
  },
  {
    statusId: 2,
    statusName: '运输中'
  },
  {
    statusId: 3,
    statusName: '已收货'
  },
])
let activeIndex = ref(1)

const changeActiveTab = (val) => {
  activeIndex.value = val
  getOrderData()
}

let orderData = ref([])

/*获取订单数据*/
const getOrderData = async () => {
  try {
    let params = {
      statusId: activeIndex.value,
      userId: store.state.userInfo.userId
    }
    const {data} = await getOrderDataApi(params)
    if (data.rsCode === 1) {
      orderData.value = data.data
    } else {
      orderData.value = []
    }
  } catch (e) {

  }
}

</script>

<style lang="less" scoped>
.order {
  width: 375px;
  height: 100vh;
  background-color: #fefefe;

  .order-status-box {
    width: 100%;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 46px;
    background-color: #fff;

    .status-item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active-status-item {
        background-color: @main-color;
        color: white;
        padding: 1px;
        border: 1px solid #ccc;
      }
    }
  }
  .order-list{
    margin-top: 5px;
  }
}
</style>

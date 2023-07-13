<template>
    <div class="home">
        <!-- NavBar组件 -->
        <NavBar/>
        <!-- swiper组件 -->
        <SwiperList/>
        <!-- 搜索组件 -->
        <Search/>
        <template v-if="showLoading">
            <van-loading style="margin-top: 100px" size="24px" vertical>加载中...</van-loading>
        </template>
        <template v-if="!showLoading">
            <!-- 分类组件 -->
            <van-swipe class="cate-swipe" :autoplay="3000" indicator-color="#1989fa">
                <van-swipe-item square>
                    <div class="cate-list">
                        <div class="list-item" v-for="(item,idx) in cateList.slice(0,8)" :key="item.cate_id"
                             @click="goCateDetail(item)">
                            <div class="item-icon">
                                <van-image width="34px" height="34px" :src="BaseURL + item.cate_logo"></van-image>
                            </div>
                            <div class="item-name">
                                {{ item.cate_name }}
                            </div>
                        </div>
                    </div>
                </van-swipe-item>
                <van-swipe-item square>
                    <div class="cate-list">
                        <div class="list-item" v-for="(item,idx) in cateList.slice(8)" :key="item.cate_id"
                             @click="goCateDetail(item)">
                            <div class="item-icon">
                                <van-image width="34px" height="34px" :src="BaseURL + item.cate_logo"></van-image>
                            </div>
                            <div class="item-name">
                                {{ item.cate_name }}
                            </div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <!-- 滑块 热销榜单 + 新品推荐 -->
            <div>
                <div class="title">热销榜单</div>
                <div class="scroll-list">
                    <template v-for="(item,idx) in hotProductList" :key="idx">
                        <GoodsItem
                                :goods-name="item.product_title"
                                :price="item.product_price"
                                :sales="item.product_sales"
                                :cover="item.product_img"
                                :product-id="item.product_id"
                        />
                    </template>
                </div>
            </div>
            <div>
                <div class="title">新品推荐</div>
                <div class="scroll-list">
                    <template v-for="(item,idx) in newProductList" :key="idx">
                        <GoodsItem
                                :goods-name="item.product_title"
                                :price="item.product_price"
                                :sales="item.product_sales"
                                :cover="item.product_img"
                                :product-id="item.product_id"
                        />
                    </template>
                </div>
            </div>
            <!-- 爆款商品 -->
            <div>
                <div class="title">为您推荐</div>
                <div class="pro-list-box">
                    <template v-for="item in recProductList" :key="item.product_id">
                        <div class="pro-item" @click="goDetail(item.product_id)">
                            <van-image :src="BaseURL + item.product_img" fit="fill" width="170px" height="170px"></van-image>
                            <div class="pro-title">{{ item.product_title }}</div>
                            <div class="pro-price">￥{{ item.product_price }}</div>
                            <div class="pro-footer">
                                <div class="footer-left">
                                    销量：{{ item.product_sales }}
                                </div>
                                <div class="footer-right">
                                    <van-icon name="cart-o" size="20"></van-icon>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <!-- back to top -->
        <van-back-top target=".home" bottom="70px" right="20px"/>
    </div>

</template>

<script setup>
// vue相关
import {onMounted, ref} from "vue";

// 组件
import NavBar from "@/components/common/NavBar.vue";
import SwiperList from "@/components/common/SwiperList.vue";
import Search from "@/components/common/Search.vue";
import GoodsItem from "@/components/common/GoodsItem.vue";
// api接口
import {getCateListApi, getHotProductApi, getNewProductApi, getRecProductApi} from "@/request/api";
import router from "@/router";

let BaseURL = ref('http://localhost:3000/')
let showLoading = ref(true)
let hotProductList = ref([])
let newProductList = ref([])
let recProductList = ref([])
onMounted(() => {
    getCateList()
    getHotProduct()
    getNewProduct()
    getRecProduct()
    setTimeout(() => {
        showLoading.value = false
    }, 1000)
})
const productList = ref([])


// 存储分类信息的数组
const cateList = ref([])
/**
 * @desc 获取分类数组信息
 * */
const getCateList = async () => {
    try {
        const {data} = await getCateListApi()
        if (data.rsCode === 1) {
            cateList.value = data.data
            console.log('cateList-->', cateList.value)
        }
    } catch (e) {
        console.log('获取分类信息时出错', e)
    }
}

// 获取热销榜单数据
const getHotProduct = async () => {
    try {
        const {data} = await getHotProductApi()
        console.log('hot-->', data)
        if (data.rsCode === 1) {
            hotProductList.value = data.data
        }
    } catch (e) {
    }
}

// 获取新品推荐数据
const getNewProduct = async () => {
    try {
        const {data} = await getNewProductApi()
        if (data.rsCode === 1) {
            newProductList.value = data.data
        }
    } catch (e) {

    }
}

// 获取为您推荐商品数据
const getRecProduct = async () => {
    try {
        const {data} = await getRecProductApi()
        console.log('rec-->', data)
        if (data.rsCode === 1) {
            recProductList.value = data.data
        }
    } catch (e) {
    }
}

// 前往分类详情页面
const goCateDetail = (val) => {
    router.push(`/cate?cateId=${val.cate_id}&cateName=${val.cate_name}`)
}

// 前往商品详情页面
const goDetail = (val) => {
    router.push(`/product-detail/${val}`)
}

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: calc(100vh - 96px);
  margin-top: 46px;
  margin-bottom: 51px;
  overflow-y: scroll;

  /deep/ .van-grid-item {
    height: 100px;
    border: 1px solid red;
  }

  .cate-list {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-wrap: wrap;

    .list-item {
      width: 90px;
      height: 80px;
      margin-top: -20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-icon {
        width: 100%;
        height: 30px;
      }

      .item-name {
        color: #333;
        font-size: 14px;
      }
    }

  }

  .title {
    width: 375px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: @main-color;
  }

  .scroll-list {
    width: 375px;
    margin-top: 10px;
    white-space: nowrap;
    overflow-x: scroll;

    /deep/ .goods-item {
      display: inline-block;
    }
  }

  .pro-list-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;

    .pro-item {
      width: 50%;
      text-align: center;
      margin: 10px 0;

      .pro-title {
        text-align: left;
        overflow: hidden;
        margin-left: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 2px;
        font-size: 14px;
      }

      .pro-price {
        color: #d50000;
        font-size: 14px;
        padding: 2px;
        text-align: left;
        margin-left: 10px;
      }

      .pro-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 0;

        .footer-left {
          margin-left: 10px;
          font-size: 13px;
        }

        .footer-right {
          margin-right: 10px;
        }
      }
    }
  }

  /deep/ .my-swipe, .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
  }
}
</style>

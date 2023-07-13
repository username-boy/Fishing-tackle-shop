<template>
  <!-- cate detail -->
    <div class="cate">
        <van-loading style="margin-top: 100px" size="24px" vertical v-if="showLoading">加载中...</van-loading>
        <NavBar :title="title"/>
        <ProductList
                :product-list="productList"
                :title="title"
                v-if="productList.length > 0 && !showLoading"
                @changeSort="changeSortHandler"
                @changeCate="changeCateHandler"
        />
        <div class="no-data" v-if="productList.length === 0 && !showLoading">
            <van-empty description="暂无数据"/>
            <div class="button-box">
                <van-button type="primary" size="small" style="width: 120px;" @click="backHomeHandler">回首页</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {getProductByCateId} from '@/request/api'
import NavBar from "@/components/common/NavBar.vue"
import ProductList from "@/views/product/ProductList";

const route = useRoute()
const router = useRouter()
let title = ref('')
title.value = route.query.cateName
let showLoading = ref(true)
onMounted(() => {
    getProductListByCateId()
    console.log(route.query.cateName)
    setTimeout(() => {
        showLoading.value = false
        title.value = route.query.cateName
    }, 1000)
})

// 获取当前分类的商品数据
let productList = ref([])
let copyProductList = ref([]) // 复制一份商品数据，用于筛选
const getProductListByCateId = async () => {
    try {
        let params = {
            cateId: route.query.cateId
        }
        let {data} = await getProductByCateId(params)
        console.log('data-->', data)
        if (data.rsCode === 1) {
            productList.value = data.data
            copyProductList.value = data.data
            console.log('productList-->', productList.value.length)
        }
    } catch (e) {
    }
}

const backHomeHandler = () => {
    router.push('/')
}

// 子组件更改排序规则，父组件回调函数
const changeSortHandler = (val) => {
    // 如果是按照默认排序 则不做任何处理，直接按照服务器返回的数据进行展示
    if (val === 'default') {
        getProductListByCateId()
    }
    if (val === 'sales') {
        // 按照销量排序，默认降序，销量从高到低
        productList.value.sort((a, b) => b.product_sales - a.product_sales)
    } else if (val === 'price') {
        // 按照价格排序，默认降序，价格从高到低
        productList.value.sort((a, b) => b.product_price - a.product_price)
    }
}

// 子组件更改商品分类，父组件的回调函数
const changeCateHandler = (val) => {
    // 如果参数为0 则显示全部商品
    if (val === 0) {
        getProductListByCateId()
    } else if (val === 1) {
        // 如果参数为1 则显示新款商品，新款商品数据库中没有设置字段，这儿判断依据为 销量为0 的视为新款商品
        productList.value = copyProductList.value.filter(item => item.product_sales === 0)
    } else if (val === 2) {
        // 如果参数为2 则显示折扣商品，折扣商品数据库中对应的字段为product_is_onsale 1表示是折扣商品 0 表示不是
        productList.value = copyProductList.value.filter(item => item.product_is_onsale === 1)
    }
}

</script>

<style lang="less" scoped>
.no-data {
  width: 100%;

  .button-box {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

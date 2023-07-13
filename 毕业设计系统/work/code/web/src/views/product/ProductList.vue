<template>
  <!-- 商品列表页面 -->
    <div class="product-list">
        <!-- NavBar组件 -->
        <NavBar :title="title" :left-arrow="true"/>
        <!-- 下拉菜单列表 -->
        <van-dropdown-menu>
            <van-dropdown-item v-model="productType" :options="productTypeOption" @change="dropChangeHandler2"/>
            <van-dropdown-item v-model="orderByType" :options="orderByTypeOption" @change="dropChangeHandler"/>
        </van-dropdown-menu>
        <!-- ProductItem -->
        <div class="list-box" v-if="props.productList">
            <ProductItem
                    v-for="(item,idx) in props.productList"
                    :key="item.id"
                    :title="item.product_title"
                    :price="item.product_price"
                    :sales="item.product_sales"
                    :product-id="item.product_id"
                    :cover="item.product_img"
            />
        </div>
        <div class="list-box" v-if="keywords">
            <!-- 没有数据时 -->
            <div class="no-data" v-if="searchResult.length === 0">
                <van-empty description="暂无数据"/>
                <div class="button-box">
                    <van-button type="primary" size="small" style="width: 120px;" @click="backHomeHandler">回首页</van-button>
                </div>
            </div>
            <div class="data" v-else>
                <ProductItem
                        v-for="(item,idx) in searchResult"
                        :key="item.id"
                        :title="item.product_title"
                        :price="item.product_price"
                        :sales="item.product_sales"
                        :product-id="item.product_id"
                        :cover="item.product_img"
                />
            </div>
        </div>
        <!-- back to top -->
        <van-back-top target=".product-list" bottom="70px" right="20px"/>
    </div>
</template>

<script setup>

import {onMounted, ref} from 'vue';
import NavBar from "@/components/common/NavBar.vue";
import ProductItem from "@/views/product/modules/ProductItem.vue";
import {useRoute} from "vue-router";
import {searchProductApi} from "@/request/api";
import router from "@/router";

const props = defineProps({
    productList: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        default: '商品列表'
    }
})

const emit = defineEmits(['changeSort', 'changeCate'])

const route = useRoute()
console.log('route-->', route)

let searchResult = ref([])
let copySearchResult = ref([]) // 复制一份搜索结果 用于做筛选等
// 记录路由中query参数 --> keywords关键词
let keywords = ref('')
let showLoading = ref(true)
onMounted(() => {
    // 组件挂载时获取用户输入的关键词
    keywords.value = route.query.keywords
    // 如果有关键词信息 才能调用 getSearchResult 方法
    !!route.query.keywords && getSearchResult()
    setTimeout(() => {
        showLoading.value = true
    }, 1000)
})

// 通过keywords查询数据表中数据
const searchProduct = async () => {
    try {
        let params = {
            keywords: keywords.value
        }
        console.log('params-->', params)
        const {data} = await searchProductApi(params)
        // 获取到查询的数据列表
        // todo
    } catch (e) {
        console.log('获取商品列表数据时出错', e)
    }
    // 如果没有keywords关键词信息 或者 没有传递keywords,则查询所有商品的信息
    if (keywords.value === '' || !keywords.value) {

    }
}

// 下拉选择排序依据
let productType = ref(0)
let productTypeOption = [
    {
        text: '全部商品',
        value: 0
    },
    {
        text: '新款商品',
        value: 1
    },
    {
        text: '折扣商品',
        value: 2
    }
]
let orderByType = ref('default')
let orderByTypeOption = [
    {text: '默认排序', value: 'default'},
    {text: '价格排序', value: 'price'},
    {text: '销量排序', value: 'sales'},
]

const backHomeHandler = () => {
    router.push('/')
}

// 页面挂载时根据关键词搜索
const getSearchResult = async () => {
    try {
        let params = {
            keywords: keywords.value
        }
        const {data} = await searchProductApi(params)
        if (data.rsCode === 1) {
            searchResult.value = data.data
            copySearchResult.value = data.data
        }
    } catch (e) {
    }
}

// 下拉选项变化时的按钮
const dropChangeHandler = (val) => {
    if (keywords.value) {
        if (val === 'default') return
        if (val === 'price') {
            searchResult.value.sort((a, b) => b.product_sales - a.product_sales)
        } else if (val === 'sales') {
            searchResult.value.sort((a, b) => b.product_sales - a.product_sales)
        }
    } else {
        emit("changeSort", val)
    }
}
const dropChangeHandler2 = (val) => {
    if (keywords.value) {
        if (val === 0) {
            getSearchResult()
        } else if (val === 1) {
            searchResult.value = copySearchResult.value.filter(item => item.product_sales === 0)
        } else if (val === 2) {
            searchResult.value = copySearchResult.value.filter(item => item.product_is_onsale === 1)
        }
    } else {
        emit("changeCate", val)
    }
}

</script>

<style lang="less" scoped>
.product-list {
  width: 100%;
  height: calc(100vh - 46px);
  overflow-y: scroll;
  margin-top: 46px;

  .list-box {
    display: flex;
    flex-direction: column;

    .no-data {
      width: 100%;

      .button-box {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
      }
    }
  }
}
</style>

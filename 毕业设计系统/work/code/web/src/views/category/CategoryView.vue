<template>
    <div class="category">
        <!-- TabBar组件 -->
        <NavBar title="分类"/>

        <!-- 二级联动左右 -->
        <div class="menu-detail">
            <!-- 左侧菜单 -->
            <div class="menu_list">
                <van-sidebar v-model="tabValue">
                    <van-sidebar-item
                            :title="item.cate_name"
                            v-for="(item,index) in categoryList"
                            :key="index"
                            @click="handleMenulist(index)"/>
                </van-sidebar>
            </div>
            <!-- 右侧菜单 -->
            <div id="goodListId" @scroll="handleScroll">
                <div v-for="(item,idx) in categoryList" :key="idx" :id="'scroll'+idx">
                    <span class="title-box">{{ item.cate_name }}</span>
                    <!--商品卡片-->
                    <ProductItem
                            v-for="(item,idx) in item.child"
                            :key="item.id"
                            :title="item.product_title"
                            :price="item.product_price"
                            :sales="item.product_sales"
                            :product-id="item.product_id"
                            :cover="item.product_img"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import NavBar from "@/components/common/NavBar.vue";
import Search from "@/components/common/Search.vue"
import ProductItem from "@/views/product/modules/ProductItem.vue";
import {getCateListApi, getProductCateApi} from "@/request/api";

let BaseURL = ref('http://localhost:3000/')

onMounted(() => {
    getCateProduct()
})

const sideBarChange = (idx) => {
    console.log(idx)
}

let categoryList = ref([])
/**
 * @desc 获取分类下的商品数据
 * */
const getCateProduct = async () => {
    try {
        const {data} = await getProductCateApi()
        if (data.rsCode === 1) {
            categoryList.value = data.data
        }
        console.log('cateGoryList', categoryList.value)
    } catch (e) {

    }
}

let tabValue = ref(0)

//左侧菜单点击联动左侧
const handleMenulist = (index) => {
    tabValue.value = index
    let navPage = document.querySelector('#scroll' + index)
    //navPage.offsetTop需要减去165店铺头部所占高度，需<170否则菜单切换会回弹
    document.querySelector("#goodListId").scrollTop = navPage.offsetTop - 55 // todo 计算高度
}
// 右侧菜单联动左侧
const handleScroll = () => {
    //scrollTop从0开始增大，局限在#goodListId div内
    let scrollTop = document.querySelector("#goodListId").scrollTop
    for (let a = 0; a < categoryList.value.length; a++) {
        //offsetTop获取每块scroll的距离屏幕最顶端的值
        //本menuList中9组元素的offsetTop固定值介于[179,1879]
        //故offsetTop-170（店铺头部高度约140，增30余量）得到距离#goodListId最顶端的高度
        //循环比较当scrollTop一旦大于某scroll的offsetTop-170，则切换左侧菜单选中index
        if (document.querySelector('#scroll' + a).offsetTop - 56 < scrollTop) {
            tabValue.value = a
        }
    }
}

</script>

<style lang="less" scoped>
.category {
  width: 100%;
  height: calc(100vh - 150px);
  margin-bottom: 51px;

  .menu-detail {
    height: calc(100vh - 97px);
    display: flex;
    margin-top: 47px;

    .menu_list {
      width: 110px;
      height: 100%;
      overflow-y: scroll;
    }

    #goodListId {
      overflow: auto;
      width: -webkit-fill-available;

      .title-box {
        width: 94%;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 10px;
        font-size: 16px;
        color: @main-color;
        padding-left: 10px;
        background-color: #FDF1EA;

      }
    }

    /* 选中标签三角标识 */

    .van-sidebar-item--select:before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-left: 10px solid #FF6900;
      border-bottom: 5px solid transparent;
      -webkit-transform: translateY(-50%);
      background-color: #fff;
      transform: translateY(-50%);
      content: '';
    }
  }
}
</style>

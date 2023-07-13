<template>
  <div class="goods-item" :style="{
    width: width + 'px'
  }">
    <div class="item" @click="goProductHandler">
      <van-image :src="BaseURL + cover" alt="goods-img" width="150px" height="150px" fit="contain"/>
      <div class="title">{{ goodsName }}</div>
      <div class="price">￥{{ price }}</div>
      <div class="footer">
        <div class="footer-left">销量：<span>{{ sales }}</span></div>
        <div class="footer-right">
          <van-icon name="shopping-cart-o"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
let BaseURL = ref('http://localhost:3000/')

const props = defineProps({
  width: {
    type: Number,
    default: 150
  },
  goodsName: {
    type: String,
    default: '暂无标题暂无标题暂无标题暂无标题暂无标题'
  },
  price: {
    type: Number,
    default: 9.9
  },
  sales: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    default: '',
  },
  productId: {
    type: Number,
    default: 0
  }
})

// 点击商品前往商品详情页面
const goProductHandler = () => {
  router.push(`/product-detail/${props.productId}`)
}
</script>

<style lang="less" scoped>
.goods-item {
  .item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 5px;
    border: 1px solid #fefefe;

    .title {
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      color: #333;
      padding: 0 20px;
    }

    .price {
      font-size: 13px;
      color: #d50000;
      padding: 5px 20px 0;
    }

    .footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #c5c5c5;
      padding: 5px 0;

      .footer-left {
        padding-left: 20px;
        span {
          display: inline-block;
          padding-left: 5px;
        }
      }

      .footer-right {
        padding-right: 25px;

      }
    }
  }
}
</style>

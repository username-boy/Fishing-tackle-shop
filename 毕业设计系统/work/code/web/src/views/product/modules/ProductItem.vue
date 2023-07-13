<template>
  <div class="product-item">
    <van-image
        width="100px"
        height="100px"
        fit="cover"
        :src="BaseURL + cover"
    />
    <div class="center" @click="showDetail">
      <div class="center-top">
        {{ title }}
      </div>
      <div class="center-center">
        ￥{{ price }}
      </div>
      <div class="center-footer">
        <div class="counts">销量：{{ sales }}</div>
        <div class="icon">
          <van-icon name="cart-o" size="20" color="#d50000"></van-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    default: 'title'
  },
  price: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  productId: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    default: ''
  }
})

let BaseURL = ref('http://localhost:3000/')

// 携带id跳转到商品详情页
const showDetail = () => {
  router.push(`/product-detail/${props.productId}`)
}

</script>

<style lang="less" scoped>
.product-item {
  height: 100px;
  margin: 5px auto;
  border: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;

    .center-top {
      flex: 1;
      padding: 5px 10px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /*这里设置需要显示几行文本*/
    }

    .center-center {
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 5px 10px;
      font-size: 14px;
      color: #d50000;
    }

    .center-footer {
      height: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .counts {
        padding: 5px 10px;
        font-size: 14px;
      }

      .icon {
        padding: 5px 10px;
      }
    }
  }
}
</style>

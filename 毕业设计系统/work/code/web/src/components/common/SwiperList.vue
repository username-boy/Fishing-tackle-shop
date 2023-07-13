<template>
  <!-- 封装一个全局的轮播图组件 -->
  <div class="swiper-list">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import {ref} from "vue";

const images = [
  require('@/assets/swiper1.jpg'),
  require('@/assets/swiper2.jpg'),
  require('@/assets/swiper3.jpg'),
  require('@/assets/swiper4.jpg'),
];
</script>

<style lang="less" scoped>
.swiper-list{
  width: 100%;
  img{
    width: 100%;
    height: 170px;
  }
}
</style>

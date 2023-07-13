<template>
  <div class="nav-bar">
    <!-- 封装一个全局通用的NavBar组件 -->
    <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="leftArrow"
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: '商城'
  },
  leftText: {
    type: String,
    default: ''
  },
  rightText: {
    type: String,
    default: '',
  },
  leftArrow: {
    type: Boolean,
    default: false
  }
})
const onClickLeft = () => history.back()
const onClickRight = () => {
  router.push('/mine')
}

</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index:9999;
  /deep/ .van-nav-bar {
    background-color: @main-color;
  }

  /deep/ .van-nav-bar__title {
    color: #fff;
    font-weight: normal;
    font-size: 16px;
  }
  /deep/ .van-nav-bar__content::after{
    content: '';
  }
  /deep/ .van-icon{
    color: #fff !important;
  }
  /deep/ .van-nav-bar__text{
    color: #fff !important;
  }
}
</style>

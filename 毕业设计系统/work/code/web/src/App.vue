<template>
  <div id="app">
    <router-view/>
    <TabBar v-if="isShowTabBar"/>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";
import TabBar from "@/components/common/TabBar.vue";

const route = useRoute()

// 计算属性isShowTabBar用于控制哪些页面需要显示TabBar组件
const isShowTabBar = computed(() => {
  return route.fullPath === '/' || route.fullPath === '/category' || route.fullPath === '/shopcar' || route.fullPath === '/mine'
})

</script>

<style lang="less">
</style>

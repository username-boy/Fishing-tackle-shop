<template>
  <div class="collect">
    <NavBar title="我的收藏" :left-arrow="true"/>
    <div class="collect-list">
        <ProductItem
          v-for="(item,idx) in store.state.collect"
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
import NavBar from "@/components/common/NavBar.vue";
import ProductItem from "@/views/product/modules/ProductItem.vue";
import {useStore} from "vuex";

let store = useStore()


</script>

<style lang="less" scoped>
.collect-list {
  width: 100%;
  margin-top: 47px;
}
</style>

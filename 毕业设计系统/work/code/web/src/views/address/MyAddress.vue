<template>
  <div class="my-address">
    <NavBar title="收货地址" :left-arrow="true"/>
    <div class="address-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import NavBar from "@/components/common/NavBar.vue";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const chosenAddressId = ref('1');
const list = ref([]);
list.value = store.state.address
const onAdd = () => {
  router.push('/add-address')
}
const onEdit = (item, index) => {
  console.log('item-->',item)
  console.log('index-->',index)
  router.push(`/edit-address/${index}`)
}
</script>

<style lang="less" scoped>
.my-address{
  width: 100%;
  .address-list{
    margin-top: 47px;
    width: 100%;
    height: calc(100vh - 47px);
  }
}
</style>

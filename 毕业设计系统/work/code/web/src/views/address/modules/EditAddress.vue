<template>
    <div class="edit-address">
        <NavBar title="编辑地址" :left-arrow="true"/>
        <div class="edit-list">
            <van-address-edit
              :area-list="areaList"
              show-delete
              show-set-default
              show-search-result
              :area-columns-placeholder="['请选择', '请选择', '请选择']"
              @save="onSave"
              @delete="onDelete"
              :address-info="addressInfo"
            />
        </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import {areaList} from "@vant/area-data";
import {ref} from 'vue'
import {showSuccessToast, showToast} from 'vant';
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const store = useStore()
let addressInfo = ref([])
addressInfo.value = store.state.address[route.params.idx]
const onSave = (info) => {
    let address = `${info.province}${info.city}${info.county} ${info.addressDetail}`
    let params = {
        address,
        id: Number((Math.random() * 100).toFixed(0)),
        name: info.name,
        tel: info.tel,
        isDefault: info.isDefault,
        idx: route.params.idx
    }
    if (info.isDefault) {
        store.commit('changeDefaultAddress', false)
        store.commit('editAddress', params)
        showSuccessToast('添加成功')
    } else {
        store.commit('editAddress', params)
        showSuccessToast('添加成功')
    }

    router.push('/my-address')
}
const onDelete = () => {
    store.commit('deleteAddress', route.params.idx)
    router.back()
}

</script>

<style lang="less" scoped>
.edit-address {
    width: 100%;

    .edit-list {
        width: 100%;
        margin-top: 47px;
        height: calc(100vh - 47px);
    }
}
</style>

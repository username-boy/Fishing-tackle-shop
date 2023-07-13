<template>
  <!-- 新增地址页面 -->
    <div class="add-address">
        <NavBar title="新增地址" :left-arrow="true"/>
        <div class="add-list">
            <van-address-edit
                    :area-list="areaList"
                    show-delete
                    show-set-default
                    show-search-result
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @delete="onDelete"
            />
        </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import {areaList} from "@vant/area-data";
import {showSuccessToast, showToast} from 'vant';
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const onSave = (info) => {
    let address = `${info.province}${info.city}${info.county} ${info.addressDetail}`
    let params = {
        address,
        id: Number((Math.random() * 100).toFixed(0)),
        name: info.name,
        tel: info.tel,
        isDefault: info.isDefault
    }
    if (info.isDefault) {
        store.commit('changeDefaultAddress', false)
        store.commit('addAddress', params)
        showSuccessToast('添加成功')
    } else {
        store.commit('addAddress', params)
        showSuccessToast('添加成功')
    }
    setTimeout(() => {
        router.push('/my-address')
    }, 1000)
}
const onDelete = () => showToast('delete');

</script>

<style lang="less" scoped>
.add-address {
  width: 100%;

  .add-list {
    margin-top: 47px;
    height: calc(100vh - 47px);
  }
}
</style>

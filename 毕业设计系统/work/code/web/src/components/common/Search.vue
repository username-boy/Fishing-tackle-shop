<template>
    <div class="search">
        <van-search
                v-model="keywords"
                show-action
                label="商品"
                placeholder="请输入搜索关键词"
        >
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
        </van-search>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const keywords = ref('')
const onClickButton = () => {
    if (keywords.value === '') return;
    // 携带搜索关键词进行路由跳转并传参(keywords)
    router.push({
        path: '/product-list',
        query: {
            keywords: keywords.value,
        }
    })
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  padding: 5px 0;
}
</style>

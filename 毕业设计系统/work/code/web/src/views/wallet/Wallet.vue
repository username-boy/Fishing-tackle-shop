<template>
  <div class="wallet">
    <!-- Navbar -->
    <NavBar title="钱包首页" :left-arrow="true"/>

    <!-- header -->
    <div class="header">
      <div class="left">
        <div class="left-header">钱包余额</div>
        <div class="left-footer">
          <span class="unit">￥</span>
          <span class="num">0.00</span>
        </div>
      </div>
      <div class="right">
        <div class="right-button">提现规则</div>
      </div>
    </div>
    <div class="center">
      <div class="center-title">历史奖励来源</div>
      <div class="center-list">
        <div class="center-item" v-for="(item,idx) in list" :key="idx" @click="showHandler">
          <div class="left">{{item.name}}</div>
          <div class="right">共计：{{item.num}}元 <van-icon name="arrow" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import NavBar from "@/components/common/NavBar.vue";
import {showToast} from "vant";
let list = [
  {
    name: '福利',
    num: 0,
  },
  {
    name: '分销奖金',
    num: 0,
  },
  {
    name: '拼团佣金',
    num: 0,
  },
]
const showHandler = () => {
  showToast("敬请期待")
}
</script>

<style lang="less" scoped>
.wallet{
  width: 100%;
  .header{
    width: 100%;
    margin-top: 47px;
    height: 200px;
    background-color: #F35150;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .left-header{
        width: 100%;
        height: 40%;
        font-size: 24px;
        display: flex;
        justify-content: center;
      }
      .left-footer{
        width: 100%;
        display: flex;
        justify-content: center;
        .unit{
          font-size: 18px;
        }
        .num{
          font-size: 20px;
        }
      }
    }
    .right{
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .right-button{
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 2px;
      }
    }
  }
  .center{
    width: 100%;
    .center-title{
      font-size: 16px;
      color: #333;
      padding: 10px 0 0 10px;
    }
    .center-list{
      width: 100%;
      display: flex;
      flex-direction: column;
      .center-item{
        border-bottom: 1px solid #ccc;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 10px;
        margin: 10px 0 0 0;
        .left{
          width: 100px;
        }
      }
    }
  }
}
</style>

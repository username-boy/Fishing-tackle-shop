<template>
    <div class="cart">
        <!-- NavBar组件 -->
        <NavBar title="购物车"/>

        <!-- 如果购物车中没有数据 -->
        <template v-if="!cartList">
            <van-empty description="购物车暂无商品">
                <van-button
                        @click="goHomeHandler"
                        round
                        type="primary"
                        class="bottom-button"
                        size="small"
                        style="padding: 2px 15px"
                >去首页看看
                </van-button>
            </van-empty>
        </template>

        <!-- 如果购物车中有数据 -->
        <template v-else>
            <div class="not-empty-status">
                <div class="header">
                    <!-- 顶部左侧全选框 -->
                    <div class="header-left">
                        <van-checkbox v-model="checked" @change="checkAllHandler">
                            <span style="color: #999">全选</span>
                        </van-checkbox>
                    </div>
                    <!-- 顶部右侧删除框 -->
                    <div class="header-right" @click="deleteHandler">
                        <van-icon name="delete-o" size="24" color="#999"></van-icon>
                    </div>
                </div>
                <div class="cart-list">
                    <div class="cart-item" v-for="(item,idx) in cartList">
                        <van-card
                                :num="item.productNum"
                                :price="item.product_price"
                                :desc="item.productType"
                                :title="item.product_title"
                                :thumb="BaseURL + item.product_img"
                        >
                            <template #footer>
                                <!-- 选中 -->
                                <div class="footer-box">
                                    <div class="footer-box-left">
                                        <van-checkbox v-model="item.isChecked" @change="itemChangeHandler"></van-checkbox>
                                    </div>
                                    <div class="footer-box-right">
                                        <van-button size="mini" @click="downNumHandler(idx)">-</van-button>
                                        <span class="footer-box-right-count">{{ item.productNum }}</span>
                                        <van-button size="mini" @click="addNumHandler(idx)">+</van-button>
                                    </div>
                                </div>
                            </template>
                        </van-card>
                    </div>
                </div>
                <div class="pay-box">
                    <div class="pay-box-left">
                        <!--            <div class="check-all">-->
                        <!--              全选-->
                        <!--              <van-checkbox v-model="checkAll"></van-checkbox>-->
                        <!--            </div>-->
                        <!-- 结算说明 -->
                        <div class="left-total-price">
                            <div>
                                合计：<span class="price">￥{{ computedTotalPrice }}</span>
                            </div>
                            <div class="info">(共{{ computedNum }}件商品)</div>
                        </div>
                        <!-- 结算按钮 -->
                        <div class="left-pay-button" @click="payHandler">结算</div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import NavBar from "@/components/common/NavBar.vue";
import {deleteCarById, getProductByUserId, payOrderApi} from "@/request/api";
import {showFailToast, showSuccessToast} from "vant";
import {showConfirmDialog} from 'vant';


let BaseURL = ref('http://localhost:3000/')

onMounted(() => {
    if (!store.getters.userIsLogin) {
        showFailToast('请先登录')
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } else {
        getCarProduct()
    }
})

const store = useStore()

const router = useRouter()

const carList = ref([])

const cartList = ref([])
const hasProduct = computed(() => {
    return cartList.value.length > 0
})

// 定义全选是否选中的状态变量
// const checked = computed(() => {
//   return cartList.value.every(item => item['isChecked'])
// })

const checked = ref(false)

/**
 * @desc 去首页看看按钮点击事件处理函数
 * */
const goHomeHandler = () => {
    store.commit('changeActive', 0)
    router.push('/')
}

/**
 * @desc 获取购物车中数据
 * */
const getCarProduct = async () => {
    try {
        let params = {
            userId: store.state.userInfo.userId
        }
        const {data} = await getProductByUserId(params)
        if (data.rsCode === 1) {
            cartList.value = data.data
            cartList.value.forEach(item => {
                item['productNum'] = 1
                item['isChecked'] = false
            })
        }
    } catch (e) {

    }
}

// 全选
const checkAllHandler = () => {
    if (checked.value) {
        cartList.value.forEach(item => item['isChecked'] = true)
    } else {
        cartList.value.forEach(item => item['isChecked'] = false)
    }
}

const itemChangeHandler = () => {
    if (cartList.value.every(item => item['isChecked'])) {
        checked.value = true
    }
}

// 底部结算区域计算属性
// 总价
const computedTotalPrice = computed(() => {
    return cartList.value.reduce((prev, cur) => {
        return ((prev + (cur['isChecked'] ? cur['product_price'] * cur['productNum'] : 0)))
    }, 0).toFixed(2)
})
// 商品数量
const computedNum = computed(() => {
    if (cartList.value.length === 0) return 0;
    return cartList.value.filter(item => item['isChecked']).length
})

// 商品数量减少事件处理函数
const downNumHandler = (idx) => {
    if (cartList.value[idx]['productNum'] === 1) return
    cartList.value[idx]['productNum'] -= 1
}
// 商品数量增加事件处理函数
const addNumHandler = (idx) => {
    cartList.value[idx]['productNum'] += 1
}

// 删除购物车商品
const deleteHandler = async () => {
    let deleteProductList = []
    deleteProductList = cartList.value.filter(item => item['isChecked'])
    // 如果没有勾选的商品则提示用户勾选商品
    if (deleteProductList.length === 0) {
        showFailToast('请勾选要删除的商品')
        return
    } else if (deleteProductList.length > 1) {
        showFailToast('一次最多删除一个商品')
        return
    } else {
        let params = {
            deleteId: deleteProductList[0]['product_id'],
            userId: store.state.userInfo.userId
        }
        console.log('params-->', params)
        const {data} = await deleteCarById(params)
        if (data.rsCode === 1) {
            showSuccessToast('删除成功')
            setTimeout(() => {
                getCarProduct() // 删除数据成功之后重新调接口更新购物车中的数据
            }, 1000)
        }
    }
}

// 用户选择商品点击结算的处理函数
const payHandler = async () => {
    const checkedProduct = cartList.value.filter(item => item.isChecked)
    if (checkedProduct.length === 0) {
        showFailToast("请勾选您要结算的商品")
        return
    }

    const productLength = checkedProduct.length // 选择了几件商品
    const productTotalPrice = checkedProduct.reduce((prev, cur) => {
        return prev + cur['productNum'] * cur['product_price']
    }, 0) // 选择的商品件数 × 商品价格 = 订单总价值
    // 获取结算商品的id
    const productIdArr = checkedProduct.map(item => item.product_id)
    if (productIdArr.length > 1) {
        showFailToast("一次只能结算一个商品")
        return
    }
    // 点击结算先吊起支付密码输入框
    showConfirmDialog({
        title: '标题',
        message: `您选择了${productLength}样商品，金额为${productTotalPrice}元，是否确认?`,
        beforeClose,
    }).then(res => {
        if (res === 'confirm') {
            let params = {
                productId: checkedProduct[0].product_id, // 商品id
                userId: store.state.userInfo.userId, // 用户id
                createTime: Date.now(), // 商品创建时间，保存当前的时间戳
                productTitle: checkedProduct[0].product_title, // 商品标题
                productPrice: checkedProduct[0].product_price, // 商品价格
                productImg: checkedProduct[0].product_img, // 商品封面图
                productDetailImg: checkedProduct[0].product_detail_img, // 商品详情图
                productNum: checkedProduct[0].productNum, // 商品数量
            }
            console.log('params-->', params)
            payOrderApi(params).then(res => {
                if (res.data.rsCode === 1) {
                    params = {
                        deleteId: checkedProduct[0].product_id,
                        userId: store.state.userInfo.userId
                    }
                    deleteCarById(params).then(res => {
                        if (res.data.rsCode === 1) {
                            showSuccessToast("支付成功")
                            router.go(0)
                        }
                    })
                }
            })
        }
    }).catch(err => {
        console.log('err-->', err)
        showFailToast("用户取消支付")
    })
}

const beforeClose = (action) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (action === 'confirm') {
                resolve(true);
            } else {
                // 拦截取消操作
                resolve(true);
            }
        }, 1000);
    });
}


</script>

<style lang="less" scoped>
.cart {
  background-color: #F5F5F5;
  width: 100%;
  height: calc(100vh - 94px);
  margin-top: 46px;
  margin-bottom: 51px;
  overflow-y: scroll;
  position: relative;

  .empty-status {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .info {
        font-size: 14px;
        color: #999
      }
    }
  }

  .not-empty-status {
    width: 100%;

    .header {
      width: 100%;
      height: 38px;
      margin-bottom: 10px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-left {
        margin-left: 10px;
      }

      .header-right {
        margin-right: 10px;
      }
    }

    .cart-list {
      .cart-item {
        margin: 8px 0;

        /deep/ .van-card {
          background-color: #fff;
        }
      }
    }

    /deep/ .footer-box {
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .footer-box-right {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .van-button {
          width: 30px;
          margin: 0;
        }

        .footer-box-right-count {
          width: 30px;
          text-align: center;
          font-size: 14px;
        }
      }
    }

    .pay-box {
      width: 100%;
      height: 44px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      position: fixed;
      bottom: 50px;
      left: 0;
      z-index: 999;
      display: flex;
      justify-content: end;

      .pay-box-left {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left-total-price {
          width: 100px;
          height: 90%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .left-pay-button {
          width: 100px;
          height: 100%;
          background-color: #d50000;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

</style>

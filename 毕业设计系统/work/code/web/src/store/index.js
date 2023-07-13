import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
    // vuex做持久化处理，解决页面刷新vuex数据丢失的问题
    plugins: [createPersistedState({
        storage: window.localStorage
    })],
    state: {
        active: 0, // 控制全局TabBar选项卡哪一个高亮
        carList: [], // 购物车中的数据数组，每一项为商品对象
        userInfo: {}, // 登录用户的姓名
        userAvatar: '', // 用户头像
        collect: [], // 用户收藏的商品数据
        address: [
            {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
            },
        ], // 用户收货地址
        orderList: [], // 用户结算之后模拟的订单数据
    },
    getters: {
        carNum: (state) => state.carList.length,
        userIsLogin: (state) => {
            return !!(state.userInfo.userName && state.userInfo.userId);
        }
    },
    mutations: {
        /**
         * @desc 修改active的值，以改变当前高亮TabBar
         * */
        changeActive(state, payload) {
            state.active = payload
        },

        /**
         * @desc 新增购物车中数据(往cartList中添加数据)
         * */
        addCar(state, payload) {
            state.carList.push(payload) // 这儿添加的payload是对象类型，其中包含了某一商品的所有详细数据
        },

        /**
         * @desc 删除购物车中数据(将cartList中的某一数据删除，可以根据product_id进行过滤)
         * */
        deleteCar(state, payload) {
            state.carList.filter(item => item.product_id !== payload) // 这儿删除时传递的payload是商品的product_id，通过product_id进行过滤，从而起到删除的效果
        },

        /**
         * @desc 更新登录用户的姓名
         * */
        updateUserInfo(state, payload) {
            state.userInfo = payload
        },

        /**
         * @desc 更新登录用户的头像
         * */
        updateUserAvatar(state, payload) {
            state.userAvatar = payload
        },

        /**
         * @desc 用户收藏商品，将其添加到收藏数组中
         * */
        addCollect(state, payload) {
            state.collect.push(payload)
        },

        /**
         * @desc 用户取消收藏，将其从收藏数组中移除
         * */
        removeCollect(state, payload) {
            state.collect = state.collect.filter(item => item.product_id !== payload)
        },

        /**
         * @desc 用户新增收货地址
         * */
        addAddress(state, payload) {
            state.address.push(payload)
        },

        /**
         * @desc 用户修改默认地址
         * */
        changeDefaultAddress(state, payload) {
            state.address.forEach(item => {
                if (item.isDefault) {
                    item.isDefault = payload
                }
            })
        },

        /**
         * @desc 用户编辑收货地址
         * */
        editAddress(state, payload) {
            state.address[payload["idx"]] = payload
        },

        /**
         * @desc 用户点击结算之后更新orderList
         * */
        addOrderList(state, payload) {
            console.log('payload-->', payload)
            state.orderList.concat(payload)
        },

        /**
         * @desc 用户删除某一个收货地址
         * */
        deleteAddress(state, payload) {
            state.address.splice(payload, 1)
            console.log(state.address)
        }
    },
    actions: {},
    modules: {}
})

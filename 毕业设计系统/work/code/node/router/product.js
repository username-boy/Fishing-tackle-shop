const express = require('express')
const router = express.Router()

const productGetController = require('../controller/product/get.controller')
const productSearchController = require('../controller/product/search.controller')
const productCateController = require('../controller/product/cate.controller')
const getDetailController = require('../controller/product/get.detail.controller')
const getHotController = require('../controller/product/get.hot.controller')
const getNewController = require('../controller/product/get.new.controller')
const getRecController = require('../controller/product/get.rec.controller')

/*获取商品列表、商品详情的接口*/
router.get('/product/getList',productGetController)

/*根据用户搜索关键词模糊查询某一商品*/
router.post('/product/search', productSearchController)

/*根据分类id查询所有商品接口*/
router.post('/product/cate',productCateController)

/*根据商品id获取商品详细数据*/
router.post('/product/detail',getDetailController)

/*获取热销榜单数据接口，通过销量降序*/
router.post('/product/hot',getHotController)

/*获取新品商品数据接口*/
router.post('/product/new',getNewController)

/*获取为你推荐商品接口*/
router.post('/product/rec',getRecController)

module.exports = router

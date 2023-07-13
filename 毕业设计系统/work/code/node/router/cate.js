// 分类路由的入口
const express = require('express')
const router = express.Router()

const getCateController = require('../controller/cate/get.cate.controller')
const cateProController = require('../controller/cate/cate.pro.controller')

/*获取分类信息的接口*/
router.get('/cate/cateList', getCateController)

/*获取分类信息下的商品数据*/
router.post('/cate/productList',cateProController)

module.exports = router

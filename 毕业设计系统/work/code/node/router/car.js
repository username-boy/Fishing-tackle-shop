const express = require('express')
const router = express.Router()

const getController = require('../controller/car/get.controller')
const addController = require('../controller/car/add.controller')
const deleteController = require('../controller/car/delete.controller')
const checkController = require('../controller/car/check.controller')
/*获取购物车中数据，根据user_id进行查询*/
router.post('/car/getList', getController)

/*检查当前用户购物车中有无某一商品*/
router.post('/car/check',checkController)

/*将商品加入购物车，需要保存user_id和product_id*/
router.post('/car/add', addController)

/*将商品从购物车中删除*/
router.post('/car/delete',deleteController)

module.exports = router

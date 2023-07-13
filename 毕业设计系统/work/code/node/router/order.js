const express = require('express')
const router = express.Router()

const getOrderController = require('../controller/order/get.order.controller')
const payOrderController = require("../controller/order/pay.order.controller")

router.post('/order/getList',getOrderController)

router.post('/order/pay',payOrderController)

module.exports = router

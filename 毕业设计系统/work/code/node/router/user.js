const express = require('express')
const router = express.Router()

const userLoginController = require('../controller/user/userLoginController')
const userRegisterController = require('../controller/user/userRegisterController')
const getUserInfo = require('../controller/user/get.userinfo.controller')
const changeUserInfoController = require('../controller/user/change.useinfo.controller')
const updateAvatarController = require('../controller/user/update.avatar.controller')
/*用户登录接口*/
router.post('/user/login', userLoginController)

/*用户注册接口*/
router.post('/user/register', userRegisterController)

/*获取已登录用户的信息*/
router.post('/user/getUserInfo', getUserInfo)

/*修改登录用户的信息*/
router.post('/user/changeUserInfo',changeUserInfoController)

/*用户上传头像*/
router.post('/user/updateAvatar',updateAvatarController)

module.exports = router

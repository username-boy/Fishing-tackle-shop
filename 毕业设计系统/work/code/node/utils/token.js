let jwt = require('jsonwebtoken')
let {expressjwt} = require('express-jwt')

let jwtSecrect = "ideal-fish-h5" // 签名

/**
 * @desc 登录接口，生成token的方法
 * @param {String} user_name 用户名
 * @param {Number} user_id 用户id
 * @param {Number} expiresIn token有效期
 */
const setToken = function (user_name, user_id, expiresIn) {
  return jwt.sign(
	{user_name: user_name, user_id: user_id},
	jwtSecrect,
	{expiresIn}
  )
}

/**
 * @desc 各个接口需要验证token的方法
 * @param {String} token 生成的用户token
 * */
const getToken = function (token) {
  if (!token) {
	console.log('token为空')
	return 0
  } else {
	let info = null
	try {
	  info = jwt.verify(token, jwtSecrect)
	} catch (e) {
	}
	return info
  }
}

/**
 * @desc 解析token
 * */
let decodeToken = expressjwt({
  credentialsRequired: true, // 是否需要校验
  secret: jwtSecrect, // 密钥
  algorithms: ['HS256'], // 加密方式
}).unless({
  path: [
    '/v1/user/login',
    '/v1/user/register',
    '/v1/cate/cateList',
    '/v1/user/getUserInfo',
    '/v1/user/changeUserinfo',
    '/v1/public/img',
    '/v1/public/avatar',
    '/v1/product/cate',
    '/v1/product/detail',
    '/v1/car/add',
    '/v1/car/getList',
    '/v1/car/delete',
    '/v1/product/hot',
    '/v1/product/new',
    '/v1/product/rec',
    '/v1/product/search',
    '/v1/car/check',
    '/v1/cate/productList',
    '/v1/order/getList',
    '/v1/order/pay',
    '/v1/upload',
    '/v1/user/updateAvatar'
  ] // 不要校验的路由
})

/**
 * @desc 定义token错误处理中间件
 * */
function errorToken(err, req, res, next) {
  console.log('error-->', err, err.name)
  let code = 500
  let message = "Interval Server Error"
  // 当token解析出错时
  if (err.name === 'UnauthorizedError') {
	code = 401
	message = 'token 解析错误'
  }
  res.statusCode = code
  res.send({
	status: code,
	message
  })
}

// 导出
let errorHandler = (module.exports = {
  setToken,
  getToken,
  decodeToken,
  errorToken
})

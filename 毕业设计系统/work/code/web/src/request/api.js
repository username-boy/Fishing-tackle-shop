// 接口统一管理
import request from './http'

/**
 * @desc 获取商品列表
 * */
export const getProductListApi = params => request.get('/product/getList', params)

/**
 * @desc 根据关键词模糊查询
 * */
export const searchProductApi = params => request.post('/product/search', params)

/**
 * @desc 获取分类信息
 * */
export const getCateListApi = params => request.get('/cate/cateList', params)

/**
 * @desc 用户登录接口
 * */
export const userLoginApi = params => request.post('/user/login', params)

/**
 * @desc 用户注册接口
 * */
export const userRegisterApi = params => request.post('/user/register', params)

/**
 * @desc 获取登录用户信息接口
 * */
export const getUserInfoApi = params => request.post('/user/getUserInfo', params)

/**
 * @desc 修改用户信息接口
 * */
export const changeUserInfoApi = params => request.post('/user/changeUserinfo', params)

/**
 * @desc 根据分类id获取某一分类下的商品数据接口
 * */
export const getProductByCateId = params => request.post('/product/cate', params)

/**
 * @desc 根据商品id 获取商品详细数据接口
 * */
export const getProductDetailApi = params => request.post('/product/detail', params)

/**
 * @desc 将商品添加到购物车中
 * */
export const addProductToCarApi = params => request.post('/car/add', params)

/**
 * @desc 获取当前登录用户购物车数据接口
 * */
export const getProductByUserId = params => request.post('/car/getList', params)

/**
 * @desc 通过用户id 和product_id删除购物车的数据
 * */
export const deleteCarById = params => request.post('/car/delete',params)

/**
 * @desc 获取热销商品数据接口
 * */
export const getHotProductApi = params => request.post('/product/hot',params)

/**
 * @desc 获取热销商品数据接口
 * */
export const getNewProductApi = params => request.post('/product/new',params)

/**
 * @desc 获取为您推荐商品数据
 * */
export const getRecProductApi = params => request.post('/product/rec',params)

/**
 * @desc 检查当前用户购物车中是否含有某个商品接口
 * */
export const checkCarApi = params => request.post('/car/check',params)

/**
 * @desc 获取某一分类下的详细数据,用于二级联动效果
 * */
export const getProductCateApi = params => request.post('/cate/productList',params)

/**
 * @desc 获取订单相关数据
 * */
export const getOrderDataApi = params => request.post('/order/getList',params)

/**
 * @desc 用户下单支付商品
 * */
export const payOrderApi = params => request.post('/order/pay',params)

/**
 * @desc 用户上传头像
 * */
export const uploadAvatarApi = params => request.post('/upload',params)

/**
 * @desc 更新数据库中用户头像的数据
 * */
export const updateUserAvatarApi = params => request.post('/user/updateAvatar',params)

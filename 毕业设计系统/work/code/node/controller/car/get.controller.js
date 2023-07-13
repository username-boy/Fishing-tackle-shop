const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

/**
 * @desc 根据user_id 查询当前用户购物车中的数据信息
 * */
const getController = (req, res) => {
  let userId = req.body.userId
  console.log(req.body)
  if (!userId) {
	res.send(errorHandler(-1, '参数错误，参数userId为必需参数'))
  } else {
	// 先查询出当前用户购物车中的所有数据-->行
	let sql = `SELECT * FROM car_info WHERE user_id = ?`
	db.query(sql, userId, (err, result) => {
	  if (err) {
		res.send(errorHandler(-1, '数据库错误'))
		throw err
	  } else {
		// 获取查询到的结果 -- result，其中包含product_id,根据product_id 对product_info进行复查，最后将查询到的商品数据组合成数组返回
		if (result.length === 0) {
		  res.send(successHandler(1, null, '暂无数据'))
		} else {
		  const productId = result.map(item => item.product_id)
		  console.log('productId-->', productId)
		  let productResult = []
		  let _sql = `SELECT * FROM product_info WHERE product_id = ?`
		  for (let i = 0; i < productId.length; i++) {
			db.query(_sql, [productId[i]], (err2, result2) => {
			  if (err) {
				res.send(errorHandler(-1, '查询商品信息出错'))
				throw err
			  }
			  productResult.push(...result2)
			  console.log('result2-->', ...result2)
			  console.log('productResult-->', productResult)
			})
		  }
		  // 这儿nodejs单线程，必须写个异步的方式 才能有返回结果
		  setTimeout(() => {
			res.send(successHandler(1, productResult, '操作成功'))
		  }, 100)
		}
	  }
	})
  }
}

module.exports = getController

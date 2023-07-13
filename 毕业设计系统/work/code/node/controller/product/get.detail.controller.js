const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getDetailController = (req, res) => {
  let productId = req.body.productId
  let sql = 'SELECT * FROM product_info WHERE product_id = ?'
  db.query(sql, productId, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '获取商品数据出错'))
	  throw err
	} else if (result.length > 0) {
	  result[0].product_detail_img = result[0].product_detail_img.split('&')
	  res.send(successHandler(1, result[0], '操作成功'))
	} else {
	  res.send(errorHandler(-1, '暂无商品信息'))
	}
  })
}

module.exports = getDetailController

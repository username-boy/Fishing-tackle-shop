const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const addController = (req, res) => {
  let productId = req.body.productId
  let userId = req.body.userId
  let sql = 'INSERT INTO car_info (user_id,product_id) VALUES (?,?)'
  db.query(sql, [userId, productId], (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '未知错误'))
	  throw err
	} else {
	  if (result.affectedRows > 0) {
		res.send(successHandler(1, null, '操作成功'))
	  } else {
		res.send(errorHandler(-1, '加入购物车失败'))
	  }
	}
  })
}

module.exports = addController

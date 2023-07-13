const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getHotController = (req, res) => {
  let sql = 'SELECT * FROM product_info ORDER BY product_sales DESC LIMIT 0,10'
  db.query(sql, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '未知错误'))
	  throw err
	} else {
	  res.send(successHandler(1, result, '操作成功'))
	}
  })
}

module.exports = getHotController

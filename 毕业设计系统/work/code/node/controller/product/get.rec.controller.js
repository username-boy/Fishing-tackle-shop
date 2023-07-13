const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getRecController = (req, res) => {
  let sql = 'SELECT * FROM product_info'
  db.query(sql, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '未知错误'))
	  throw err
	} else {
	  res.send(successHandler(1, result, '操作成功'))
	}
  })
}

module.exports = getRecController

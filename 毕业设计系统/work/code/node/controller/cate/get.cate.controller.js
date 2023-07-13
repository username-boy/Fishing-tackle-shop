const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getCateController = (req, res, next) => {
  let sql = 'SELECT * FROM cate_info'
  db.query(sql, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '未知错误'))
	} else {
	  res.send(result.length > 0 ? successHandler(1, result, '操作成功') : errorHandler(-1, '暂无数据'))
	}
  })
}

module.exports = getCateController

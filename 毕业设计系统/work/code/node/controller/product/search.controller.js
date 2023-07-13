const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

/**
 * @desc 根据关键词模糊搜索商品
 * @param {String} keywords 关键词
 * */
const searchController = (req, res) => {
  let keywords = req.body.keywords
  let sql = `SELECT * FROM product_info WHERE product_title LIKE '%${keywords}%'`
  if (!keywords) {
	res.send(errorHandler(-1, '缺少必要参数keywords'))
  } else {
	db.query(sql, (err, result) => {
	  if (err) {
		res.send(errorHandler(-1, '未知错误'))
		throw err
	  } else {
		res.send(result.length > 0 ? successHandler(1, result, '查询成功') : errorHandler(-1, '暂无数据'))
	  }
	})
  }
}

module.exports = searchController

const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const productCateController = (req, res) => {
  let cateId = req.body.cateId
  let sql = 'SELECT * FROM product_info WHERE product_cate = ?'
  db.query(sql, cateId, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '查询数据出错'))
	  throw  err
	} else if (result.length > 0) {
	  console.log(result)
	  result.map(item => {
		item['product_detail_img'] = item['product_detail_img'].split('&')
		return item
	  })
	  setTimeout(() => {
		res.send(successHandler(1, result, '获取成功'))
	  }, 100)
	}
  })
}

module.exports = productCateController

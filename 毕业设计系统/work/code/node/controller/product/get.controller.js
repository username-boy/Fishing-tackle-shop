const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')
/**
 * @desc 获取商品列表控制器
 * */
const getController = (req, res, next) => {
  let sql = `SELECT * FROM product_info`
  db.query(sql, (err, result) => {
    if (err) {
      res.send(errorHandler(-1, '未知错误'))
      throw err
    } else {
      res.send(result.length > 0 ? successHandler(1, result, '操作成功') : errorHandler(404, '暂无数据'))
    }
  })
}

module.exports = getController

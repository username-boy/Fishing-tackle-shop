const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const cateProController = (req, res) => {
  let sql = 'SELECT * FROM product_info WHERE product_cate = ?'
  let _sql = 'SELECT cate_id,cate_name FROM cate_info'
  db.query(_sql, null, (err, result) => {
    if (err) {
      res.send(errorHandler(-1, '获取分类条数出错'))
      throw err
    } else {
      let len = result.length
      for (let i = 0; i < len; i++) {
        db.query(sql, result[i]['cate_id'], (err2, result2) => {
          if (err2) {
            res.send(errorHandler(-1, '获取分类商品出错'))
            throw err2
          } else if (!result[i].hasOwnProperty('child')) {
            result[i]['child'] = result2
          }
        })
      }
      setTimeout(() => {
        res.send(successHandler(1, result, '操作成功'))
      }, 100)
      // console.log('result-->', result)
    }
  })
}

module.exports = cateProController

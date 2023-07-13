const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const checkController = (req,res) => {
  const userId = req.body.userId
  const productId = req.body.productId
  let sql = 'SELECT * FROM car_info WHERE user_id = ? AND product_id = ?'
  db.query(sql,[userId,productId],(err,result) => {
    if(err){
      res.send(errorHandler(-1,'未知错误'))
      throw err
    } else if(result.length > 0){
      res.send(successHandler(2,null,'该商品已经加入过购物车'))
    } else {
      res.send(successHandler(1,null,'可以添加到购物车'))
    }
  })
}

module.exports = checkController

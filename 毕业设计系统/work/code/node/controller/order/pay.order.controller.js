const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const payOrderController = (req, res) => {
  const productId = req.body.productId
  const userId = req.body.userId
  const createTime = req.body.createTime
  const productTitle = req.body.productTitle
  const productPrice = req.body.productPrice
  const productImg = req.body.productImg
  const productDetailImg = req.body.productDetailImg
  const status = 1
  const productNum = req.body.productNum
  let sql = `INSERT INTO order_info (order_id,user_id,order_create_time,status,order_pro_id,product_title,product_img,product_detail_img,order_num,product_price) VALUES (?,?,?,?,?,?,?,?,?,?)`
  db.query(sql,[createTime,userId,createTime,status,productId,productTitle,productImg,productDetailImg,productNum,productPrice],(err,result) => {
    if(err){
      res.send(errorHandler(-1,'未知错误'))
      throw err
    } else if(result.affectedRows > 0) {
      res.send(successHandler(1,null,'支付成功'))
    } else {
      res.send(errorHandler(-1,'支付失败，请稍后再试'))
    }
  })
}

module.exports = payOrderController

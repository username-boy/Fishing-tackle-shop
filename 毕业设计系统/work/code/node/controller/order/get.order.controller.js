const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getOrderController = (req,res) => {
  let status = req.body.statusId
  let userId = req.body.userId
  let sql = 'SELECT * FROM order_info WHERE status = ? AND user_id = ?'
  if(!status){
    res.send(errorHandler(-1,'缺少订单状态status参数'))
    return
  }
  if(!userId){
    res.send(errorHandler(-1,'缺少用户id参数'))
    return;
  }
  db.query(sql,[status,userId],(err,result) => {
    if(err){
      res.send(errorHandler(-1,'获取订单数据失败'))
      throw err
    } else if(result.length > 0 ){
      console.log('order-->',result)
      res.send(successHandler(1,result,'操作成功'))
    } else {
      res.send(errorHandler(-1,'暂无订单数据'))
    }
  })
}

module.exports = getOrderController

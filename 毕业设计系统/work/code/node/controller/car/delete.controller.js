const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const deleteController = (req, res) => {
  console.log(req.body)
  // 商品id
  let deleteId = req.body.deleteId
  // 用户id
  let userId = req.body.userId
  let sql = "DELETE FROM car_info WHERE user_id = ? AND product_id = ?"
  db.query(sql, [userId, deleteId], (err, result) => {
    if (err) {
      res.send(errorHandler(-1, '删除失败'))
      throw err
    } else if(result.affectedRows > 0) {
      res.send(successHandler(1, null, '删除成功'))
    } else {
      res.send(errorHandler(-1,'删除失败'))
    }
  })
}

module.exports = deleteController

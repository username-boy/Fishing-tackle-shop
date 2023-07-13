const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const updateAvatarController = (req,res) => {
  let userId = req.body.userId
  let avatarUrl = req.body.avatarUrl
  let sql = 'UPDATE user_info SET user_avatar = ? WHERE user_id = ?'
  db.query(sql,[avatarUrl,userId],(err,result) => {
    if(err){
      res.send(errorHandler(-1,'上传头像失败'))
      throw err
    } else if(result.affectedRows > 0) {
      res.send(successHandler(1,null,'头像上传成功'))
    } else {
      res.send(errorHandler(-1,'未知错误'))
    }
  })
}

module.exports = updateAvatarController

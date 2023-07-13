const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const getUserInfo = (req,res) => {
  const userId = req.body.userId
  let sql = 'SELECT * FROM user_info WHERE user_id = ?'
  db.query(sql,userId,(err,result) => {
	if(err){
	  res.send(errorHandler(-1,'未知错误'))
	  throw err
	} else if(result.length > 0){
	  res.send(successHandler(1,result[0],'操作成功'))
	} else {
	  res.send(errorHandler(-1,'暂无此用户信息'))
	}
  })
}

module.exports = getUserInfo

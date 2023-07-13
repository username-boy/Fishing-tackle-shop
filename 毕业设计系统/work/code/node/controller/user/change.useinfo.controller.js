const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

const changeUserInfoController = (req, res) => {
  let userId = req.body.userId
  let userNickname = req.body.userNickname
  let userEmail = req.body.userEmail
  let sql = 'SELECT * FROM user_info WHERE user_id = ?'
  db.query(sql, userId, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '未知错误'))
	  throw err
	} else if (result.length === 0) {
	  res.send(errorHandler(-1, '暂无此用户信息'))
	} else {
	  let _sql = `UPDATE user_info SET user_nickname = ?,user_email = ? WHERE user_id = ?`
	  db.query(_sql, [userNickname, userEmail, userId], (err2, result2) => {
		if (err2) {
		  res.send(errorHandler(-1, '更新失败'))
		  throw err
		} else {
		  console.log('result2-->', result2)
		  if (result2.affectedRows > 0) {
			let _sql2 = "SELECT * FROM user_info WHERE user_id = ?"
			db.query(_sql2,userId,(err3,result3) => {
			  if(err3) {
				res.send(errorHandler(-1,'查询更新后的数据错误'))
				throw err
			  } else if(result3.length > 0){
				res.send(successHandler(1,result3[0],'操作成功'))
			  } else {
				res.send(errorHandler(-1,'暂无此用户信息'))
			  }
			})
		  } else {
			res.send(errorHandler(-1, '未知错误'))
		  }
		}
	  })
	}
  })
}

module.exports = changeUserInfoController

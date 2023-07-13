const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

let {setToken} = require('../../utils/token')
/**
 * @desc 用户登录接口
 * */
const userLoginController = (req, res) => {
  // 获取用户传递参数
  let userTel = req.body.user_tel // 用户手机号
  let password = req.body.user_pwd // 用户密码
  if (!userTel) {
	res.send(errorHandler(-1, '账号信息为空'))
	return;
  }
  if (!password) {
	res.send(errorHandler(-1, '密码为空'))
	return;
  }
  let sql = `SELECT * FROM user_info WHERE user_tel = ?`
  db.query(sql, userTel, (err, result) => {
	if (err) {
	  res.send(errorHandler(-1, '数据库错误'))
	  throw err
	} else if (result.length === 0) {
	  res.send(errorHandler(-1, '暂无此用户信息'))
	} else {
	  if (password === result[0].user_pwd) {
		let data = {
		  userName: result[0].user_nickname, // 用户昵称
		  userId: result[0].user_id // 用户id
		}
		res.json({
		  code: 1,
		  msg: '登录成功',
		  data,
		  token: setToken(result[0].user_name, result[0].id, "3600s")
		})
	  } else {
		res.send(errorHandler(-1, '密码错误'))
	  }
	}
  })
}

module.exports = userLoginController

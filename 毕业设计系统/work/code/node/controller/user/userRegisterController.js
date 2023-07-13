const db = require('../../database/pool')
const errorHandler = require('../../utils/errorHandler')
const successHandler = require('../../utils/successHandler')

/**
 * @desc 用户注册接口
 * */
const userRegisterController = (req, res) => {
  let userName = req.body.user_nickname || ''
  let userEmail = req.body.user_email || ''
  let userTel = req.body.user_tel
  let userPwd = req.body.user_pwd
  let userIsVip = req.body.user_is_vip || 0
  let sql = `SELECT * FROM user_info WHERE user_tel = ?`
  if (!userTel) {
    res.send(errorHandler(-1, '用户手机号不能为空'))
    return;
  }
  if (!userPwd) {
    res.send(errorHandler(-1, '密码不能为空'))
    return;
  }
  db.query(sql, userTel, (err, result) => {
    if (err) {
      res.send(errorHandler(-1, '服务器错误'))
      throw err
    } else if (result.length === 0) {
      // 没有相同手机号的用户，可以进行注册
      let _sql = `INSERT INTO user_info (user_nickname,user_tel,user_email,user_pwd,user_is_vip) VALUES
				(?,?,?,?,?)`
      db.query(_sql, [userName, userTel, userEmail, userPwd, userIsVip], (err2, result2) => {
        if (err2) {
          res.send(errorHandler(-1, '未知错误'))
          throw err2
        } else {
          if (result2.affectedRows > 0) {
            res.send(successHandler(1, null, '注册成功'))
          } else {
            res.send(errorHandler(-1, '未知原因，注册失败'))
          }
        }
      })
    } else {
      // result长度大于 0 ，说明当前注册用户的手机号已经被注册过了，说明当前手机号不能进行注册
      res.send(errorHandler(-1, '该手机号已注册'))
    }
  })
}

module.exports = userRegisterController

// 这是mySQL连接池信息文件
const mysql = require('mysql')
// 创建连接池
const db = mysql.createPool({
  host: '127.0.0.1', // 连接到本机的数据库
  port: '3306', // mySQL默认端口 3306
  user: 'root', // 用户名
  password: 'root',
  database: 'fish-h5', // 指定数据库名称
  multipleStatements: true
})

module.exports = db

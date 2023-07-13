const express = require('express')
const app = express()
const port = 3000
const successHandler = require('./utils/successHandler')
const db = require('./database/pool')


// 使用express的静态资源托管
app.use(express.static('public'))

// 导入token相关
let {decodeToken, errorToken} = require('./utils/token')
app.use(decodeToken) // 解析token

// 解决post请求获取参数与响应的问题
const bodyParser = require('body-parser')
// 上传文件必须要把其配置为true,否则二进制文件转化的时候没有文件后缀名
app.use(bodyParser.urlencoded({extended: true}))

// 通过cors解决跨域的问题
const cors = require('cors')
app.use(cors('*'))

// 上传文件所需的配置
const formidable = require('formidable')
app.post('/v1/upload', function (req, res, next) {
  const form = formidable({
    uploadDir: path.join(__dirname, './public/avatar/'),
    keepExtensions: true
  })
  console.log(req.body)
  // 保留文件扩展名
  // 文件存储路径，最后一个目录需要 + / 否则会被保存到public目录下
  form.parse(req, (err, fields, files) => {
    if (err) return next(err)
    let imgPath = files.file.newFilename
    res.send(successHandler(1,{path: imgPath},'操作成功'))
  })
})

// 商品路由
const productRouter = require('./router/product')

// 分类信息路由
const cateRouter = require('./router/cate')

// 购物车路由
const carRouter = require('./router/car')

// 用户模块路由
const userRouter = require('./router/user')

// 订单路由模块
const orderRouter = require('./router/order')
const path = require("path");

// 挂载不同的路由接口 v1为restful接口前缀
app.use('/v1', productRouter)
app.use('/v1', cateRouter)
app.use('/v1', carRouter)
app.use('/v1', userRouter)
app.use('/v1', orderRouter)

app.use(errorToken)
app.listen(port, function () {
  console.log(`Server is running at http://localhost:${port}`)
})

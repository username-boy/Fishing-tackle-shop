/**
 * @desc 封装一个响应成功信息的工具函数
 * */
const successHandler = (rsCode,data,rsCause) => {
  return {
    rsCode,
    data,
    rsCause
  }
}

module.exports = successHandler

/**
 * @desc 封装一个响应错误信息的工具函数
 * */
const errorHandler = (rsCode,rsCause) => {
  return {
    rsCode: rsCode,
    rsCause: rsCause,
    data: null
  }
}

module.exports = errorHandler

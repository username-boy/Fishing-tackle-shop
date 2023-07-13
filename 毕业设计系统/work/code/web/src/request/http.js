import axios, {Axios} from "axios";
import {showFailToast, Toast} from 'vant'
import app from "@/main";
import getUserToken from "@/utils/getUserToken";

let cancelreq
const request = axios.create({
  baseURL: 'http://localhost:3000/v1',
  timeout: 30000,
})

request.interceptors.request.use((config) => {
  // 如果是post请求方式，需要设置 “Content-Type:application/x-www-form-urlencoded”
  if(config.method === 'post'){
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
  }
  console.log('url-->',config.url)
  // 如果是加入购物车，查看购物车数据等操作，需要设置请求头
  if(config.url === '/user/login' || config.url === '/user/register') return config
  config.cancelToken = new axios.CancelToken((c) => {cancelreq = c})
  // 读取当前用户的token
  const token = getUserToken()
  config.headers.setAuthorization(token) // 携带 token 发送请求
  return config
},(error) => {
  console.log('http-error-->',error)
})

request.interceptors.response.use((response) => {
  const {data} = response
  // 如果没有获取到正确的状态码，则进行弹窗提示
  if(data.rsCode !== 1){
    showFailToast(data.rsCause)
  }
  return Promise.resolve(response)
})
export default request



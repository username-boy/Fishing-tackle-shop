/**
 * @desc 获取登录用户的token
 * */
export default function getUserToken(){
  return window.localStorage.getItem('token')
}

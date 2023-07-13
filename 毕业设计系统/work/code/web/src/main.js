import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式变量文件
import './styles/index.less'

// 引入移动端适配工具，自动获取根元素font-size属性
import 'lib-flexible'

// 全局注册Vant-Toast轻提示组件，用于网络请求失败或者加载中的交互提示
import {Toast} from "vant";

// 引入vant函数式组件的样式
import 'vant/es/toast/style'; // toast
import 'vant/es/dialog/style'; // dialog
import 'vant/es/notify/style'; // notify
import 'vant/es/image-preview/style'; // image-preview

const app = createApp(App).use(store).use(router).use(Toast).mount('#app')
export default app

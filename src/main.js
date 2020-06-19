import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' // 全局样式表
import './assets/fonts/iconfont.css' // icon图标样式表
import axios from 'axios'
import lodash from 'lodash'
import JSEncrypt from 'jsencrypt'

axios.defaults.baseURL = 'http://121.199.70.70:8080/api/' // 配置请求根路径

Vue.prototype.$http = axios
Vue.prototype._ = lodash
Vue.prototype.$encryptedData = function (publicKey, password) { // 加密
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey) // 设置公钥
  return encrypt.encrypt(password)
}
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
// 1. 导入 store 的实例对象
import store from './store/store.js'
// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
// wx.$http = $http
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title:"数据加载中..."
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
//弹窗方法
uni.$showMsg=function(titel="数据加载失败!",duration=1500){
  uni.showToast({
    title,
    duration,
    icon:"none"
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    // 2. 将 store 挂载到 Vue 实例上
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
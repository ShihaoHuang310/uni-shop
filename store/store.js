import Vue from 'vue';
import Vuex from 'vuex'
// 1. 导入购物车的 vuex 模块
import moduleCart from './cart.js'
// 导入用户的 vuex 模块
import moduleUser from './user.js'
// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)
// 3. 创建 Store 的实例对象
const store=new Vuex.Store({
  modules:{
    m_cart:moduleCart,
    m_user:moduleUser
  }
  
})
export default store


export default{
  namespaced:true,
  state:()=>({
    // 收货地址
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        // 登录成功之后的 token 字符串
        token:uni.getStorageSync('token') || '',
        // 用户的基本信息
        userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        // 重定向的 object 对象 { openType, from }
        redirectInfo: null
  }),
  mutations:{
    // / 更新收货地址
    updateAddress(state,address){
      state.address=address
    },
    // // 更新用户的基本信息
    updateUserInfo(state,userinfo){
      state.userinfo=userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    
  // 更新 token 字符串
    updateToken(state,token){
      state.token=token
      this.commit('m_user/saveTokenToStorage')
    },
  // 更新重定向的信息对象
  updateRedirectInfo(state,info){
    state.redirectInfo=info
  },
    // 1. 定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    // 将 userinfo 持久化存储到本地
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
     // 将 token 字符串持久化存储到本地
     saveTokenToStorage(state){
       uni.setStorageSync('token',state.token)
     }
  },
   // 数据包装器
    getters: {
      addstr(state){
        if(!state.address.provinceName) return ''
        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return state.address.provinceName + state.address.cityName +state.address.countyName + state.address.detailInfo
      }
    },
}
export default{
  namespaced:true,
  state:()=>({
    // 收货地址
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  mutations:{
    // / 更新收货地址
    updateAddress(state,address){
      state.address=address
    },
    // 1. 定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
   // 数据包装器
    getters: {
      addstr(state){
        if(!this.address.provinceName) return ''
        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return this.address.provinceName + this.address.cityName +this.address.countyName + this.address.detailInfo
      }
    },
}
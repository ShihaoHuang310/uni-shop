<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
        <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜素历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show:true,
        showSync:true,
        searchVal:'',
         // 延时器的 timerId
         timer:null,
          // 搜索关键词
          kw:'',
          // 搜索结果列表
          searchResults:[],
            // 搜索关键词的历史记录
         historyList: ['a', 'app', 'apple']
      };
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed:{
      historys(){
        return [...this.historyList].reverse()
      }
    },
    methods:{
      input(e){
        // console.log(e);
         // 清除 timer 对应的延时器
         clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
          this.kw=e.value
         // 根据关键词，查询搜索建议列表
         this.getSearchList()
        },500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList(){
        // 判断关键词是否为空
        if(this.kw===''){
          this.searchResults=[]
          return
        }
        // 发起请求，获取搜索建议列表
        const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        // console.log(res);
        if(res.meta.status!==200) return uni.$showMsg()
        this.searchResults=res.message
        this.saveSearchHistory()
      },
      // 2. 保存搜索关键词的方法
      saveSearchHistory(){
         // 1. 将 Array 数组转化为 Set 对象
         const set=new Set(this.historyList)
         // 2. 调用 Set 对象的 delete 方法，移除对应的元素
         set.delete(this.kw)
           // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        set.add(this.kw)
        this.historyList=Array.from(set)
        // this.historyList.push(this.kw)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      gotoDetail(goods_id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      },
      // 清空搜索历史记录
      cleanHistory(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      // 点击跳转到商品列表页面
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
.uni-searchbar{
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 16px;
  background-color: #c00000;
}
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  
  .sugg-item{
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px  solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .goods-name{
    white-space: normal; // 文字不允许换行（单行文本）
    overflow: hidden;// 溢出部分隐藏
    text-overflow: ellipsis;  // 文本溢出后，使用 ... 代替
    margin-right: 3px;
  }
  
}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>

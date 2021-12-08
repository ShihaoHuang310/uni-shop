<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 商品右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">
          {{goods.goods_name}}
        </view>
        <!-- 商品价格 -->
        <view class="goods-info-box">
          <view class="goods-price">
            ￥{{goods.goods_price | toFixed}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters:{
      toFixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
      
    },
   
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0f0f0;
  .goods-item-left{
    margin-right: 5px;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    .goods-name{
      font-size: 13px;
    }
    .goods-price{
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>

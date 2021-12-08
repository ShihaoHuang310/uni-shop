<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧图片区域 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioChangeHandler"></radio>
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
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
       // 商品的信息对象
      goods:{
        type:Object,
        default: {}
      },
      // 是否展示图片左侧的 radio
      showRadio:{
        type:Boolean,
         // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default:false
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum:{
        type:Boolean,
        default:false
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
      // 商品的勾选状态发生了变化
      radioChangeHandler(){
        this.$emit('radio-change',{
          // 商品的 Id
          goods_id:this.goods.goods_id,
           // 商品最新的勾选状态
           goods_state:!this.goods.goods_state
        })
      },
       // NumberBox 组件的 change 事件处理函数
       numChangeHandler(val){
         // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
         this.$emit('num-change',{
           // 商品的 Id
           goods_id:this.goods.goods_id,
             // 商品的最新数量
          goods_count:+val
         })
       }
       
    },
   
  }
</script>

<style lang="scss">
.goods-item{
   // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0f0f0;
  .goods-item-left{
    margin-right: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    .goods-price{
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>

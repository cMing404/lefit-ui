<template>
   <transition name="modal">
  <div class="msg-mask" v-show="show">
    <div class="modal-container">
      <section class="msg-box">
        <img v-show="img" :src="img" alt="">
        <h3>{{tit}}</h3>
        <p>{{msg}}</p>
        <le-button-group center>
          <le-button type="default" v-show="no" @click.native="cancel" half>取消</le-button>
          <le-button type="primary" @click.native="confirm" half>确定</le-button>
        </le-button-group>
      </section>
    </div></div>
  </div> 
   </transition>
</template>
<script>
  import LeButtonGroup from '../../components/button-group/'
  import LeButton from '../../components/button'
  export default {
    data () {
      return {
        msg: '',
        tit: '提示',
        show: false,
        yes: null,
        no: null,
        img: ''
      }
    },
    methods: {
      confirm () {
        this.yes && this.yes()
        this.show = false
      },
      cancel () {
        this.no && this.no()
        this.show = false
      },
      reset () {
        this.msg = ''
        this.tit = '提示'
        this.img = ''
        this.yes = null
        this.no = null
      }
    },
    components: {
      LeButton,
      LeButtonGroup
    }
  }
</script>
<style lang="scss">
  @import '../../style/public';
  .msg-mask{
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,.6);
    z-index:99999;
    display:table;
    width:100%;
    height:100%;
    transition: opacity .3s ease;
  }
  .modal-container{
    display:table-cell;
    transition: all .3s ease;
    vertical-align:middle;
  }
  .msg-box{
    width:84%;
    background:#fff;
    margin:0 auto;
    border-radius:5px;
    text-align:center;
    z-index:100;
    padding:20px 20px 15px;
    >img{
      max-width:50%;
    }
    >h3{
      font-size:20px;
      font-weight:bold;
      color:rgba(0,0,0,.8);
      padding:15px 0;
    }
    >p{
      font-size:14px;
      color:rgba(0,0,0,.3);
      height:18px;
    }
    >.btns{
      width:100%;
      display:flex;
      margin-top:30px;
      justify-content:center;
      >span{
        width:48%;
        border:1px solid $main-color;
        height: 37px;
        color:$main-color;
        font-size:14px;
        line-height:37px;
        &.confirm{
          background:$main-color;
          color:#fff;
        }
        &:last-of-type{
          margin-left:15px;
        }
      }
    }
  }
</style>
<template>
  <div @click="linkTo" class="le-cell f30" :class="getClass" v-show="rendered">
    <section>
      <slot name="icon"></slot>
      <h5 class="fw-normal">{{title}}</h5>
    </section>
    <section>
      <div>
        <slot name="center"></slot>
        <slot name="aside"></slot>
      </div>
      <slot name="link"><i v-show="isLink!==undefined"></i></slot>
    </section>
  </div>
</template>
<script>
  import ulit from '../../ulit'
  export default {
    name: 'cell',
    data () {
      return {
        rendered: false
      }
    },
    props: {
      title: String,
      center: String,
      value: String,
      isLink: String,
      to: String
    },
    methods: {
      linkTo () {
        if (this.to === undefined || this.to.trim() === '') {
          return false
        }
        window.location.href = this.to
      }
    },
    computed: {
      getClass () {
        return {
          center: this.center !== undefined && this.center !== null
        }
      }
    },
    mounted () {
      ulit.slotNameAddClass(this.$slots, () => {
        this.rendered = true
      })
    }
  }
</script>
<style lang="scss">
  @import '../../style/public';
  .le-cell{
    p,h1,h2,h3,h4,h5,h6{
      margin:0;
      padding:0;
    }
    &:not(:last-child):after{
      content: '';
      display:block;
      position:absolute;
      bottom:-1px;
      left:3%;
      width:97%;
      border:1px solid rgba(0,0,0,.04);
      @extend %solid-1px;
    }
    width:100%;
    $height:44px;
    height:$height;
    background:#fff;
    padding:0 10px;
    display:flex;
    position:relative;
    justify-content:space-between;
    section:nth-of-type(1){
      align-items:center;
      display:flex;
      width:15%;
    }
    section:nth-of-type(2){
      width:85%;
      align-items:center;
      display:flex;
      color:rgba(0,0,0,.6);
      >div{
        width:100%;
        display:flex;
        align-items:center;
        position:relative;
        .desc, .aside{
          position:absolute;
          width:100%;
          top:50%;
          left:0;
          transform:translatey(-50%);
        }
        .aside{
          text-align:right;
        }
        input{
          outline:none;
          border:none;
          color:rgba(0,0,0,0.6);
        }
      }
       >i{
        display:block;
        width:10px;
        height:10px;
        border:1px solid rgba(0,0,0,.3);
        transform:rotateZ(45deg);
        border-left-color:transparent;
        border-bottom-color:transparent;
        margin-left:5px;
      }
    }
  }
</style>
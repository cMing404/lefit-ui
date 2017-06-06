<template>
  <div>
    <div class="img-group-1">
      <img v-lefit-load="'werwerwer'" alt="">
    </div>
    <div class="div" v-lefit-load="'asdfasd'"></div>
  </div>
</template>
<script></script>
<style lang="scss">
.img-group-1{
  img{
    width:200px;
    height:100px;
  }
  .div{
    width:200px;
    height:100px;
    background:url('https://cn.vuejs.org/images/logo.png') no-repeat center cener / 100% 100%;
  }
}
</style>
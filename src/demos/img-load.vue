<template>
  <div>
    <div class="img-group-1">
      <img v-lefit-load="{url: 'werwerwer', scale: 0.5}" alt="">
      <img v-lefit-load="'12323'" alt="">
    </div>
    <div class="div" v-lefit-load="{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496828832817&di=e7c4693b42300027c779b6f12246b000&imgtype=0&src=http%3A%2F%2Fimage1.xyzs.com%2Fupload%2F3d%2Fc4%2F513%2F20150506%2F143087288726017_0.jpg', scale: 1}"></div>
  </div>
</template>
<script></script>
<style lang="scss">
.img-group-1{
  img{
    width:200px;
    height:100px;
  }
}
.div{
    width:200px;
    height:100px;
    background:url('https://cn.vuejs.org/images/logo.png') no-repeat center center / 100% 100%;
  }
</style>
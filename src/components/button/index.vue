<template>
  <div class="btn text-center f24">
    <span><slot></slot></span>
  </div>
</template>
<script>
  export default {
    name: 'button',
    props: {
      text: String,
      leStyle: Object
    },
    computed: {
    }
  }
</script>
<style lang="scss">
  @import '../../style/public';
  .btn {
    display:flex;
    $height:44px;
    height:$height;
    line-height:$height;
    color:$light-color;
    background:$main-color;
    justify-content:space-around;
    align-items:center;
    &[half] {
      width:50%;
    }
    &[full] {
      width:100%;
    }
    &[disabled]{
      background-color:$silver-color;
    }
    &[radius]{
      border-radius:8px;
    }
  }
</style>
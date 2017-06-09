<template>
  <div class="btn text-center f24" :class="getType">
    <span><slot></slot></span>
  </div>
</template>
<script>
  export default {
    name: 'le-button',
    props: {
      text: String,
      leStyle: Object,
      type: String
    },
    computed: {
      getType () {
        return {
          default: this.type === 'default',
          primary: this.type === 'primary'
        }
      }
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
    justify-content:space-around;
    align-items:center;
    color:$main-color;
    background:#fff;
    border:1px solid $main-color;
    &.primary{
      background:$main-color;
      color:$light-color;
    }
    &[half] {
      width:50%;
    }
    &[full] {
      width:100%;
    }
    &[disabled]{
      background-color:$silver-color;
      border-color:transparent;
      color:$light-color;
    }
    &[radius]{
      border-radius:8px;
    }
  }
</style>
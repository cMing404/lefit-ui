<template>
  <div class="le-btn-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'button-group'
  }
</script>
<style lang="scss">
  .le-btn-group{
    display:flex;
    justify-content:center;
    .btn:not(:first-of-type){
      margin-left:5px;
    }
  }
</style>
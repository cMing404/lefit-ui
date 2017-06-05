<template>
  <div class="le-btn-group">
    <slot></slot>
  </div>
</template>
<script>
  import leButton from '../button/'
  export default {
    name: 'button-group',
    components: {
      leButton
    }
  }
</script>
<style lang="scss">
  .le-btn-group{
    display:flex;
    .btn:not(:first-of-type){
      margin-left:5px;
    }
  }
</style>
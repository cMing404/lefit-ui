<template>
  <div>
    <le-button half radius>好的</le-button>
    <le-button full>确定</le-button>
    <le-button>点击发挥好</le-button>
    <le-button disabled>取消</le-button>
    <le-button-group>
      <le-button half>好的</le-button>
      <le-button half>好的</le-button>
    </le-button-group>
  </div>
</template>
<script>
  import leButton from '../components/button'
  import leButtonGroup from '../components/button-group/'
  export default {
    components: {
      leButton,
      leButtonGroup
    }
  }
</script>
<style>
  .btn {
    margin-top:12px;
  }
</style>
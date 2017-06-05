<template>
  <div>
    <le-cell title="标题">
      <p slot="center">其实不想走 其实我想留</p>
    </le-cell>

    <le-cell is-link title="标题">
      <p slot="center">center slot p标签</p>
      <p slot="aside">右边文字</p>
    </le-cell>

    <le-cell title="标题">
      <input type="text" slot="center">
    </le-cell>
    <le-cell title="打发打发" is-link :to="'http://www.baidu.com'">
    </le-cell>
  </div>
</template>
<script>
  import LeCell from '../components/cell'
  export default {
    components: {
      LeCell
    }
  }
</script> 
<template>
  <div>
    <div class="upload">
      点击我进行图片裁剪 => 获取裁剪坐标+图片base64
      <img-cut-upload :output="1" @submit="getBase64"></img-cut-upload>
    </div>
    <div>
      <h5>坐标:{{imgPos1}}</h5>
      <h3>图片base64:</h3>
      <img width="100%" :src="imgBase64" alt="">
    </div>
    <div class="upload">
      点击我进行图片裁剪 => 获取裁剪坐标+图片base64
      <img-cut-upload :output="2" @submit="getBlob"></img-cut-upload>
    </div>
    <div>
      <h5>坐标:{{imgPos2}}</h5>
     见console.log() 无法JSON.stringify
    </div>
    </div>
  </div>
</template>
<script>
  import imgCutUpload from '../components/img-cut-upload/'
  export default {
    data () {
      return {
        imgBase64: '',
        imgBlob: '',
        imgPos1: '',
        imgPos2: ''
      }
    },
    methods: {
      getBase64 (pos, base64) {
        this.imgPos1 = JSON.stringify(pos)
        this.imgBase64 = base64
      },
      getBlob (pos, blob) {
        this.imgPos2 = JSON.stringify(pos)
        console.log(blob)
      }
    },
    components: {
      imgCutUpload
    }
  }
</script>
<style lang="scss">
  .upload {
    position:relative;
    width:300px;
    height:100px;
    background:#ccc;
    margin:0 auto;
  }
  #img_cut{
    position:absolute;
    top:0;
    left:0;
  }
</style>
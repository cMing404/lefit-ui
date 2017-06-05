<template>
  <div id="img_cut">
    <input ref="ipt_upload" type="file" @change="imgChange" value="">
    <div id="crop_mask" v-show="clipShow">
      <canvas id="canvas" v-finger:pinch="pinch" v-finger:multipoint-end="multipointEnd" v-finger:press-move="pressMove"></canvas>
      <div class="btns">
        <span @click="no">取消</span>
        <span @click="rotate">旋转</span>
        <span @click="yes">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        file: null, // 文件对象
        imgObj: null, // DOM对象
        base64: '', // base64对象
        orient: undefined, // 图片旋转角度
        clipShow: false, // 是否显示裁剪界面
        canvas: null,
        ctx: null,
        imgWidth: 0, // 源图片尺寸
        imgHeight: 0,
        winWidth: window.innerWidth, // 屏幕尺寸
        winHeight: window.innerHeight,
        clipWidth: 0, // 裁剪的矩形宽
        clipHeight: 0, // 裁剪的矩形高
        originX: 0, // 屏幕中心坐标
        originY: 0,
        scale: 1, // 图片的缩放比例
        maxScale: 5, // 图片最大缩放比例
        drawWidth: 0, // 图片画到canvas上面的尺寸
        drawHeight: 0,
        rectPos: {}, // 裁剪矩形坐标信息
        imgPos: {}, // 图片坐标信息
        isTouch: false, // 是否在触摸屏幕
        output: 3, // 1 七牛坐标 2 base64 3 file类型
        EXIF: window.EXIF,
        preventHandle: function (e) {
          e.preventDefault()
        }
      }
    },
    methods: {
      imgChange (e) {
        let me = this
        this.file = e.target.files[0]
        // 文件类型判断
        if (!/image\/[png|jpeg|jpg]/.test(this.file.type)) {
          alert('请上传文件类型为png/jpeg/jpg其中一种的图片!')
          return false
        }
        let reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = (event) => {
          let img = new Image()
          img.src = event.target.result
          img.onload = function () {
            // 这里可能存在旋转的情况
            if (me.EXIF && me.getPhotoOrientation(this)) {
              let rightImg = new Image()
              rightImg.src = me.getRightBase64(this)
              rightImg.onload = function () {
                me.setRightImgInfo(this)
              }
            } else {
              me.setRightImgInfo(this)
            }
          }
        }
      },
      setRightImgInfo (imgObj) { // 获取到正确的图片后进行信息获取
        this.imgWidth = imgObj.width
        this.imgHeight = imgObj.height
        this.imgObj = imgObj
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = this.imgWidth
        canvas.height = this.imgHeight
        ctx.drawImage(imgObj, 0, 0, this.imgWidth, this.imgHeight)
        this.base64 = canvas.toDataURL('image/jpeg', 0.7)
        this.initCut()
      },
      getRightBase64 (image) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        if (this.orient === 6) {
          canvas.width = image.height
          canvas.height = image.width
          ctx.translate(image.height, 0) // 将canvas的画布点转移到右上角
          ctx.rotate(90 * Math.PI / 180)
        } else if (this.orient === 3) {
          ctx.translate(image.width, image.height) // 将canvas的画布点转移到右下角
          ctx.rotate(180 * Math.PI / 180)
        } else if (this.orient === 8) {
          canvas.width = image.height
          canvas.height = image.width
          ctx.translate(0, image.width) // 将canvas的画布点转移到左下角
          ctx.rotate(-90 * Math.PI / 180)
        }
        ctx.drawImage(image, 0, 0, image.width, image.height)
        // let img = new Image()
        // img.src = canvas.toDataURL('image/jpeg', 0.7)
        // document.body.appendChild(img)
        return canvas.toDataURL('image/jpeg', 0.7)
      },
      initCut () {
        this.clipShow = true
        // 这里需要将body的touchmove事件屏蔽掉 否认安卓会滚 // 紧随clipshow
        document.body.addEventListener('touchmove', this.preventHandle)
        this.originX = this.winWidth / 2
        this.originY = this.winHeight / 2
        if (this.imgWidth < this.imgHeight) {
          this.drawWidth = this.winWidth
          this.scale = this.drawWidth / this.imgWidth
          this.drawHeight = this.scale * this.imgHeight
        } else if (this.imgWidth > this.imgHeight) {
          this.drawHeight = this.winWidth
          this.scale = this.drawHeight / this.imgHeight
          this.drawWidth = this.scale * this.imgWidth
        } else {
          this.drawWidth = this.drawHeight = this.imgWidth
          this.scale = 1
        }
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.winWidth
        this.canvas.height = this.winHeight
        this.drawImage()
        this.drawClipRect()
        this.drawMask()
      },
      drawImage () {
        // 根据origin和偏移量来实时调整
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.drawImage(this.imgObj, 0, 0, 200, 200)
        this.ctx.drawImage(this.imgObj, this.originX - this.drawWidth / 2, this.originY - this.drawHeight / 2, this.drawWidth, this.drawHeight)
        this.imgPos = {
          x1: this.originX - this.drawWidth / 2,
          y1: this.originY - this.drawHeight / 2
        }
        this.imgPos.x2 = this.imgPos.x1 + this.drawWidth
        this.imgPos.y2 = this.imgPos.y1 + this.drawHeight
      },
      drawClipRect () { // 绘制裁剪区域
        this.ctx.fillStyle = '#fff'
        this.ctx.strokeStyle = '#fff'
        this.clipHeight = this.clipWidth = this.winWidth
        let leftTopPosX = this.winWidth / 2 - this.clipWidth / 2
        let leftTopPosY = this.winHeight / 2 - this.clipHeight / 2
        this.ctx.strokeRect(leftTopPosX, leftTopPosY, this.clipWidth, this.clipHeight)
        this.rectPos = {
          x1: leftTopPosX,
          y1: leftTopPosY
        }
        this.rectPos.x2 = leftTopPosX + this.clipWidth
        this.rectPos.y2 = leftTopPosY + this.clipHeight
      },
      drawMask () {
        this.ctx.fillStyle = 'rgba(0,0,0,.6)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.rectPos.y1)
        this.ctx.fillRect(0, 0, this.rectPos.x1, this.canvas.height)
        this.ctx.fillRect(this.rectPos.x2, 0, this.canvas.width - this.rectPos.x2, this.canvas.height)
        this.ctx.fillRect(0, this.rectPos.y2, this.canvas.width, this.canvas.height - this.rectPos.y2)
      },
      isBeyond () {
        // 注: x1y1代表左上角 x2y2代表右下角坐标
        if (this.rectPos.x1 - this.imgPos.x1 >= 0 && this.rectPos.y1 - this.imgPos.y1 >= 0 && this.rectPos.x2 - this.imgPos.x2 <= 0 && this.rectPos.y2 - this.imgPos.y2 <= 0) {
          return true
        } else {
          return false
        }
      },
      pinch (evt) {
        this.isTouch = true
        let scale = this.scale * evt.scale
        if (scale > this.maxScale) {
          return false
        }
        this.drawWidth = this.imgWidth * scale
        this.drawHeight = this.imgHeight * scale
        this.drawImage()
        this.drawClipRect()
        this.drawMask()
      },
      pressMove (evt) {
        this.isTouch = true
        this.originX = this.originX + evt.deltaX
        this.originY = this.originY + evt.deltaY
        this.drawImage()
        this.drawClipRect()
        this.drawMask()
      },
      multipointEnd (evt) {
        this.isTouch = false
        this.scale = this.drawWidth / this.imgWidth
        if (!this.isBeyond()) {
          this.reset()
          return false
        }
      },
      getClipPos () { // 获取最终裁剪坐标
        return {
          w: ~~(this.clipWidth / this.scale),
          h: ~~(this.clipHeight / this.scale),
          offsetX: ~~((this.rectPos.x1 - this.imgPos.x1) / this.scale),
          offsetY: ~~((this.rectPos.y1 - this.imgPos.y1) / this.scale)
        }
      },
      convertBase64UrlToBlob (urlData) { // base64blob文件
        let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {type: 'image/png'})
      },
      rotate () {
        let me = this
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = this.imgObj.height // 因为canvas重置宽高会刷新画板,所以预先手动转换宽高
        canvas.height = this.imgObj.width
        ctx.translate(this.imgObj.height, 0) // 将canvas的画布点转移到右上角
        ctx.rotate(90 * Math.PI / 180)
        ctx.drawImage(this.imgObj, 0, 0, this.imgObj.width, this.imgObj.height)
        let img = new Image()
        this.base64 = img.src = canvas.toDataURL('image/jpeg', 0.7)
        img.onload = function () {
          me.imgObj = this
          me.imgWidth = this.width
          me.imgHeight = this.height
          me.initCut()
        }
      },
      reset (resetPos) {
        if (this.isTouch) {
          return false
        }
        // 注: x1y1代表左上角 x2y2代表右下角坐标
        let count = 0, rate = 1.5
        if (!resetPos) {
          resetPos = {
            x1: this.imgPos.x1,
            y1: this.imgPos.y1,
            x2: this.imgPos.x2,
            y2: this.imgPos.y2
          }
        }
        let disX1 = this.rectPos.x1 - this.imgPos.x1
        let disY1 = this.rectPos.y1 - this.imgPos.y1
        let disX2 = this.rectPos.x2 - this.imgPos.x2
        let disY2 = this.rectPos.y2 - this.imgPos.y2
        if (disX1 < 0 && disX2 > 0 || disY1 < 0 && disY2 > 0) {
          this.initCut()
          return false
        }
        if (disX1 < 0) {
          count++
          resetPos.x1 = this.rectPos.x1 - (Math.abs(disX1) < 1 ? 0 : disX1 / rate)
          resetPos.x2 = resetPos.x1 + this.imgWidth * this.scale
        }
        if (disY1 < 0) {
          count++
          resetPos.y1 = this.rectPos.y1 - (Math.abs(disY1) < 1 ? 0 : disY1 / rate)
          resetPos.y2 = resetPos.y1 + this.imgHeight * this.scale
        }
        if (disX2 > 0) {
          count++
          resetPos.x2 = this.rectPos.x2 - (Math.abs(disX2) < 1 ? 0 : disX2 / rate)
          resetPos.x1 = this.rectPos.x2 - this.imgWidth * this.scale
        }
        if (disY2 > 0) {
          count++
          resetPos.y2 = this.rectPos.y2 - (Math.abs(disY2) < 1 ? 0 : disY2 / rate)
          resetPos.y1 = this.rectPos.y2 - this.imgHeight * this.scale
        }
        if (count > 2) {
          this.initCut()
          return false
        }
        this.originX = resetPos.x1 + (resetPos.x2 - resetPos.x1) / 2
        this.originY = resetPos.y1 + (resetPos.y2 - resetPos.y1) / 2
        this.drawImage()
        this.drawMask()
        if (count > 0) {
          setTimeout(() => {
            this.reset(resetPos)
          }, 20)
        }
      },
      getPhotoOrientation (img) {
        let me = this
        this.EXIF.getData(img, function () {
          me.orient = me.EXIF.getTag(this, 'Orientation')
        })
        return me.orient !== 1 || me.orient !== undefined
      },
      yes () {
        let clipPos = this.getClipPos()
        if (this.output === 1) {
          this.$emit('submit', clipPos, this.base64)
        } else if (this.output === 2) {
          // 待完整
        } else if (this.output === 3) {
          let originCanvas = document.createElement('canvas')
          let originCanvasCtx = originCanvas.getContext('2d')
          originCanvas.width = this.imgObj.width
          originCanvas.height = this.imgObj.height
          originCanvasCtx.drawImage(this.imgObj, 0, 0, this.imgObj.width, this.imgObj.height)
          let copyCanvas = document.createElement('canvas')
          let copyCanvasCtx = copyCanvas.getContext('2d')
          copyCanvas.width = clipPos.w
          copyCanvas.height = clipPos.h
          copyCanvasCtx.rect(0, 0, copyCanvas.width, copyCanvas.height)
          let imgData = originCanvasCtx.getImageData(clipPos.offsetX, clipPos.offsetY, clipPos.w, clipPos.h)
          copyCanvasCtx.putImageData(imgData, 0, 0)
          copyCanvasCtx.clip()
          this.$emit('submit', this.convertBase64UrlToBlob(copyCanvas.toDataURL('image/jpeg', 0.7)))
          this.$refs.ipt_upload.value = ''
        }
        this.clipShow = false
        document.body.removeEventListener('touchmove', this.preventHandle)
      },
      no () {
        this.clipShow = false
        document.body.removeEventListener('touchmove', this.preventHandle)
        this.$refs.ipt_upload.value = ''
        this.imgObj = null
        this.base64 = ''
      }
    },
    created () {
    }
  }
</script>
<style lang="scss">
  @import '../css/public';
  // 简单的样式 自己在父组件中修改为宜
  #img_cut{
    width:100%;
    height:100%;
    >input{
      width:100%;
      height:100%;
      opacity:0;
    }
  }
  #crop_mask{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow:auto;
    background:#000;
    z-index:3;
    webkit-overflow-scrolling: touch;
    canvas{
      position:absolute;
      width:100%;
      height:100%;
    }
    .btns{
      width:100%;
      position:absolute;
      bottom:0;
      left:0;
      >span{
        color:#fff;
      }
    }
  }
</style>

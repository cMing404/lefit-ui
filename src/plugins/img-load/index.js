import err from '../../assets/lefit-img-load/img_err_s.png'
import loading from '../../assets/lefit-img-load/logo-placehodel.png'
const placeImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
let pluginObj = {
  options: {
    scale: 0.4
  },
  lefitImgLoad (el) {
    el.style.backgroundColor = 'rgba(0,0,0,.03)'
    el.style.backgroundImage = `url(${loading})`
    el.style.backgroundPosition = 'center center'
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundSize = `${189 * this.options.scale}px ${52 * this.options.scale}px`
  },
  lefitImgErr (el) {
    el.style.backgroundColor = 'rgba(0,0,0,.03)'
    el.style.backgroundImage = `url(${err})`
    el.style.backgroundPosition = 'center center'
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundSize = `${131 * this.options.scale}px ${125 * this.options.scale}px`
  },
  imgLoad (el, binding) {
    let img = new Image()
    img.src = binding.value
    img.onload = function () {
      el.src = this.src
      return
    }
    img.onerror = () => {
      el.alt = `图片src请求失败: ${binding.value}`
      this.lefitImgErr(el)
    }
  }
}
export default {
  install (Vue, scale = 0.4) {
    pluginObj.options.scale = scale
    let H = window.screen.height
    Vue.directive('lefit-load', {
      bind (el) {
        pluginObj.lefitImgLoad(el)
        el.src = placeImgSrc
      },
      inserted: (el, binding) => {
        pluginObj.imgLoad(el, binding)
      },
      componentUpdated (el, binding) {
        pluginObj.imgLoad(el, binding)
      },
      unbind (el) {
        el.alt = ''
      }
    })
  }
}